import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import PromptImager from '../pages/PromptImager'
import ChatPage from '../pages/ChatPage';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/prompt-imager', component: PromptImager },
    { path: '/chat', component: ChatPage }
  ],
  linkActiveClass: 'active'
});

export default router;