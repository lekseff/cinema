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

         <v-card-title class="text-center text-grey-darken-3 pt-0 mb-3">
            Добавить жанр
         </v-card-title>
         <v-form ref="addGenreForm">
            <v-text-field
                clearable
                type="text"
                variant="outlined"
                v-model="genre"
                label="Жанр"
                density="comfortable"
                :rules="[rules.required, rules.maxLength250]"
            >
            </v-text-field>
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
import {mapActions, mapGetters} from 'vuex'
import {MODAL, rules} from '../../../constants'

export default {
   name: "ModalAddGenre",
   data: () => ({
      genre: '',
      loading: false,
      rules: rules
   }),
   computed: {
      ...mapGetters(['getModalStatus']),
      dialog: {
         get() {
            return this.getModalStatus(MODAL.addGenre)
         },
         set() {
            this.onCloseModal()
         }
      }
   },
   methods: {
      ...mapActions(['openModal', 'closeModal', 'createGenre']),
      /**
       * Закрывает модалку
       */
      onCloseModal() {
         this.closeModal(MODAL.addGenre)
         this.$refs.addGenreForm.reset()
      },
      /**
       * Валидация и оправка формы
       * @returns {Promise<void>}
       */
      async onSubmitForm() {
         const {valid} = await this.$refs.addGenreForm.validate()
         if (!valid) return
         await this.sendForm()
      },
      /**
       * Отправляет форму
       * @returns {Promise<void>}
       */
      async sendForm() {
         this.loading = true
         await this.createGenre({
            name: this.genre
         })
             .finally(() => {
                this.loading = false
                this.onCloseModal()
             })
      }
   }
}
</script>

<style scoped>

</style>
