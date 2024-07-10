import AuthLayout from '../src/layout/AuthLayout';
import DashboardLayout from '../src/layout/DashbordLayout';
import Authentication from '../src/pages/Authentication';
import Profile from '../src/pages/Profile';
import ProjectManagement from '../src/pages/ProjectManagement';
// import Taskmanagement from '../src/pages/Taskmanagement';
import Users from '../src/pages/Users';
import ProjectDetails from '../src/pages/ProjectDetails';

export const routesConfig = [
  {
    path: '/',
    component: Authentication,
    layout: AuthLayout,
  },
  {
    path: '/project-tasks/:id',
    component: ProjectDetails,
    layout: DashboardLayout,
  },

  {
    path: '/profile',
    component: Profile,
    layout: DashboardLayout,
  },
  {
    path: '/users',
    component: Users,
    layout: DashboardLayout,
  },
  {
    path: '/project-management',
    component: ProjectManagement,
    layout: DashboardLayout,
  },
  // {
  //   path: '/task-management',
  //   component: Taskmanagement,
  //   layout: DashboardLayout,
  // },
];
