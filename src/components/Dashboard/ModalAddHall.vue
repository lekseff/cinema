<template>
   <v-dialog v-model="dialog" transition="dialog-top-transition" width="auto">
      <v-card
          :loading="loading"
          max-width="500"
          min-width="400"
          class="align-self-center pa-4 rounded-lg"
      >
         <!-- Loader -->
         <template v-slot:loader="{ isActive }">
            <v-progress-linear
                :active="isActive"
                color="deep-purple"
                height="4"
                indeterminate
            ></v-progress-linear>
         </template>

         <v-card-title class="text-center pt-0 mb-3">
            Добавить зал
         </v-card-title>
         <v-form ref="addHallForm">
            <v-text-field
                clearable
                type="text"
                variant="outlined"
                v-model="hall.name"
                label="Название зала"
                density="comfortable"
                :rules="[rules.required, rules.maxLength50]"
            >
            </v-text-field>

            <v-card-subtitle class="text-center mb-2 text-body-2">
               Параметры мест
            </v-card-subtitle>

            <v-row class="justify-space-between">
               <v-col cols="6">
                  <v-text-field
                      min="1"
                      type="number"
                      label="Рядов, шт"
                      variant="outlined"
                      v-model="hall.rows"
                      density="comfortable"
                      oninput="validity.valid||(value='')"
                      :rules="[rules.required, rules.maxValue50]"
                  >
                  </v-text-field>
               </v-col>
               <v-col cols="6">
                  <v-text-field
                      min="1"
                      type="number"
                      label="Мест, шт"
                      variant="outlined"
                      v-model="hall.places"
                      density="comfortable"
                      oninput="validity.valid||(value='')"
                      :rules="[rules.required, rules.maxValue50]"
                  >
                  </v-text-field>
               </v-col>
            </v-row>

            <v-card-subtitle class="text-center mb-2 text-body-2">
               Стоимость
            </v-card-subtitle>

            <v-row>
               <v-col cols="6">
                  <v-text-field
                      min="1"
                      prefix="₽"
                      type="number"
                      variant="outlined"
                      v-model="hall.price"
                      label="Обычное место"
                      density="comfortable"
                      oninput="validity.valid||(value='')"
                      :rules="[rules.required, rules.negative, rules.maxValue10000]"
                  >
                  </v-text-field>
               </v-col>

               <v-col cols="6">
                  <v-text-field
                      min="1"
                      prefix="₽"
                      type="number"
                      label="VIP место"
                      variant="outlined"
                      density="comfortable"
                      v-model="hall.priceVip"
                      oninput="validity.valid||(value='')"
                      :rules="[rules.required, rules.negative, rules.maxValue10000]"
                  >
                  </v-text-field>
               </v-col>
            </v-row>
         </v-form>

         <v-card-actions class="pb-0">
            <v-spacer></v-spacer>
            <v-btn color="light-blue-darken-1" variant="text" @click="onCloseModal">
               Закрыть
            </v-btn>
            <v-btn color="light-blue-darken-1" variant="elevated" @click="onSubmitForm">
               Добавить
            </v-btn>
         </v-card-actions>
      </v-card>
   </v-dialog>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {MODAL, rules} from '@/../constants'
import {createStructure} from "../../../utills";

export default {
   name: 'ModalAddHall',
   data: () => ({
      rules: rules,
      loading: false,
      hall: {
         name: '',
         rows: '',
         places: '',
         price: '',
         priceVip: '',
         structure: [],
      }
   }),
   computed: {
      ...mapGetters(['getModalStatus']),
      dialog: {
         get() {
            return this.getModalStatus([MODAL.addHall])
         },
         set() {
            this.closeModal(MODAL.addHall)
         }
      }
   },
   methods: {
      ...mapActions(['closeModal', 'openSnackbar', 'createHall', 'getHalls']),
      /**
       * Валидация, дополнение и отправка формы
       * @returns {Promise<void>}
       */
      async onSubmitForm() {
         const {valid} = await this.$refs.addHallForm.validate()
         if (!valid) return
         this.hall.structure = createStructure(this.hall.rows, this.hall.places, true)
         this.sendForm()
      },
      onCloseModal() {
         this.closeModal(MODAL.addHall)
         this.$refs.addHallForm.reset()
      },
      // :FIXME Удалить коммент
      // /**
      //  * Создает json структуру зала
      //  * @returns {string} - json
      //  */
      // createStructure() {
      //    const structure = []
      //    const count = this.hall.rows * this.hall.places
      //    for (let i = 1; i <= count; i++) {
      //       structure.push({
      //          id: i,
      //          isFree: true,
      //          selected: false,
      //          isVip: false,
      //          disabled: false
      //       })
      //    }
      //    return JSON.stringify(structure)
      // },
      /**
       * Отправка данных формы
       */
      sendForm() {
         this.createHall(this.hall)
             .then(() => {
                this.loading = false
                this.getHalls() // Загружаем залы после добавления
                this.onCloseModal()
                this.openSnackbar({
                   message: `Зал успешно добавлен`,
                   color: 'success'
                })
             })
             .catch(err => {
                this.loading = false
                this.onCloseModal()
                this.openSnackbar({
                   message: err.response.data.message,
                   color: 'error'
                })
             })
      }
   }
}
</script>

<style scoped>

</style>
