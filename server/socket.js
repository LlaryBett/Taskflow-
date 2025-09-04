// socket.js - Updated with missing events and proper payload structure

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/User.js';

const activeUsers = new Map();
const typingUsers = new Map();
const userSockets = new Map();

export default function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log(`🟢 User connected: ${socket.id}`);

    // Handle login via socket
    socket.on("login", async ({ email, password }) => {
      try {
        console.log(`🔐 Login attempt for: ${email}`);

        if (!email || !password) {
          socket.emit("login_error", { message: "Email and password are required" });
          return;
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        
        if (!user) {
          socket.emit("login_error", { message: "Invalid email or password" });
          return;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
          socket.emit("login_error", { message: "Invalid email or password" });
          return;
        }

        // Handle existing sessions
        const existingSocketId = userSockets.get(user._id.toString());
        if (existingSocketId && existingSocketId !== socket.id) {
          const existingSocket = io.sockets.sockets.get(existingSocketId);
          if (existingSocket) {
            existingSocket.emit("session_terminated", { 
              message: "You have been logged in from another device" 
            });
            existingSocket.disconnect(true);
          }
        }

        const token = jwt.sign(
          { 
            userId: user._id, 
            email: user.email,
            socketId: socket.id 
          },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );

        const userData = {
          userId: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          name: `${user.firstName} ${user.lastName}`, // Add full name for frontend compatibility
          avatar: user.avatar || null,
          isOnline: true,
          lastSeen: new Date(),
          socketId: socket.id,
          status: user.status || 'Available'
        };

        activeUsers.set(socket.id, userData);
        userSockets.set(user._id.toString(), socket.id);
        socket.join(`user_${user._id}`);

        try {
          await User.findByIdAndUpdate(user._id, { 
            lastLogin: new Date(),
            isOnline: true 
          });
        } catch (dbError) {
          console.error("Failed to update user login time:", dbError);
        }

        // Send success response with proper structure
        socket.emit("login_success", {
          user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            name: `${user.firstName} ${user.lastName}`, // Frontend expects 'name'
            avatar: user.avatar || null,
            isOnline: true,
            status: user.status || 'Available'
          },
          token,
          success: true
        });

        socket.broadcast.emit("presence_update", { 
          userId: user._id, 
          isOnline: true,
          firstName: user.firstName,
          lastName: user.lastName,
          name: `${user.firstName} ${user.lastName}`,
          lastSeen: new Date()
        });

        console.log(`✅ User ${user.email} logged in via socket (${socket.id})`);

      } catch (error) {
        console.error("Socket login error:", error);
        socket.emit("login_error", { 
          message: "Login failed. Please try again later." 
        });
      }
    });

    // MISSING: Get conversations event
    socket.on("get_conversations", async () => {
      try {
        if (!activeUsers.has(socket.id)) {
          socket.emit("conversations_error", { message: "User not authenticated" });
          return;
        }

        const userData = activeUsers.get(socket.id);
        
        // Fetch user's conversations from database
        // This is a placeholder - replace with your actual conversation fetching logic
        const conversations = await getUserConversations(userData.userId);
        
        socket.emit("conversations_loaded", { conversations });
      } catch (error) {
        console.error("Error fetching conversations:", error);
        socket.emit("conversations_error", { message: "Failed to fetch conversations" });
      }
    });

    // MISSING: Get messages for a conversation
    socket.on("get_messages", async ({ conversationId, page = 1, limit = 50 }) => {
      try {
        if (!activeUsers.has(socket.id)) {
          socket.emit("messages_error", { message: "User not authenticated" });
          return;
        }

        if (!conversationId) {
          socket.emit("messages_error", { message: "Conversation ID required" });
          return;
        }

        // Fetch messages from database
        // This is a placeholder - replace with your actual message fetching logic
        const messages = await getConversationMessages(conversationId, page, limit);
        
        socket.emit("messages_loaded", { 
          conversationId, 
          messages,
          page,
          hasMore: messages.length === limit
        });
      } catch (error) {
        console.error("Error fetching messages:", error);
        socket.emit("messages_error", { message: "Failed to fetch messages" });
      }
    });

    // MISSING: Search users event
    socket.on("search_users", async ({ query }) => {
      try {
        if (!activeUsers.has(socket.id)) {
          socket.emit("search_users_error", { message: "User not authenticated" });
          return;
        }

        if (!query || query.trim().length < 2) {
          socket.emit("users_search_results", { users: [] });
          return;
        }

        const userData = activeUsers.get(socket.id);
        
        // Search users in database (exclude current user and existing conversations)
        const users = await searchUsers(query.trim(), userData.userId);
        
        socket.emit("users_search_results", { users });
      } catch (error) {
        console.error("Error searching users:", error);
        socket.emit("search_users_error", { message: "Failed to search users" });
      }
    });

    // MISSING: Create conversation event
    socket.on("create_conversation", async ({ type, name, members, userId }) => {
      try {
        if (!activeUsers.has(socket.id)) {
          socket.emit("conversation_create_error", { message: "User not authenticated" });
          return;
        }

        const userData = activeUsers.get(socket.id);
        let conversation;

        if (type === 'direct') {
          if (!userId) {
            socket.emit("conversation_create_error", { message: "User ID required for direct conversation" });
            return;
          }
          
          // Check if direct conversation already exists
          const existingConversation = await getDirectConversation(userData.userId, userId);
          if (existingConversation) {
            socket.emit("conversation_created", { conversation: existingConversation });
            return;
          }
          
          conversation = await createDirectConversation(userData.userId, userId);
        } else if (type === 'group') {
          if (!name || !members || members.length === 0) {
            socket.emit("conversation_create_error", { message: "Group name and members required" });
            return;
          }
          
          conversation = await createGroupConversation(userData.userId, name, members);
        }

        socket.emit("conversation_created", { conversation });
        
        // Notify other members
        conversation.members.forEach(memberId => {
          const memberSocketId = userSockets.get(memberId.toString());
          if (memberSocketId && memberSocketId !== socket.id) {
            const memberSocket = io.sockets.sockets.get(memberSocketId);
            if (memberSocket) {
              memberSocket.emit("new_conversation", { conversation });
            }
          }
        });

      } catch (error) {
        console.error("Error creating conversation:", error);
        socket.emit("conversation_create_error", { message: "Failed to create conversation" });
      }
    });

    // Updated send_message with proper payload structure
    socket.on("send_message", async (messageData) => {
      try {
        const { conversationId, text, messageId } = messageData;
        
        if (!conversationId || !text) {
          socket.emit("message_error", { 
            messageId,
            message: "Conversation ID and text required" 
          });
          return;
        }

        if (!activeUsers.has(socket.id)) {
          socket.emit("message_error", { 
            messageId,
            message: "User not authenticated" 
          });
          return;
        }

        const userData = activeUsers.get(socket.id);
        
        // Save message to database
        const savedMessage = await saveMessage({
          conversationId,
          senderId: userData.userId,
          text,
          timestamp: new Date()
        });

        const messagePayload = {
          id: savedMessage._id,
          text: savedMessage.text,
          senderId: userData.userId,
          senderName: userData.name,
          senderAvatar: userData.avatar,
          timestamp: savedMessage.timestamp,
          conversationId,
          status: 'delivered'
        };

        // Send to conversation room (other participants)
        socket.to(conversationId).emit("receive_message", messagePayload);

        // Send confirmation back to sender
        socket.emit("message_sent", { 
          messageId,
          message: messagePayload,
          success: true 
        });

        // Update conversation's last message for all participants
        const conversationUpdate = {
          conversationId,
          lastMessage: {
            text: savedMessage.text,
            timestamp: savedMessage.timestamp,
            sender: userData.name,
            senderId: userData.userId,
            status: 'delivered'
          }
        };

        io.to(conversationId).emit("conversation_updated", conversationUpdate);

        console.log(`Message sent in ${conversationId} by ${userData.name}`);
        
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("message_error", { 
          messageId: messageData.messageId,
          message: "Failed to send message" 
        });
      }
    });

    // Updated typing events with proper user data
    socket.on("typing_start", ({ conversationId }) => {
      if (!conversationId) return;

      if (activeUsers.has(socket.id)) {
        const userData = activeUsers.get(socket.id);
        
        typingUsers.set(socket.id, { 
          conversationId, 
          isTyping: true,
          userId: userData.userId,
          userName: userData.name
        });
        
        socket.to(conversationId).emit("user_typing", {
          userId: userData.userId,
          userName: userData.firstName, // Frontend might expect firstName
          name: userData.name, // Also send full name
          isTyping: true,
          conversationId
        });
        
        console.log(`User ${userData.name} started typing in ${conversationId}`);
      }
    });

    socket.on("typing_stop", ({ conversationId }) => {
      if (!conversationId) return;

      if (activeUsers.has(socket.id) && typingUsers.has(socket.id)) {
        const userData = activeUsers.get(socket.id);
        
        typingUsers.delete(socket.id);
        
        socket.to(conversationId).emit("user_typing", {
          userId: userData.userId,
          userName: userData.firstName,
          name: userData.name,
          isTyping: false,
          conversationId
        });
        
        console.log(`User ${userData.name} stopped typing in ${conversationId}`);
      }
    });

    // Updated get_online_users with proper structure
    socket.on("get_online_users", () => {
      const onlineUsers = Array.from(activeUsers.values()).map(user => ({
        id: user.userId, // Frontend expects 'id'
        userId: user.userId,
        name: user.name, // Frontend expects 'name'
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        status: user.status || 'Available',
        isOnline: user.isOnline,
        lastSeen: user.lastSeen
      }));

      socket.emit("online_users", { users: onlineUsers });
    });

    // Handle logout via socket
    socket.on("logout", async () => {
      try {
        if (activeUsers.has(socket.id)) {
          const userData = activeUsers.get(socket.id);
          
          console.log(`👋 User ${userData.email} logging out via socket`);

          try {
            await User.findByIdAndUpdate(userData.userId, { 
              isOnline: false,
              lastSeen: new Date()
            });
          } catch (dbError) {
            console.error("Failed to update user offline status:", dbError);
          }

          socket.broadcast.emit("presence_update", { 
            userId: userData.userId, 
            isOnline: false,
            lastSeen: new Date()
          });
          
          activeUsers.delete(socket.id);
          userSockets.delete(userData.userId.toString());
          socket.leaveAll();
          
          socket.emit("logout_success", { 
            message: "Logged out successfully" 
          });
        } else {
          socket.emit("logout_success", { 
            message: "Already logged out" 
          });
        }
      } catch (error) {
        console.error("Socket logout error:", error);
        socket.emit("logout_error", { 
          message: "Logout failed" 
        });
      }
    });

    // Handle status updates
    socket.on("status_update", async ({ status }) => {
      if (activeUsers.has(socket.id)) {
        const userData = activeUsers.get(socket.id);
        userData.status = status;
        
        try {
          await User.findByIdAndUpdate(userData.userId, { status });
        } catch (dbError) {
          console.error("Failed to update user status:", dbError);
        }

        socket.broadcast.emit("user_status_update", {
          userId: userData.userId,
          status: status
        });

        console.log(`📊 User ${userData.email} status updated to: ${status}`);
      }
    });

    // Handle getting user data via socket
    socket.on("get_user", () => {
      if (activeUsers.has(socket.id)) {
        const userData = activeUsers.get(socket.id);
        socket.emit("user_data", {
          id: userData.userId,
          userId: userData.userId,
          name: userData.name,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          avatar: userData.avatar,
          isOnline: userData.isOnline,
          status: userData.status
        });
      } else {
        socket.emit("user_data_error", { 
          message: "User not authenticated" 
        });
      }
    });

    // Handle joining a conversation
    socket.on("join_conversation", (data) => {
      const conversationId = typeof data === 'string' ? data : data.conversationId;
      
      if (!conversationId) {
        socket.emit("conversation_join_error", { 
          message: "Conversation ID required" 
        });
        return;
      }

      socket.join(conversationId);
      socket.emit("conversation_joined", { 
        conversationId,
        message: "Joined conversation successfully" 
      });
      
      console.log(`User ${socket.id} joined conversation: ${conversationId}`);
    });

    // Handle leaving a conversation
    socket.on("leave_conversation", (data) => {
      const conversationId = typeof data === 'string' ? data : data.conversationId;
      
      if (conversationId) {
        socket.leave(conversationId);
        console.log(`User ${socket.id} left conversation: ${conversationId}`);
      }
    });

    // Handle presence updates
    socket.on("presence_update", ({ isOnline }) => {
      if (activeUsers.has(socket.id)) {
        const userData = activeUsers.get(socket.id);
        userData.isOnline = isOnline;
        
        socket.broadcast.emit("presence_update", { 
          userId: userData.userId, 
          isOnline,
          lastSeen: isOnline ? null : new Date()
        });
        
        console.log(`User ${userData.email} is now ${isOnline ? "online" : "offline"}`);
      }
    });

    // Handle disconnection
    socket.on("disconnect", async (reason) => {
      console.log(`🔴 User disconnected: ${socket.id}, reason: ${reason}`);

      if (activeUsers.has(socket.id)) {
        const userData = activeUsers.get(socket.id);
        
        try {
          await User.findByIdAndUpdate(userData.userId, { 
            isOnline: false,
            lastSeen: new Date()
          });
        } catch (dbError) {
          console.error("Failed to update user offline status on disconnect:", dbError);
        }

        socket.broadcast.emit("presence_update", { 
          userId: userData.userId, 
          isOnline: false,
          lastSeen: new Date()
        });
        
        activeUsers.delete(socket.id);
        userSockets.delete(userData.userId.toString());
      }

      if (typingUsers.has(socket.id)) {
        const typingData = typingUsers.get(socket.id);
        socket.to(typingData.conversationId).emit("user_typing", {
          userId: typingData.userId,
          userName: typingData.userName,
          isTyping: false,
          conversationId: typingData.conversationId
        });
        typingUsers.delete(socket.id);
      }
    });

    socket.on("error", (error) => {
      console.error(`Socket error for ${socket.id}:`, error);
    });
  });

  // Periodic cleanup
  setInterval(() => {
    const now = Date.now();
    const staleThreshold = 5 * 60 * 1000; // 5 minutes

    for (const [socketId, userData] of activeUsers.entries()) {
      if (now - userData.lastSeen > staleThreshold) {
        const socket = io.sockets.sockets.get(socketId);
        if (!socket || !socket.connected) {
          console.log(`🧹 Cleaning up stale user: ${userData.email}`);
          activeUsers.delete(socketId);
          userSockets.delete(userData.userId.toString());
        }
      }
    }
  }, 60000);
}

// Placeholder database functions - implement these based on your database schema
async function getUserConversations(userId) {
  // Implement: fetch user's conversations from database
  // Should return conversations with proper structure matching frontend expectations
  return [];
}

async function getConversationMessages(conversationId, page, limit) {
  // Implement: fetch messages for a conversation with pagination
  return [];
}

async function searchUsers(query, excludeUserId) {
  // Implement: search users by name/email, exclude current user
  return [];
}

async function createDirectConversation(userId1, userId2) {
  // Implement: create direct conversation between two users
  return {};
}

async function createGroupConversation(creatorId, name, members) {
  // Implement: create group conversation
  return {};
}

async function getDirectConversation(userId1, userId2) {
  // Implement: check if direct conversation exists between two users
  return null;
}

async function saveMessage(messageData) {
  // Implement: save message to database
  return { _id: 'temp-id', ...messageData };
}