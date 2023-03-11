<template>
   <v-timeline direction="vertical" side="end">

      <v-timeline-item
          v-for="session in sessions"
          :key="session.id"
          fill-dot
          size="x-small"
          dot-color="light-blue-darken-1"
      >

         <template v-slot:opposite>
            {{ session.time }}
         </template>

         <v-hover v-slot="{ isHovering, props }">
            <div
                class="d-flex align-center justify-space-between rounded-lg  elevation-4 bg-white"
                v-bind="props"
                style="position: relative"
            >
               <p class="d-inline-block text-body-1 px-3 py-2">
                  {{ session.movieName }}
               </p>
               <v-btn
                   v-if="isHovering"
                   variant="text"
                   color="red-darken-4"
                   class="pa-0 remove-btn"
                   @click="onRemove(session.id)"
               >
                  <v-icon size="32">
                     mdi-delete-circle-outline
                  </v-icon>
               </v-btn>
            </div>
         </v-hover>
      </v-timeline-item>
   </v-timeline>
</template>

<script>
export default {
   name: 'SessionTimetableItem',
   props: {
      sessions: {
         type: Object,
         require: true,
      }
   },
   methods: {
      /**
       * Удаление сеанса
       * @param id
       */
      onRemove(id) {
         this.$emit('remove', id)
      }
   }
}
</script>

<style scoped>
.remove-btn {
   position: absolute !important;
   top: calc(50% - 18px);
   right: -64px;
}
</style>
