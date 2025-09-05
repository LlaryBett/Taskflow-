import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Users,
  FolderOpen,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      name: 'Active Projects',
      value: '8',
      change: '+12%',
      changeType: 'positive',
      icon: FolderOpen,
    },
    {
      name: 'Tasks Completed',
      value: '24',
      change: '+19%',
      changeType: 'positive',
      icon: CheckCircle,
    },
    {
      name: 'Hours Tracked',
      value: '156h',
      change: '+2.3h',
      changeType: 'positive',
      icon: Clock,
    },
    {
      name: 'Team Members',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: Users,
    },
  ];

  const recentProjects = [
    {
      id: 1,
      name: 'Website Redesign',
      progress: 75,
      dueDate: '2025-01-20',
      members: 4,
      status: 'on-track'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      progress: 45,
      dueDate: '2025-02-15',
      members: 6,
      status: 'at-risk'
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      progress: 90,
      dueDate: '2025-01-10',
      members: 3,
      status: 'on-track'
    }
  ];

  const recentTasks = [
    {
      id: 1,
      title: 'Design homepage mockup',
      project: 'Website Redesign',
      priority: 'high',
      dueDate: '2025-01-08'
    },
    {
      id: 2,
      title: 'Implement user authentication',
      project: 'Mobile App Development',
      priority: 'medium',
      dueDate: '2025-01-10'
    },
    {
      id: 3,
      title: 'Review content strategy',
      project: 'Marketing Campaign',
      priority: 'low',
      dueDate: '2025-01-12'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Good morning, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
              <button
                onClick={() => navigate('/projects')}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                View all
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => navigate(`/app/projects/${project.id}`)}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{project.name}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.status === 'on-track' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status === 'on-track' ? 'On Track' : 'At Risk'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Due {project.dueDate}</span>
                      <span>{project.members} members</span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{project.progress}% complete</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/app/projects')}
              className="w-full mt-4 flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Project
            </button>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Your Tasks</h3>
              <button
                onClick={() => navigate('/app/my-tasks')}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                View all
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full ${
                      task.priority === 'high' ? 'bg-red-500' :
                      task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                    <p className="text-sm text-gray-500 truncate">{task.project}</p>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-400">
                    {task.dueDate}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/app/my-tasks')}
              className="w-full mt-4 flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Task
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white shadow-sm rounded-xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/app/projects')}
            className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FolderOpen className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-900">New Project</span>
          </button>
          <button
            onClick={() => navigate('/app/teams')}
            className="flex flex-col items-center p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            <Users className="h-8 w-8 text-emerald-600 mb-2" />
            <span className="text-sm font-medium text-emerald-900">Invite Team</span>
          </button>
          <button
            onClick={() => navigate('/app/calendar')}
            className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <Clock className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-900">Schedule</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <BarChart3 className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-orange-900">Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;