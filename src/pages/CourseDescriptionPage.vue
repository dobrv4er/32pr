<script setup>
import { inject } from 'vue'
const course = inject('course')
</script>

<template>
  <section v-if="course">
    <h2>Описание</h2>
    <p>{{ course.description }}</p>
  </section>
</template>