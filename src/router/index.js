import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import CoursesListPage from '../pages/CoursesListPage.vue'
import CoursePage from '../pages/CoursePage.vue'
import CourseDescriptionPage from '../pages/CourseDescriptionPage.vue'
import CourseProgramPage from '../pages/CourseProgramPage.vue'
import CourseReviewsPage from '../pages/CourseReviewsPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/courses', name: 'Courses', component: CoursesListPage },
    {
      path: '/courses/:id',
      component: CoursePage,
      props: true,
      children: [
        {
          path: '',
          name: 'Course',
          redirect: to => ({ name: 'CourseDescription', params: { id: to.params.id } }),
        },
        { path: 'description', name: 'CourseDescription', component: CourseDescriptionPage },
        { path: 'program', name: 'CourseProgram', component: CourseProgramPage },
        { path: 'reviews', name: 'CourseReviews', component: CourseReviewsPage },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      meta: { guestOnly: true },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardPage,
      meta: { requiresAuth: true },
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
  ],
})

export default router