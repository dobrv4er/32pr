<script setup>
import { inject } from 'vue'
const course = inject('course')
</script>

<template>
  <section v-if="course">
    <h2>Отзывы</h2>
    <article v-for="(review, index) in course.reviews" :key="index">
      <h3>{{ review.author }}</h3>
      <p>{{ review.text }}</p>
      <p>Рейтинг: {{ review.rating }} / 5</p>
    </article>
    <p v-if="course.reviews.length === 0">Отзывов пока нет.</p>
  </section>
</template>