import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Settings, 
  Users, 
  Calendar,
  MoreHorizontal,
  Play,
  Pause,
  Plus
} from 'lucide-react';
import KanbanBoard from '../../components/shared/KanbanBoard';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('board');

  const project = {
    id: 1,
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design and improved user experience',
    progress: 75,
    dueDate: '2025-01-20',
    members: [
      { id: 1, name: 'John Doe', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2', role: 'Owner' },
      { id: 2, name: 'Jane Smith', avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2', role: 'Designer' },
      { id: 3, name: 'Mike Johnson', avatar: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2', role: 'Developer' },
    ],
    status: 'active'
  };

  const tabs = [
    { id: 'board', name: 'Board', icon: Calendar },
    { id: 'overview', name: 'Overview', icon: MoreHorizontal },
    { id: 'members', name: 'Team', icon: Users },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/projects')}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
              <p className="text-gray-600 text-sm">{project.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Project Members */}
            <div className="flex -space-x-2">
              {project.members.slice(0, 4).map((member) => (
                <img
                  key={member.id}
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src={member.avatar}
                  alt={member.name}
                  title={member.name}
                />
              ))}
              {project.members.length > 4 && (
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 text-xs font-medium text-gray-500">
                  +{project.members.length - 4}
                </div>
              )}
            </div>

            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Invite
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Project Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <nav className="px-6 flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'board' && <KanbanBoard projectId={project.id} />}
        {activeTab === 'overview' && <ProjectOverview project={project} />}
        {activeTab === 'members' && <ProjectMembers project={project} />}
        {activeTab === 'settings' && <ProjectSettings project={project} />}
      </div>
    </div>
  );
};

const ProjectOverview = ({ project }) => (
  <div className="p-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <p className="text-gray-600 mt-1">{project.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Due Date</label>
                <p className="text-gray-900 mt-1">{project.dueDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Tasks</span>
              <span className="font-medium">{project.tasksTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Completed</span>
              <span className="font-medium text-green-600">{project.tasksCompleted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">In Progress</span>
              <span className="font-medium text-blue-600">{project.tasksTotal - project.tasksCompleted}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProjectMembers = ({ project }) => (
  <div className="p-6">
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
        <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Invite Member
        </button>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {project.members.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={member.avatar}
                  alt={member.name}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ProjectSettings = ({ project }) => (
  <div className="p-6">
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Settings</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
          <input
            type="text"
            defaultValue={project.name}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            rows={3}
            defaultValue={project.description}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectDetail;