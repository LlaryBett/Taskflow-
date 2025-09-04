import React, { useState } from 'react';
import { Plus, MoreHorizontal, Clock, User } from 'lucide-react';
import TaskModal from './TaskModal';

const KanbanBoard = ({ projectId }) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('todo');

  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-gray-100',
      tasks: [
        {
          id: 1,
          title: 'Design homepage wireframe',
          description: 'Create initial wireframe for the new homepage layout',
          priority: 'high',
          assignee: { name: 'John Doe', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
          dueDate: '2025-01-10',
          timeTracked: '0h'
        },
        {
          id: 2,
          title: 'Content strategy review',
          description: 'Review and update content strategy for all pages',
          priority: 'medium',
          assignee: { name: 'Jane Smith', avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
          dueDate: '2025-01-12',
          timeTracked: '1.5h'
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-blue-100',
      tasks: [
        {
          id: 3,
          title: 'Implement navigation component',
          description: 'Build responsive navigation with mobile menu',
          priority: 'high',
          assignee: { name: 'Mike Johnson', avatar: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
          dueDate: '2025-01-15',
          timeTracked: '8.5h'
        }
      ]
    },
    {
      id: 'review',
      title: 'Review',
      color: 'bg-yellow-100',
      tasks: [
        {
          id: 4,
          title: 'Test responsive design',
          description: 'Test website on different devices and browsers',
          priority: 'medium',
          assignee: { name: 'Sarah Wilson', avatar: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
          dueDate: '2025-01-08',
          timeTracked: '3h'
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-green-100',
      tasks: [
        {
          id: 5,
          title: 'Setup project repository',
          description: 'Initialize Git repository and setup development environment',
          priority: 'low',
          assignee: { name: 'John Doe', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
          dueDate: '2025-01-05',
          timeTracked: '2h'
        },
        {
          id: 6,
          title: 'Research design trends',
          description: 'Research current web design trends and best practices',
          priority: 'low',
          assignee: { name: 'Jane Smith', avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
          dueDate: '2025-01-03',
          timeTracked: '4h'
        }
      ]
    }
  ];

  const handleAddTask = (columnId) => {
    setSelectedColumn(columnId);
    setShowTaskModal(true);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full p-6">
        <div className="flex space-x-6 h-full overflow-x-auto pb-4">
          {columns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-80">
              <div className="bg-gray-50 rounded-lg h-full flex flex-col">
                {/* Column Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                      <h3 className="font-semibold text-gray-900">{column.title}</h3>
                      <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {column.tasks.length}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddTask(column.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Tasks */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                  {column.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                    >
                      {/* Task Header */}
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-gray-900 text-sm leading-5">{task.title}</h4>
                        <button className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Task Description */}
                      {task.description && (
                        <p className="text-gray-600 text-xs mb-3 line-clamp-2">{task.description}</p>
                      )}

                      {/* Priority Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        {task.timeTracked !== '0h' && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {task.timeTracked}
                          </div>
                        )}
                      </div>

                      {/* Task Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img
                            className="h-6 w-6 rounded-full object-cover"
                            src={task.assignee.avatar}
                            alt={task.assignee.name}
                            title={task.assignee.name}
                          />
                          <span className="text-xs text-gray-500">{task.assignee.name}</span>
                        </div>
                        <span className="text-xs text-gray-400">{task.dueDate}</span>
                      </div>
                    </div>
                  ))}

                  {/* Add Task Button */}
                  <button
                    onClick={() => handleAddTask(column.id)}
                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors text-sm"
                  >
                    <Plus className="h-4 w-4 mx-auto mb-1" />
                    Add a task
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <TaskModal
          isOpen={showTaskModal}
          onClose={() => setShowTaskModal(false)}
          projectId={projectId}
          columnId={selectedColumn}
        />
      )}
    </div>
  );
};

export default KanbanBoard;