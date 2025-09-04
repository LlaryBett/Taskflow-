import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, FolderOpen, MoreHorizontal } from 'lucide-react';

const TeamList = () => {
  const navigate = useNavigate();

  const teams = [
    {
      id: 1,
      name: 'Design Team',
      description: 'UI/UX designers and creative professionals',
      members: 8,
      projects: 5,
      avatar: 'https://images.pexels.com/photos/3184429/pexels-photo-3184429.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: 2,
      name: 'Development Team',
      description: 'Frontend and backend developers',
      members: 12,
      projects: 8,
      avatar: 'https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: 3,
      name: 'Marketing Team',
      description: 'Marketing specialists and content creators',
      members: 6,
      projects: 3,
      avatar: 'https://images.pexels.com/photos/3184434/pexels-photo-3184434.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
            <p className="text-gray-600 mt-1">Manage your teams and collaborate with colleagues</p>
          </div>
          <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </button>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    className="w-12 h-12 rounded-xl object-cover"
                    src={team.avatar}
                    alt={team.name}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {team.name}
                    </h3>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-6">{team.description}</p>

              {/* Stats */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{team.members} members</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <FolderOpen className="h-4 w-4" />
                    <span className="text-sm">{team.projects} projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Create Team Card */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer group">
          <div className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Team</h3>
            <p className="text-gray-500 text-center">Start collaborating with your colleagues</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamList;