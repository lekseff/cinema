<template>
   <div
       v-for="hallId in hallsId"
       :key="hallId"
       class="pa-3 mb-4 border rounded-lg bg-blue-grey-lighten-5"
   >
      <!-- Название зала (Получаем из первого сеанса) -->
      <h6 class="d-inline-block text-h6 bg-light-blue-darken-1 rounded-lg py-1 px-3 mt-1">
         {{ sessions[hallId][0].hallName }}
      </h6>

      <!-- Временная линия -->
      <SessionTimetableItem
          :sessions="sessions[hallId]"
          @remove="onRemoveSession"
      />
   </div>
</template>

<script>
import {mapActions} from 'vuex'
import SessionTimetableItem from '@/components/Dashboard/SessionTimetableItem'

export default {
   name: 'SessionTimetable',
   props: ['sessions'],
   components: {SessionTimetableItem},
   computed: {
      /**
       * id залов сеансов на текущую дату
       * @returns {string[]}
       */
      hallsId() {
         return Object.keys(this.sessions)
      }
   },
   methods: {
      ...mapActions(['removeSession']),
      /**
       * Удаляет сеанс
       * @param id
       */
      onRemoveSession(id) {
         this.removeSession(id)
             .then((response) => {
                if (response.status === 200) {
                   this.$router.go(0) // Обновляем страницу
                }
             })
      },
   }
}
</script>

<style scoped>

</style>
