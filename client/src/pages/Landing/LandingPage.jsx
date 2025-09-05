import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Clock, 
  BarChart3, 
  Play,
  Calendar,
} from 'lucide-react';

const LandingPage = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const features = [
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with your team members across projects and tasks. Share files, communicate in real-time, and keep everyone on the same page with integrated chat and file sharing.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2"
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Track time spent on tasks automatically and generate detailed reports. Monitor productivity and optimize your workflow with precise time analytics and automated timesheets.",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Get insights into your team's productivity with beautiful charts and metrics. Make data-driven decisions with comprehensive performance reports and real-time analytics.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2"
    },
    {
      icon: Calendar,
      title: "Project Planning",
      description: "Plan and schedule your projects with integrated calendar and deadline management. Never miss a deadline with smart notifications, reminders, and milestone tracking.",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      quote: "TaskFlow has transformed how our team manages projects. The time tracking feature alone has saved us hours of manual work."
    },
    {
      name: "Michael Chen",
      role: "Engineering Lead",
      company: "StartupXYZ",
      avatar: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      quote: "The Kanban boards are intuitive and the real-time collaboration features keep our distributed team in sync."
    },
    {
      name: "Emily Rodriguez",
      role: "Design Director",
      company: "Creative Agency",
      avatar: "https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      quote: "Beautiful interface, powerful features. TaskFlow strikes the perfect balance between simplicity and functionality."
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "1M+", label: "Tasks Completed" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, features.length]);

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length);
    setIsAutoPlaying(false);
  };

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length);
    setIsAutoPlaying(false);
  };

  const goToFeature = (index) => {
    setCurrentFeature(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TaskFlow</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">Sign In</a>
              <a 
                href="/register" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Manage Projects Like a
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Pro</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                TaskFlow brings your team together to collaborate, track time, and deliver projects on schedule. 
                Simple enough for small teams, powerful enough for enterprises.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/register"
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center sm:justify-start"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <button className="flex items-center justify-center sm:justify-start text-gray-600 hover:text-gray-900 transition-colors px-8 py-4">
                  <Play className="h-5 w-5 mr-2" />
                  Watch Demo
                </button>
              </div>
            </div>
            
            {/* Right Column - Video */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2"
                  alt="TaskFlow Dashboard"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 hidden xl:block">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Task Completed</span>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 hidden xl:block">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium">2h 30m tracked</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 hidden xl:block">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  <span className="text-sm font-medium">Team Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
<section id="features" className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Top: Header + Description (left aligned) */}
    <div className="max-w-3xl">
      <h2 className="text-4xl font-bold text-gray-900">
        Your productivity powerhouse
      </h2>
      <p className="mt-4 text-lg text-gray-600">
        Stay organized and efficient with TaskFlow’s Boards, Planner, and Collaboration tools. 
        Every to-do, idea, or responsibility—no matter how small—finds its place, keeping you on top of your game.
      </p>
    </div>

    {/* Bottom: Grid (features list + carousel) */}
    <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
      
      {/* Left: Features list (sticky sidebar, 1/3 width) */}
      <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-28 self-start">
        {features.map((feature, index) => (
          <button
            key={index}
            onClick={() => goToFeature(index)}
            className={`flex items-start space-x-4 text-left w-full p-4 rounded-xl transition
              ${
                currentFeature === index
                  ? "bg-blue-50 border-l-4 border-blue-600 shadow-md"
                  : "hover:bg-gray-50"
              }`}
          >
            <feature.icon
              className={`h-6 w-6 ${
                currentFeature === index ? "text-blue-600" : "text-gray-400"
              } flex-shrink-0`}
            />
            <div>
              <h3
                className={`font-semibold ${
                  currentFeature === index ? "text-blue-600" : "text-gray-900"
                }`}
              >
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Right: Screenshot / Carousel (2/3 width) */}
      <div className="lg:col-span-2 relative">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <img
            src={features[currentFeature].image}
            alt={features[currentFeature].title}
            className="w-full h-auto transition-all duration-700 ease-in-out"
          />
        </div>

        {/* Carousel controls */}
        <div className="flex justify-center mt-4 space-x-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => goToFeature(index)}
              className={`w-3 h-3 rounded-full ${
                currentFeature === index ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

{/* Section with Blue Background */}
<section className="bg-blue-600 pb-64 pt-24 relative z-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    
    {/* Section Header */}
    <h2 className="text-4xl font-bold text-white">
      Powerful Features to Boost Your Workflow
    </h2>
    <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
      Discover tools designed to keep you organized, efficient, 
      and always on top of your tasks.
    </p>

    {/* First Feature Card */}
    <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <img
          src="/images/email-magic.png"
          alt="Email Magic Illustration"
          className="rounded-xl"
        />
      </div>
      <div className="text-left">
        <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
          Email Magic
        </h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">
          Easily turn your emails into to-dos!
        </p>
        <p className="mt-4 text-gray-600">
          Just forward them to your TaskFlow Inbox, and they’ll be transformed 
          by AI into organized to-dos with all the links you need.
        </p>
      </div>
    </div>
  </div>

  {/* Second Feature Card (Floating / Overlapping) */}
  <div className="relative z-30">
    <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transform translate-y-1/4">
        <div className="text-left">
          <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            Message App Sorcery
          </h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            Turn chats into tasks instantly
          </p>
          <p className="mt-4 text-gray-600">
            Save messages from Slack or Teams directly to your TaskFlow board. 
            AI summarizes and links everything so you never lose track.
          </p>
        </div>
        <div>
          <img
            src="/images/message-sorcery.png"
            alt="Message Sorcery Illustration"
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  </div>
</section>
<section className="bg-white py-24 relative overflow-hidden">
  {/* Background decoration */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30"></div>
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    {/* Section Header */}
    <div className="text-center max-w-3xl mx-auto mb-20">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">
        How It Works
      </h2>
      <p className="text-xl text-gray-600">
        Get started with TaskFlow in just a few simple steps. Our intuitive process makes project management effortless.
      </p>
    </div>

    {/* Timeline Container */}
    <div className="relative">
      {/* Curved SVG Path - Hidden on mobile */}
      <svg className="absolute inset-0 w-full h-full hidden lg:block pointer-events-none" style={{zIndex: 1}}>
        <defs>
          <linearGradient id="curvedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="25%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="75%" stopColor="#F59E0B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.6" />
          </linearGradient>
          
          {/* Animated gradient for the flowing effect */}
          <linearGradient id="flowingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3">
              <animate attributeName="stop-opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6">
              <animate attributeName="stop-opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="1s" />
            </stop>
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.3">
              <animate attributeName="stop-opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin="2s" />
            </stop>
          </linearGradient>
        </defs>
        
        {/* Main curved path */}
        <path 
          d="M 200 150 Q 600 100 400 400 Q 200 500 600 750 Q 800 800 400 1100" 
          stroke="url(#curvedGradient)" 
          strokeWidth="3" 
          fill="none"
          strokeDasharray="10,5"
          className="animate-pulse"
        />
        
        {/* Flowing animation overlay */}
        <path 
          d="M 200 150 Q 600 100 400 400 Q 200 500 600 750 Q 800 800 400 1100" 
          stroke="url(#flowingGradient)" 
          strokeWidth="4" 
          fill="none"
          strokeDasharray="20,10"
        />
      </svg>

      {/* Timeline Steps */}
      <div className="space-y-16 lg:space-y-32 relative z-10">
        
        {/* Step 1 - Left Side */}
        <div className="relative flex flex-col lg:flex-row items-center">
          {/* Content - Left */}
          <div className="lg:w-5/12 lg:pr-16 mb-8 lg:mb-0 order-2 lg:order-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
              
              <div className="flex items-center mb-4 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 ml-4">Create Your Workspace</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg relative z-10">
                Set up your personalized workspace in seconds. Choose from our beautiful templates or start from scratch with a blank canvas.
              </p>
              <div className="mt-6 relative z-10">
                <div className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                  <span>Quick setup</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Timeline Dot */}
          <div className="relative hidden lg:block order-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-xl relative z-20 animate-pulse">
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Visual - Right */}
          <div className="lg:w-5/12 lg:pl-16 order-1 lg:order-3">
            <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100 rounded-3xl p-8 h-72 flex items-center justify-center shadow-xl transform hover:rotate-1 hover:scale-105 transition-all duration-500">
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-4 transform hover:rotate-6 transition-transform duration-300">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="text-gray-700 font-semibold text-lg">Workspace Setup</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 - Right Side */}
        <div className="relative flex flex-col lg:flex-row items-center">
          {/* Visual - Left */}
          <div className="lg:w-5/12 lg:pr-16 mb-8 lg:mb-0 order-1">
            <div className="bg-gradient-to-br from-green-100 via-green-50 to-teal-100 rounded-3xl p-8 h-72 flex items-center justify-center shadow-xl transform hover:-rotate-1 hover:scale-105 transition-all duration-500">
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-4 transform hover:-rotate-6 transition-transform duration-300">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-gray-700 font-semibold text-lg">Add Tasks & Projects</p>
              </div>
            </div>
          </div>

          {/* Floating Timeline Dot */}
          <div className="relative hidden lg:block order-2">
            <div className="w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-xl relative z-20 animate-pulse">
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Content - Right */}
          <div className="lg:w-5/12 lg:pl-16 order-2 lg:order-3">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-green-100/50 to-transparent rounded-full transform -translate-x-16 -translate-y-16"></div>
              
              <div className="flex items-center mb-4 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 ml-4">Add Your Tasks</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg relative z-10">
                Create tasks, set deadlines, assign team members, and organize everything with our drag-and-drop interface. It's that simple!
              </p>
              <div className="mt-6 relative z-10">
                <div className="inline-flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors">
                  <span>Drag & drop</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 - Left Side */}
        <div className="relative flex flex-col lg:flex-row items-center">
          {/* Content - Left */}
          <div className="lg:w-5/12 lg:pr-16 mb-8 lg:mb-0 order-2 lg:order-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100/50 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
              
              <div className="flex items-center mb-4 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 ml-4">Collaborate & Track</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg relative z-10">
                Invite your team, share progress, and track everything in real-time. Watch your productivity soar with seamless collaboration.
              </p>
              <div className="mt-6 relative z-10">
                <div className="inline-flex items-center text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
                  <span>Real-time updates</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Timeline Dot */}
          <div className="relative hidden lg:block order-2">
            <div className="w-8 h-8 bg-purple-500 rounded-full border-4 border-white shadow-xl relative z-20 animate-pulse">
              <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Visual - Right */}
          <div className="lg:w-5/12 lg:pl-16 order-1 lg:order-3">
            <div className="bg-gradient-to-br from-purple-100 via-purple-50 to-pink-100 rounded-3xl p-8 h-72 flex items-center justify-center shadow-xl transform hover:rotate-1 hover:scale-105 transition-all duration-500">
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-4 transform hover:rotate-6 transition-transform duration-300">
                  <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-gray-700 font-semibold text-lg">Team Collaboration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 - Right Side */}
        <div className="relative flex flex-col lg:flex-row items-center">
          {/* Visual - Left */}
          <div className="lg:w-5/12 lg:pr-16 mb-8 lg:mb-0 order-1">
            <div className="bg-gradient-to-br from-orange-100 via-orange-50 to-red-100 rounded-3xl p-8 h-72 flex items-center justify-center shadow-xl transform hover:-rotate-1 hover:scale-105 transition-all duration-500">
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-4 transform hover:-rotate-6 transition-transform duration-300">
                  <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-gray-700 font-semibold text-lg">Track Progress</p>
              </div>
            </div>
          </div>

          {/* Floating Timeline Dot */}
          <div className="relative hidden lg:block order-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full border-4 border-white shadow-xl relative z-20 animate-pulse">
              <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Content - Right */}
          <div className="lg:w-5/12 lg:pl-16 order-2 lg:order-3">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-100/50 to-transparent rounded-full transform -translate-x-16 -translate-y-16"></div>
              
              <div className="flex items-center mb-4 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  4
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 ml-4">Analyze & Optimize</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg relative z-10">
                Get insights with powerful analytics. See what's working, identify bottlenecks, and continuously improve your workflow.
              </p>
              <div className="mt-6 relative z-10">
                <div className="inline-flex items-center text-orange-600 font-medium group-hover:text-orange-700 transition-colors">
                  <span>Smart insights</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</section>


{/* Work Smarter Section */}
<section className="bg-gray-50 relative z-0 pt-24 pb-32">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="max-w-3xl">
      <h2 className="text-4xl font-bold text-gray-900">
        Work Smarter
      </h2>
      <p className="mt-4 text-lg text-gray-600">
        Do more with TaskFlow. Customize the way you organize with easy integrations,
        automation, and mirroring of your to-dos across multiple locations.
      </p>
    </div>

    {/* Feature Highlights */}
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Integrations Card */}
      <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 relative overflow-hidden">
        {/* Gradient accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        {/* Icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrations</h3>
        <p className="text-gray-600 leading-relaxed">
          Connect the apps you already use into your workflow or add a Power-Up
          to fine-tune your specific needs.
        </p>

        {/* Subtle hover effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"></div>
      </div>

      {/* Automation Card */}
      <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 relative overflow-hidden">
        {/* Gradient accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-600"></div>
        
        {/* Icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Automation</h3>
        <p className="text-gray-600 leading-relaxed">
          No-code automation is built into every board. Focus on the work that 
          matters most and let the robots do the rest.
        </p>

        {/* Subtle hover effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-50 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"></div>
      </div>

      {/* Card Mirroring */}
      <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 relative overflow-hidden">
        {/* Gradient accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-600"></div>
        
        {/* Icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Card Mirroring</h3>
        <p className="text-gray-600 leading-relaxed">
          View all your to-dos from multiple boards in one place. Mirror a card to
          keep track of work wherever you need it!
        </p>

        {/* Subtle hover effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"></div>
      </div>
    </div>
  </div>
</section>

{/* ✅ Testimonials Section */}
<section className="bg-white py-24">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
    <h2 className="text-4xl font-bold text-gray-900">What Our Users Say</h2>
    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
      Trusted by teams around the world to organize, collaborate, and achieve more.
    </p>

    {/* Carousel */}
    <div className="mt-12">
      {/* Replace with Swiper.js or Embla for real carousel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
          <p className="text-gray-700 italic">
            “TaskFlow has completely changed how my team collaborates.
            We’re more efficient than ever.”
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <img
              src="/images/user1.jpg"
              alt="Sarah Connor"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="font-semibold text-gray-900">Sarah Connor</p>
              <p className="text-sm text-gray-500">Project Manager</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
          <p className="text-gray-700 italic">
            “The automation features save me hours every week. I can’t imagine
            going back.”
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <img
              src="/images/user2.jpg"
              alt="James Smith"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="font-semibold text-gray-900">James Smith</p>
              <p className="text-sm text-gray-500">Software Engineer</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
          <p className="text-gray-700 italic">
            “Beautiful UI, simple to use, and keeps everything in sync.
            Exactly what I needed.”
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <img
              src="/images/user3.jpg"
              alt="Aisha Khan"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="font-semibold text-gray-900">Aisha Khan</p>
              <p className="text-sm text-gray-500">Designer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/* ✅ Logos / Social Proof Section */}
<section className="bg-gray-50 py-16">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
      Trusted by leading companies worldwide
    </h2>
    <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
      Join millions of users who rely on TaskFlow to boost their productivity and streamline their workflows
    </p>

    {/* Logos Grid */}
    <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
      {/* Visa */}
      <img
        src="https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png"
        alt="Visa"
        className="h-8 w-auto mx-auto opacity-70 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
      />
      
      {/* Coinbase */}
      <img
        src="https://logos-world.net/wp-content/uploads/2021/02/Coinbase-Logo.png"
        alt="Coinbase"
        className="h-8 w-auto mx-auto opacity-70 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
      />
      
      {/* John Deere */}
      <img
        src="https://logos-world.net/wp-content/uploads/2020/04/John-Deere-Logo.png"
        alt="John Deere"
        className="h-8 w-auto mx-auto opacity-70 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
      />
      
      {/* Zoom */}
      <img
        src="https://logos-world.net/wp-content/uploads/2020/11/Zoom-Logo.png"
        alt="Zoom"
        className="h-8 w-auto mx-auto opacity-70 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
      />
      
      {/* Grand Hyatt */}
      <img
        src="https://logos-world.net/wp-content/uploads/2020/06/Grand-Hyatt-Logo.png"
        alt="Grand Hyatt"
        className="h-8 w-auto mx-auto opacity-70 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
      />
      
      {/* Fender */}
      <img
        src="https://logos-world.net/wp-content/uploads/2020/06/Fender-Logo.png"
        alt="Fender"
        className="h-8 w-auto mx-auto opacity-70 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
      />
    </div>

    {/* Optional: Add testimonial or stat */}
    <div className="mt-16 text-center">
      <p className="text-gray-500 text-sm">
        Over 2 million tasks completed this month
      </p>
    </div>
  </div>
</section>
<footer className="bg-gray-900 text-gray-300 py-12">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
    
    {/* Row 1: About Trello */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">About Trello</h3>
      <ul className="space-y-3">
        <li>
          <a href="#" className="hover:text-white">What’s behind the boards.</a>
        </li>
        <li>
          <a href="#" className="hover:text-white">Jobs</a>
          <p className="text-sm text-gray-500">Learn about open roles on the Trello team.</p>
        </li>
        <li>
          <a href="#" className="hover:text-white">Apps</a>
          <p className="text-sm text-gray-500">Download the Trello App for your Desktop or Mobile devices.</p>
        </li>
        <li>
          <a href="#" className="hover:text-white">Contact us</a>
          <p className="text-sm text-gray-500">Need anything? Get in touch and we can help.</p>
        </li>
      </ul>
    </div>

    {/* Row 2: Legal & Language */}
    <div className="flex flex-wrap justify-between items-center border-t border-gray-700 pt-6 text-sm text-gray-400">
      <div className="flex gap-6">
        <a href="#" className="hover:text-white">Čeština</a>
        <a href="#" className="hover:text-white">Privacy Policy</a>
        <a href="#" className="hover:text-white">Terms</a>
      </div>
      <p className="mt-4 md:mt-0">&copy; 2024 Atlassian</p>
    </div>

  </div>
</footer>



    </div>
  );
};

export default LandingPage;