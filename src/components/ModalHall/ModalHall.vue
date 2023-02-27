<template>
   <v-dialog
       v-model="modal"
       :max-width="$vuetify.display.xs ? 'auto' : 'fit-content'"
       :fullscreen="$vuetify.display.xs"
       scrollable
   >
      <!-- Loader -->
      <AppLoader v-if="loading" style="width: 100%"/>

      <!-- Content -->
      <v-window v-else v-model="step">
         <!-- Шаг 1. Выбор мест -->
         <v-window-item>
            <v-card class="text-white bg-blue-grey-darken-4 rounded-lg">

               <!-- Шапка окна -->
               <v-card-text class="d-flex align-center justify-space-between pa-2">
                  <div>
                     <p>Выбор мест | {{ hall.name }}</p>
                     <p>Начало сеанса: {{ time }}</p>
                  </div>

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
               <div class="d-flex flex-column flex-sm-row flex-grow-1 flex-shrink-0">
                  <!-- Блок со схемой зала -->
                  <div class="px-5" style="min-width: 300px">
                     <v-img src="/img/screen.png" width="100%" class="mb-10 mt-2"></v-img>
                     <div class="px-5 pa-4 justify-center" :style="placesGrid">
                        <!-- Места -->
                        <v-img
                            v-for="place in session.places"
                            :key="place"
                            class="place rounded"
                            src="/img/place.png"
                            width="100%"
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
                      class="d-flex flex-column bg-transparent pa-4 pa-sm-3 flex-shrink-0"
                      :min-width="$vuetify.display.xs ? '' : '290px'"
                      flat
                  >
                     <!-- Карточки выбранных мест -->
                     <div class="flex-grow-1">
                        <v-card-subtitle v-if="!selectedPlaces.length" class="text-center">
                           Места не выбраны
                        </v-card-subtitle>
                        <div v-else>
                           <ModalHallSelectedCard
                               v-for="session in selectedPlaces"
                               :key="session.id"
                               :session="session"
                               @remove-place="removePlaceCard"
                           />
                        </div>
                     </div>
                     <!-- Блок итого и продолжить -->
                     <div>
                        <v-divider></v-divider>
                        <p v-if="selectedPlaces.length" class="py-2">
                           Итого: {{ totalPrice }} ₽
                        </p>
                        <v-btn
                            flat
                            block
                            color="deep-orange-lighten-1"
                            :disabled="!selectedPlaces.length"
                            @click="onNextStep"
                        >
                           Продолжить
                        </v-btn>
                     </div>
                  </v-card>
               </div>
            </v-card>
         </v-window-item>

         <!-- Шаг 2 Подтверждение выбора -->
         <v-window-item>
            <ModalHallConfirm
                :places="selectedPlaces"
                :hall="hall.name"
                :totalPrice="totalPrice"
                @nextStep="onNextStep"
                @prevStep="onPrevStep"
            />
         </v-window-item>

         <!-- Шаг 3 Электронный билет -->
         <v-window-item>
            <ModalHallTicket
                :sessionId="session.id"
                :places="selectedPlaces"
                @closeModal="onCloseModal"
            />
         </v-window-item>
      </v-window>
   </v-dialog>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import ModalHallSelectedCard from '@/components/ModalHall/ModalHallSelectedCard'
import ModalHallConfirm from '@/components/ModalHall/ModalHallConfirm'
import ModalHallTicket from "@/components/ModalHall/ModalHallTicket";
import AppLoader from '@/components/AppLoader'
import {MODAL} from '../../../constants'
import {getTimeFromString} from "../../../utills";

export default {
   name: "ModalHall",
   components: {ModalHallSelectedCard, AppLoader, ModalHallConfirm, ModalHallTicket},
   data: () => ({
      step: 0, // Шаг оформления
      loading: false,
      selectedPlaces: [],  // Выбранные пользователем места
      session: {
         id: null,
         date: '',
         places: []
      },
      hall: {
         id: '',
         name: '',
         rows: null,
         places: null,
         price: null,
         priceVip: null,
      }
   }),
   methods: {
      ...mapActions(['closeModal', 'loadSessionById', 'loadHallById']),
      /**
       * Следующий шаг оформления
       */
      onNextStep() {
         this.step += 1
      },
      /**
       * Предыдущий шаг оформления
       */
      onPrevStep() {
         this.step -= 1
      },
      /**
       * Сброс процесса оформления на начальный уровень
       */
      resetStep() {
         // Чтобы не было моргания окна
         setTimeout(() => {
            this.step = 0;
         }, 200)
      },
      /**
       * Закрывает модалку
       */
      onCloseModal() {
         this.closeModal(MODAL.addHall)
         this.resetStep()
      },
      /**
       * Выбор места
       * @param selectedPlace
       */
      onSelectPlace(selectedPlace) {
         if (selectedPlace.disabled || !selectedPlace.isFree) return
         const place = this.session.places.find(p => p.id === selectedPlace.id)

         if (place.selected) {
            this.removePlaceCard(place.id)
         } else {
            place.selected = true
            this.addPlaceCard(place)
         }
      },
      /**
       * Добавляет выбранное место список карточек сбоку
       * @param place
       */
      addPlaceCard(place) {
         const price = place.isVip ? this.hall.priceVip : this.hall.price  // Стоимость места
         const row = Math.floor((place.id - 1) / this.hall.places) + 1  // номер ряда
         // Данные для карточки выбранного места
         const data = {
            id: place.id,
            isVip: place.isVip,
            price,
            row
         }

         this.selectedPlaces.push(data)
      },
      /**
       * Удаляет из блока карточек и схемы зала
       * @param id
       */
      removePlaceCard(id) {
         this.selectedPlaces = this.selectedPlaces.filter(s => s.id !== id)
         const place = this.session.places.find(p => p.id === id)
         place.selected = false
      },
      /**
       * Загружает данные сеанса и зала
       * @returns {Promise<void>}
       */
      async loadData() {
         this.loading = true
         try {
            const session = await this.loadSessionById(this.selectedSession.id)
            const hall = await this.loadHallById(this.selectedSession.hallId)
            this.hall = {...hall}
            this.session = {
               ...session,
               places: JSON.parse(session.places)
            }
         } catch (error) {
            console.log(error)
         } finally {
            this.loading = false
         }
      }
   },
   computed: {
      ...mapGetters({
         modalStatus: 'getModalStatus',
         selectedSession: 'getSelectedSession'
      }),
      /**
       * Управление модалкой
       */
      modal: {
         get() {
            return this.modalStatus(MODAL.addHall)
         },
         set() {
            this.onCloseModal()
         }
      },
      /**
       * Сетка мест зала
       * @returns {{gridTemplateRows: string, gridTemplateColumns: string, display: string, gap: string}}
       */
      placesGrid() {
         return {
            display: 'grid',
            gap: '6px',
            gridTemplateRows: `repeat(${this.hall.rows}, minmax(10px, auto))`,
            gridTemplateColumns: `repeat(${this.hall.places}, minmax(10px, 26px))`
         }
      },
      /**
       * Общая стоимость билетов
       * @returns {*}
       */
      totalPrice() {
         return this.selectedPlaces.reduce((acc, p) => {
            return acc += p.price
         }, 0)
      },
      /**
       * Форматирует время сеанса
       * @returns {string}
       */
      time() {
         return getTimeFromString(this.session.date)
      }
   },
   watch: {
      modal() {
         if (this.modal) {
            this.selectedPlaces = []
            this.loadData()
         }
      }
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
