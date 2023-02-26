<template>
   <div
       v-for="hallId in hallsId"
       :key="hallId"
       class="pa-3 mb-4 border rounded-lg bg-blue-grey-lighten-5"
   >
      <!-- Название зала (Получаем из первого сеанса) -->
      <h6 class="d-inline-block text-h6 bg-light-blue-darken-1 rounded-lg py-2 px-4 mt-1">
         {{ sessions[hallId][0].hallName }}
      </h6>

      <!-- Временная линия -->
      <HallTimetableItem
          :sessions="sessions[hallId]"
          @remove="onRemoveSession"
      />
   </div>
</template>

<script>
import {mapActions} from 'vuex'
import HallTimetableItem from '@/views/dashboard/halls/HallTimetableItem'

export default {
   name: 'HallTimetable',
   props: ['sessions'],
   components: {HallTimetableItem},
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
      // :FIXME Поправить удаление с перезагрузкой страницы
      onRemoveSession(id) {
         this.removeSession(id)
             .then(() => {
                this.$router.go(0) // Обновляем страницу
             })
      },
   }
}
</script>

<style scoped>


</style>
