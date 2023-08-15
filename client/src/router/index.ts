import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import PromptImager from '../pages/PromptImager'
import ChatPage from '../pages/ChatPage';

const router = createRouter({
  /* history: to use the browser builtin support. How to manage routing history (router knows what last page in browser was) */
  history: createWebHistory(),
  /* routes[]: to register different paths (urls) */
  routes: [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/prompt-imager', component: PromptImager },
    { path: '/chat', component: ChatPage }
    // route with params
    //{ path: '/teams/:teamId', component: TeamMembers }
    /*
    our-domain.com/teams/anything
    we can write 'anything' because anything after '.../teams/' will be interpreted as a value for ':teamId' dynamic segment
    */
  ],
  linkActiveClass: 'active'
});

export default router;