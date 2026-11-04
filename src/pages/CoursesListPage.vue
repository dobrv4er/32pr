<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchCourses } from '../services/coursesApi'

const route = useRoute()
const router = useRouter()
const items = ref([])
const loading = ref(true)
const error = ref('')
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
    ? items.value
    : items.value.filter(course => course.category === category.value),
)
function setCategory(value) {
  router.push({ name: 'Courses', query: { category: value } })
}
async function loadCourses(simulateError = false) {
  loading.value = true
  error.value = ''
  try {
    items.value = await fetchCourses(simulateError)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ошибка загрузки.'
  } finally {
    loading.value = false
  }
}
onMounted(() => loadCourses())
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

    <div v-if="loading" role="status" class="loading">
      <span class="spinner" aria-hidden="true"></span>
      Загрузка курсов…
    </div>
    <div v-else-if="error" role="alert">
      <p>{{ error }}</p>
      <button @click="loadCourses()">Повторить загрузку</button>
    </div>
    <template v-else>
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
      <button @click="loadCourses(true)">Проверить ошибку загрузки</button>
    </template>
  </main>
</template>

<style scoped>
.loading { display: flex; align-items: center; gap: 12px; }
.spinner {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid #d8dee8;
  border-top-color: #2454a6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>