import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, FolderOpen, Users, Calendar, MoreHorizontal } from 'lucide-react';

const ProjectList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete overhaul of company website with modern design',
      progress: 75,
      dueDate: '2025-01-20',
      members: [
        { id: 1, name: 'John Doe', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
        { id: 2, name: 'Jane Smith', avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
        { id: 3, name: 'Mike Johnson', avatar: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
      ],
      status: 'active',
      tasksTotal: 32,
      tasksCompleted: 24
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Native iOS and Android app for customer engagement',
      progress: 45,
      dueDate: '2025-02-15',
      members: [
        { id: 4, name: 'Sarah Wilson', avatar: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
        { id: 5, name: 'Tom Brown', avatar: 'https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
      ],
      status: 'active',
      tasksTotal: 28,
      tasksCompleted: 12
    },
    {
      id: 3,
      name: 'Marketing Campaign Q1',
      description: 'Launch new product marketing across all channels',
      progress: 90,
      dueDate: '2025-01-10',
      members: [
        { id: 6, name: 'Lisa Davis', avatar: 'https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
      ],
      status: 'active',
      tasksTotal: 15,
      tasksCompleted: 14
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">Manage and track all your projects</p>
          </div>
          <button
            onClick={() => navigate('/app/projects/new')}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Search projects..."
            />
          </div>
        </div>
        <button className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
            onClick={() => navigate(`/app/projects/${project.id}`)}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <FolderOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </h3>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <span>{project.tasksCompleted}/{project.tasksTotal} tasks</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{project.dueDate}</span>
                </div>
              </div>

              {/* Members */}
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {project.members.slice(0, 3).map((member) => (
                    <img
                      key={member.id}
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      src={member.avatar}
                      alt={member.name}
                      title={member.name}
                    />
                  ))}
                  {project.members.length > 3 && (
                    <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 text-xs font-medium text-gray-500">
                      +{project.members.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{project.members.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Create Project Card */}
        <div
          className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer group"
          onClick={() => navigate('/app/projects/new')}
        >
          <div className="p-6 flex flex-col items-center justify-center h-full min-h-[300px]">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Project</h3>
            <p className="text-gray-500 text-center">Start a new project and invite your team to collaborate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;