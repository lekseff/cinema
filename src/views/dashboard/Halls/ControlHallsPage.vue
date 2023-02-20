<template>
   <h3 class="text-center text-grey-darken-3 text-h4 py-2">Управление залами</h3>
   <v-divider></v-divider>
   <!-- Блок с кнопкой добавить -->
   <v-container class="text-end">
      <v-btn
          variant="flat"
          prepend-icon="mdi-plus-thick"
          color="light-blue-darken-1"
          @click="onAddHall"
      >
         Добавить зал
      </v-btn>
   </v-container>
   <v-divider></v-divider>
   <!-- Блок с списком залов -->
   <v-container>
      <AppLoader v-if="loading"/>
      <div v-else>
         <h6
             v-if="!halls.length"
             class="text-center text-h5 text-grey-darken-1 mt-5"
         >
            Список пуст
         </h6>
         <div v-else>
            <h3 class="text-center text-grey-darken-3 text-h5 py-2">
               Список залов
            </h3>
            <ItemHall
                v-for="hall in halls"
                :key="hall.id"
                :hall="hall"
                @changeStatus="onChangeStatus"
                @remove="onRemove"
            />
         </div>
      </div>
   </v-container>
   <!-- Модалка добавления зала -->
   <AddHallModal/>
</template>

<script>
import ItemHall from "@/components/Dashboard/HallItem";
import AppLoader from "@/components/AppLoader";
import AddHallModal from "@/components/Dashboard/ModalAddHall";
import {mapActions, mapGetters} from "vuex";
import {MODAL} from '@/../constants'

export default {
   name: "ControlHallsPage",
   components: {ItemHall, AppLoader, AddHallModal},
   data: () => ({
      loading: true
   }),
   mounted() {
      this.getHalls()
          .finally(() => {
             this.loading = false
          })
   },
   computed: {
      ...mapGetters({
         halls: 'getSortHalls'
      })
   },
   methods: {
      ...mapActions(['openModal', 'getHalls', 'removeHall', 'updateHall']),
      onAddHall() {
         this.openModal(MODAL.addHall)
      },
      /**
       * Изменение активности зала
       * @param hall
       */
      onChangeStatus(hall) {
         const payload = {
            id: hall.id,
            data: {available: !hall.available}
         }
         this.updateHall(payload)
      },
      /**
       * Удаление зала
       * @param id - зала
       */
      onRemove(id) {
         this.removeHall(id)
      }
   }
}
</script>

<style scoped>

</style>
