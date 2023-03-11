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
            Добавить страну
         </v-card-title>
         <v-form ref="addCountryForm">
            <v-text-field
                clearable
                type="text"
                variant="outlined"
                v-model="country"
                label="Название страны"
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
import {mapGetters, mapActions} from 'vuex'
import {MODAL, rules} from '../../../constants'

export default {
   name: "ModalAddCountry",
   data: () => ({
      country: '',
      loading: false,
      rules: rules,
   }),
   computed: {
      ...mapGetters(['getModalStatus']),
      dialog: {
         get() {
            return this.getModalStatus(MODAL.addCountry)
         },
         set() {
            this.onCloseModal()
         }
      }
   },
   methods: {
      ...mapActions(['closeModal', 'createCountry']),
      onCloseModal() {
         this.closeModal(MODAL.addCountry)
         this.$refs.addCountryForm.reset()
      },
      async onSubmitForm() {
         const {valid} = await this.$refs.addCountryForm.validate()
         if (!valid) return
         await this.sendForm()
      },
      async sendForm() {
         this.loading = true
         await this.createCountry({
            name: this.country
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
