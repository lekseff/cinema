<template>
   <v-card
       elevation="3"
       :variant="hall.available ? 'elevated' : 'plain'"
       class="d-flex align-center justify-space-between bg-grey-lighten-5 my-3 py-2"
   >
      <div class="d-flex align-center flex-grow-1">
         <v-card-title>{{ hall.name }}</v-card-title>
         <v-card-subtitle>Рядов: {{ hall.rows }}</v-card-subtitle>
         <v-card-subtitle>Мест: {{ hall.places }}</v-card-subtitle>
         <v-card-subtitle>Статус: {{ hall.available ? 'Активен' : 'Не активен' }}</v-card-subtitle>
      </div>
      <v-card-actions class="justify-end">
         <v-btn
             variant="flat"
             color="light-blue-darken-1"
             @click="onChangeStatus(hall)"
         >
            {{ hall.available ? 'Отключить' : 'Активировать' }}
         </v-btn>
         <v-btn
             variant="text"
             color="red-darken-4"
             class="pa-0"
             @click="onRemove(hall)"
         >
            <v-icon size="32">
               mdi-delete-circle-outline
            </v-icon>
         </v-btn>
      </v-card-actions>
   </v-card>
</template>

<script>
export default {
   name: 'HallItem',
   props: ['hall'],
   methods: {
      onChangeStatus(hall) {
         this.$emit('change-status', hall)
      },
      onRemove(hall) {
         this.$emit('remove', hall.id)
      }
   }
}
</script>

<style scoped>

</style>
