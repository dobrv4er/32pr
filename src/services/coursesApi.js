import { courses } from '../data/courses'

export function fetchCourses(simulateError = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateError) {
        reject(new Error('Не удалось загрузить курсы. Попробуйте ещё раз.'))
      } else {
        resolve(courses)
      }
    }, 1000)
  })
}