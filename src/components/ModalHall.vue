<template>
   <v-dialog
       v-model="modal"
       max-width="fit-content"
   >
      <!--        <v-container>-->
      <v-card class="text-white bg-blue-grey-darken-4 rounded-lg">

         <!-- Шапка окна -->
         <v-card-text class="d-flex align-center justify-space-between pa-2">
            <span>Выбор мест | {{ hall.name }}</span>
            <!-- Кнопка закрыть -->
            <v-icon
                size="30"
                class="text-white"
                icon="mdi-window-close"
                @click="onCloseModal"
            ></v-icon>
         </v-card-text>
         <v-divider></v-divider>

         <!-- Контент -->
         <div class="d-flex flex-column flex-sm-row">
            <!-- Блок со схемой зала -->
            <div class="px-5" style="min-width: 300px">
               <v-img src="/img/screen.png" width="100%" class="mb-10 mt-2"></v-img>
               <div class="px-5 pa-4 justify-center" :style="placesGrid">
                  <!-- Места -->
                  <v-img
                      v-for="place in hall.places"
                      :key="place"
                      class="place rounded"
                      src="/img/place.png"
                      :class="{
                            'place-occupied': !place.isFree,
                            'place-selected': place.selected,
                            'place-vip': place.isVip,
                            'place-disabled': place.disabled
                         }"
                      @click="onSelectPlace(place)"
                  ></v-img>
               </div>
               <v-divider></v-divider>
               <!-- Описание мест -->
               <!-- :FIXME: Переделать на компоненты -->
               <div class="py-2 d-flex flex-wrap justify-space-around">
                  <div class="d-inline-flex align-center justify-center pa-1 pa-sm-2">
                     <span class="place rounded d-inline-block" style="width: 20px; height: 20px"></span>
                     <p class="ml-2 text-white text-body-2" :style="{whiteSpace: 'nowrap'}">-&nbsp;Свободно</p>
                  </div>
                  <div class="d-inline-flex align-center justify-center flex-grow-1 pa-1 pa-sm-2">
                     <span class="place-vip rounded d-inline-block" style="width: 20px; height: 20px"></span>
                     <p class="ml-2 text-white text-body-2" :style="{whiteSpace: 'nowrap'}">-&nbsp;VIP</p>
                  </div>
                  <div class="d-inline-flex align-center justify-center flex-grow-1 pa-1 pa-sm-2">
                     <div class="place-occupied rounded" style="width: 20px; height: 20px"></div>
                     <p class="ml-2 text-white text-body-2" :style="{whiteSpace: 'nowrap'}">-&nbsp;Занято</p>
                  </div>
                  <div class="d-inline-flex align-center justify-center flex-grow-1 pa-1 pa-sm-2">
                     <div class="place-selected rounded" style="width: 20px; height: 20px"></div>
                     <p class="ml-2 text-white text-body-2" :style="{whiteSpace: 'nowrap'}">-&nbsp;Выбрано</p>
                  </div>
               </div>
               <v-divider v-if="$vuetify.display.xs"></v-divider>
            </div>
            <v-divider vertical></v-divider>

            <!-- Блок с выбранными местами -->
            <v-card
                class="d-flex flex-column bg-transparent pa-4 pa-sm-3"
                width="100%"
                :max-width="$vuetify.display.xs ? '' : '280px'"
                flat
            >
               <!-- Карточки выбранных мест -->
               <div class="flex-grow-1">
                  <ModalHallSelectedCard v-if="true"/>
                  <v-card-subtitle v-else class="text-center flex-grow-1">
                     Места не выбраны
                  </v-card-subtitle>
               </div>
               <!-- Блок итого и продолжить -->
               <div v-if="true">
                  <v-divider></v-divider>
                  <p class="py-2">Итого: 500 ₽</p>
                  <v-btn color="deep-orange-lighten-1" block flat>Продолжить</v-btn>
               </div>
            </v-card>
         </div>
      </v-card>
      <!--        </v-container>-->
   </v-dialog>
