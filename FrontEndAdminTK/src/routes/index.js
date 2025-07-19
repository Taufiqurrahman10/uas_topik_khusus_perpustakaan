import { createRouter, createWebHistory } from 'vue-router';

import AdminLayout from '../components/AdminLayout.vue';
import AdminLogin from '../views/AdminLogin.vue';
import Dashboard from '../views/Dashboard.vue';
import UsersView from '../views/UsersPage.vue';
import BooksView from '../views/BooksPage.vue';
import CategoryView from '../views/CategoryPage.vue';
import LoansView from '../views/LoansPage.vue';
import ReturnsView from '../views/ReturnsPage.vue';

const routes = [
  {
    path: '/login',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: AdminLayout, 
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },
      { path: 'users', name: 'Users', component: UsersView },
      { path: 'books', name: 'Books', component: BooksView },
      { path: 'categories', name: 'Categories', component: CategoryView },
      { path: 'loans', name: 'Loans', component: LoansView },
      { path: 'returns', name: 'Returns', component: ReturnsView },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('userToken');

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'AdminLogin' });
  } 
  else if ((to.name === 'AdminLogin' || to.name === 'AdminRegister') && isLoggedIn) {
    next({ path: '/dashboard' });
  } 
  else {
    next();
  }
});

export default router;
