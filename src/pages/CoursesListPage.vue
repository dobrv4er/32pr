<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courses } from '../data/courses'

const route = useRoute()
const router = useRouter()
const filters = [
  { value: 'all', label: 'Все' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
]
const category = computed(() => {
  const value = route.query.category
  return typeof value === 'string' ? value : 'all'
})
const filteredCourses = computed(() =>
  category.value === 'all'
    ? courses
    : courses.filter(course => course.category === category.value),
)
function setCategory(value) {
  router.push({ name: 'Courses', query: { category: value } })
}
</script>

<template>
  <main>
    <RouterLink to="/">На главную</RouterLink>
    <h1>Курсы</h1>
    <nav>
      <button v-for="item in filters" :key="item.value"
        :class="{ active: category === item.value }"
        @click="setCategory(item.value)">
        {{ item.label }}
      </button>
    </nav>
    <div class="cards">
      <article v-for="course in filteredCourses" :key="course.id">
        <h2>{{ course.title }}</h2>
        <p>Категория: {{ course.category }}</p>
        <RouterLink class="button" :to="{ name: 'Course', params: { id: course.id } }">
          Подробнее
        </RouterLink>
      </article>
    </div>
    <p v-if="filteredCourses.length === 0">Курсы по выбранной категории не найдены.</p>
  </main>
</template>