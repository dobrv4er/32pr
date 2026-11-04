<script setup>
import { computed, provide } from 'vue'
import { useRoute } from 'vue-router'
import { courses } from '../data/courses'

const props = defineProps({ id: { type: String, required: true } })
const route = useRoute()
const course = computed(() => courses.find(item => item.id === Number(props.id)))
provide('course', course)

function tabPath(tab) {
  return route.path.endsWith('/') ? `../${tab}` : `./${tab}`
}
</script>

<template>
  <main>
    <RouterLink to="/courses">Назад к списку</RouterLink>
    <template v-if="course">
      <h1>{{ course.title }}</h1>
      <p>Категория: {{ course.category }}</p>
      <nav>
        <RouterLink :to="tabPath('description')">Описание</RouterLink>
        <RouterLink :to="tabPath('program')">Программа</RouterLink>
        <RouterLink :to="tabPath('reviews')">Отзывы</RouterLink>
      </nav>
      <RouterView />
    </template>
    <h1 v-else>Курс не найден</h1>
  </main>
</template>