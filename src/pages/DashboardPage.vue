<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function logout() {
  localStorage.removeItem('authToken')
  router.replace({ name: 'Login' })
}
</script>

<template>
  <main>
    <nav>
      <RouterLink to="/">На главную</RouterLink>
      <RouterLink to="/courses">Каталог</RouterLink>
    </nav>
    <h1>Личный кабинет</h1>
    <p>Вы авторизованы.</p>
    <button @click="logout">Выйти</button>
  </main>
</template>
