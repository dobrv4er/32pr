<script setup>
import { inject } from 'vue'
const course = inject('course')
</script>

<template>
  <section v-if="course">
    <h2>Программа</h2>
    <ol>
      <li v-for="topic in course.program" :key="topic">{{ topic }}</li>
    </ol>
    <p v-if="course.program.length === 0">Программа пока не опубликована.</p>
  </section>
</template>