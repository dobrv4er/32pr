<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const password = ref('')
const error = ref('')

function login() {
  error.value = ''
  if (password.value !== '1234') {
    error.value = 'Неверный пароль. Для практики введите 1234.'
    return
  }
  localStorage.setItem('authToken', 'demo')

  const redirect = route.query.redirect
  if (typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')) {
    const target = router.resolve(redirect)
    if (target.meta.requiresAuth) {
      router.replace(target.fullPath)
      return
    }
  }
  router.replace({ name: 'Dashboard' })
}
</script>

<template>
  <main>
    <RouterLink to="/">На главную</RouterLink>
    <h1>Вход</h1>
    <form @submit.prevent="login">
      <label for="password">Учебный пароль: 1234</label>
      <input id="password" v-model="password" type="password" autocomplete="current-password" />
      <button type="submit">Войти</button>
    </form>
    <p v-if="error" role="alert">{{ error }}</p>
  </main>
</template>