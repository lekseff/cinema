<template>
   <v-container>
      <AppLoader v-if="loading"/>
      <div v-else>
         <v-row class="justify-space-between pa-3 mb-6">
            <!-- Название зала -->
            <v-col cols="12" class="px-0">
               <div class="border pb-0 px-4 pt-5 bg-white rounded-lg ">
                  <v-text-field
                      bg-color="white"
                      min="1"
                      type="Текст"
                      label="Название зала"
                      variant="outlined"
                      density="comfortable"
                      v-model.trim="tempHall.name"
                      :rules="[rules.maxLength50]"
                  >
                  </v-text-field>
               </div>
            </v-col>
            <!-- Блок с размерами зала -->
            <v-col cols="5" class="border rounded-lg bg-white">
               <p class="text-grey-darken-3 mb-4">
                  Укажите количество рядов и кресел в ряду:
               </p>
               <v-form>
                  <!-- :TODO Попробовать вынести форму или инпуты в отдельный компонент -->
                  <v-row class="justify-space-around">
                     <v-col cols="5">
                        <v-text-field
                            min="1"
                            type="number"
                            label="Рядов, шт"
                            variant="outlined"
                            density="comfortable"
                            v-model.number="tempHall.rows"
                            oninput="validity.valid||(value='')"
                            :rules="[rules.required, rules.maxValue50]"
                            @update:modelValue="changeStructure"
                        >
                        </v-text-field>
                     </v-col>
                     <v-col cols="5">
                        <v-text-field
                            min="1"
                            type="number"
                            label="Мест, шт"
                            variant="outlined"
                            v-model.number="tempHall.places"
                            density="comfortable"
                            oninput="validity.valid||(value='')"
                            :rules="[rules.required, rules.maxValue50]"
                            @update:modelValue="changeStructure"
                        >
                        </v-text-field>
                     </v-col>
                  </v-row>
               </v-form>
            </v-col>

            <!-- Блок со стоимостью -->
            <v-col cols="5" class="border rounded-lg  bg-white">
               <p class="text-grey-darken-3 mb-4">
                  Установите цены для типов кресел:
               </p>
               <v-form>
                  <v-row class="justify-space-around">
                     <v-col cols="5">
                        <v-text-field
                            min="1"
                            prefix="₽"
                            type="number"
                            label="Обычное"
                            variant="outlined"
                            v-model.number="tempHall.price"
                            density="comfortable"
                            oninput="validity.valid||(value='')"
                            :rules="[rules.required, rules.negative, rules.maxValue10000]"
                        >
                        </v-text-field>
                     </v-col>
                     <v-col cols="5">
                        <v-text-field
                            :min="1"
                            prefix="₽"
                            type="number"
                            label="VIP место"
                            variant="outlined"
                            density="comfortable"
                            v-model.number="tempHall.priceVip"
                            oninput="validity.valid||(value='')"
                            :rules="[rules.required, rules.negative, rules.maxValue10000]"
                        >
                        </v-text-field>
                     </v-col>
                  </v-row>
               </v-form>
            </v-col>
         </v-row>
         <v-sheet class="place-border rounded-lg pa-3 mb-3">
            <h5 class="text-center text-body-1">Структура зала</h5>

            <!-- :FIXME: Переделать на компоненты -->
            <div class="py-2 d-flex flex-wrap justify-space-around mb-3">
               <div class="d-inline-flex align-center justify-center flex-grow-1 pa-1 pa-sm-2">
               <span class="place-border rounded d-inline-block"
                     style="width: 22px; height: 22px; background-color: white"
               ></span>
                  <p class="ml-2 text-body-2" :style="{whiteSpace: 'nowrap'}">- Обычное</p>
               </div>
               <div class="d-inline-flex align-center justify-center flex-grow-1 pa-1 pa-sm-2">
               <span
                   class="place-border rounded d-inline-block"
                   style="width: 22px; height: 22px; background-color: aqua"
               ></span>
                  <p class="ml-2 text-body-2" :style="{whiteSpace: 'nowrap'}">- VIP</p>
               </div>
               <div class="d-inline-flex align-center justify-center flex-grow-1 pa-1 pa-sm-2">
               <span
                   class="place-border rounded d-inline-block"
                   style="width: 22px; height: 22px; background-color: #E0E0E0"
               ></span>
                  <p class="ml-2 text-body-2" :style="{whiteSpace: 'nowrap'}">- Недоступно(нет кресла)</p>
               </div>
            </div>
            <div
                class="place-border pa-4 bg-grey-lighten-4 rounded-lg"
                @click.right.prevent
            >
               <span class="d-block text-center" style="letter-spacing: 1.4rem">
                  ЭКРАН
               </span>
               <!-- Структура зала -->
               <!-- :FIXME Попробовать переделать на компонент и использовать в модалке -->
               <div style="min-width: 300px">
                  <div class="pa-4 justify-center" :style="placesGrid">
                     <!-- Места -->
                     <v-img
                         v-for="place in tempHall.structure"
                         :key="place.id"
                         class="place place-border rounded"
                         src="/img/place.png"
                         :class=
                             "{
                            'place-vip': place.isVip,
                            'place-disabled': place.disabled
                         }"
                         @click="onChangeStatus(place.id)"
                         @click.right.prevent="onSetDisable(place.id)"
                     ></v-img>
                  </div>
               </div>
            </div>
         </v-sheet>
         <v-btn
             variant="flat"
             color="light-blue-darken-1"
             class="d-block mx-auto"
             @click="onSaveSettings"
         >
            Сохранить
         </v-btn>
      </div>
   </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AppLoader from "@/components/AppLoader";