</template>

<script>
import ModalHallSelectedCard from "@/components/ModalHallSelectedCard";

export default {
   name: "ModalHall",
   components: {ModalHallSelectedCard},
   data: () => ({
      modal: false,
      hall: {
         name: 'Зал 1',
         rows: 4,
         columns: 4,
         places: [
            {
               id: 1,
               isFree: false,
               selected: false,
               isVip: false,
               disabled: false
            },
            {
               id: 2,
               isFree: false,
               selected: false,
               isVip: true,
               disabled: false
            },
            {
               id: 3,
               isFree: false,
               selected: false,
               isVip: false,
               disabled: false
            },
            {
               id: 4,
               isFree: true,
               selected: false,
               isVip: false,
               disabled: false
            },
            {
               id: 5,
               isFree: true,
               selected: false,
               isVip: false,
               disabled: false
            },
            {
               id: 6,
               isFree: true,
               selected: false,
               isVip: true,
               disabled: false
            },
            {
               id: 7,
               isFree: true,
               selected: false,
               isVip: true,
               disabled: false
            },
            {
               id: 8,
               isFree: true,
               selected: false,
               isVip: false,
               disabled: false
            },
            {
               id: 9,
               isFree: true,
               selected: false,
               isVip: false,
               disabled: false
            },
            {
               id: 10,
               isFree: true,
               selected: false,
               isVip: false,
               disabled: false
            },
            {
               id: 11,
               isFree: true,
               selected: false,
               isVip: false,
               disabled: false
            },
            {
               id: 12,
               isFree: true,
               selected: false,
               isVip: false,
               disabled: false
            },
            {
               id: 13,
               isFree: true,
               selected: false,
               isVip: false,
               disabled: false
            },
            {
               id: 14,
               isFree: true,
               selected: false,
               isVip: false,
               disabled: true
            },
            {
               id: 15,
               isFree: true,
               selected: false,
               isVip: false,
               disabled: true
            },
            {
               id: 16,
               isFree: true,
               selected: false,
               isVip: false,
               disabled: false
            }
         ]
      }
   }),
   methods: {
      onCloseModal() {
         this.modal = false
      },
      /**
       * Выбор места
       * @param selectedPlace
       */
      onSelectPlace(selectedPlace) {
         if (selectedPlace.disabled || !selectedPlace.isFree) return
         const place = this.hall.places.find(p => p.id === selectedPlace.id)
         place.selected = !place.selected
      }
   },
   mounted() {
      setTimeout(() => {
         this.modal = true
      }, 300)
   },
   computed: {
      /**
       * Сетка мест зала
       * @returns {{gridTemplateRows: string, gridTemplateColumns: string, display: string, gap: string}}
       */
      placesGrid() {
         return {
            display: 'grid',
            gap: '5px',
            gridTemplateRows: `repeat(${this.hall.rows}, minmax(10px, auto))`,
            gridTemplateColumns: `repeat(${this.hall.columns}, minmax(10px, 26px))`
         }
      },
   }
}
</script>

<style scoped>

/* Место (свободное место) */
.place {
   cursor: pointer;
   background-color: white;
   transition: all 100ms ease-out;
}

.place:hover {
   transform: scale(0.9);
   transition: all 100ms ease-out;
}

/* Vip место */
.place-vip {
   background-color: aqua !important;
}

/* Выбранное место */
.place-selected {
   background-color: #00C853 !important; /* green-accent-4 */
   border-radius: 50% !important;
   box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.2);
}

/* Занятое место */
.place-occupied {
   background-color: #FF7043 !important; /* deep-orange-lighten-1 */
   transform: scale(0.5) !important;
}

/* Не доступное место */
.place-disabled {
   background-color: transparent !important;
   cursor: default;
}
</style>
