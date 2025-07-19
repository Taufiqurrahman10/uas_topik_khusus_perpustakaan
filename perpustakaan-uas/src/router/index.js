import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import AllBooks from '../views/allbooks.vue'
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import BookDetail from '../views/BookDetail.vue'
import ReceiptPage from '../components/Receipt.vue'
import RiwayatPeminjaman from '@/components/RiwayatPeminjaman.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  
  {
    path: '/buku', 
    name: 'buku',
    component: AllBooks 
  },

  {
    path: '/tentang', 
    name: 'tentang',
    component: AboutPage 
  },
  {
    path: '/login', 
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register', 
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/buku/:id', 
    name: 'BookDetail',
    component: BookDetail
  },
  {
    path: '/pinjam/sukses', 
    name: 'receipt',
    component: ReceiptPage
  },
  {
    path: '/riwayat', 
    name: 'riwayat',
    component: RiwayatPeminjaman
  }
  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // eslint-disable-next-line
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

export default router