import {rules} from '@/../constants'
import {createStructure} from "../../../../utills";

export default {
   name: "SettingHallPage",
   components: {AppLoader},
   data: () => ({
      rules: rules,
      loading: true,
      tempHall: {}   // Временная переменная для хранения состояния зала
   }),
   mounted() {
      this.loadHallById(this.id)
          .catch(() => {
             this.$router.push({name: 'not-found'})
          })
          .finally(() => {
             this.loading = false
             if (this.hall) this.createTempHall()
          })
   },
   methods: {
      ...mapActions(['loadHallById', 'updateHall']),
      /**
       * Создает временную переменную для хранения изменений
       */
      createTempHall() {
         this.tempHall = {...this.hall}
         if (Object.entries(this.tempHall).length === 0) return   // Проверка на пустой объект
         this.tempHall.structure = JSON.parse(this.hall.structure)
      },
      /**
       * Изменяет статус места
       * @param id
       */
      onChangeStatus(id) {
         const place = this.tempHall.structure.find(p => p.id === id)
         if (place.disabled) {
            place.disabled = false
         } else if (place.isVip) {
            place.isVip = false
            place.disabled = true
         } else {
            place.isVip = true
         }
      },
      /**
       * Устанавливает статус disabled по правой кнопке мыши
       * @param id
       */
      onSetDisable(id) {
         const place = this.tempHall.structure.find(p => p.id === id)
         place.disabled = !place.disabled
      },
      /**
       * Изменяет структуру зала при изменении размеров
       */
      changeStructure() {
         this.tempHall.structure = createStructure(this.tempHall.rows, this.tempHall.places)
      },
      /**
       * Сохраняет настройки на сервере
       */
      onSaveSettings() {
         const data = {...this.tempHall}
         delete data.id
         data.structure = JSON.stringify(data.structure)
         // Удаляем значения, которые не изменились
         for (let key in data) {
            if (data[key] === this.hall[key]) delete data[key]
         }
         // Проверка на пустой объект. Если пустой не отправляем
         const isEmpty = Object.entries(data).length === 0
         if (isEmpty) return
         this.updateHall({id: this.id, data})
      }
   },
   computed: {
      ...mapGetters({
         hall: 'getHall',
         halls: 'getAllHalls'
      }),
      id() {
         return this.$route.params.id
      },
      /**
       * Стили сетки мест зала
       * @returns {{gridTemplateRows: string, gridTemplateColumns: string, display: string, gap: string}}
       */
      placesGrid() {
         return {
            display: 'grid',
            gap: '5px',
            gridTemplateRows: `repeat(${this.tempHall.rows}, minmax(10px, auto))`,
            gridTemplateColumns: `repeat(${this.tempHall.places}, minmax(10px, 26px))`
         }
      },
   },
   watch: {
      id: function () {
         if (!this.id) return
         this.loading = true
         this.loadHallById(this.id)
             .finally(() => {
                this.loading = false
                if (this.hall) this.createTempHall()
             })
      }
   }
}
</script>

<style scoped>
.place-border {
   border: 1px solid gray;
}

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

/* Не доступное место */
.place-disabled {
   background-color: #E0E0E0 !important;
}
</style>
