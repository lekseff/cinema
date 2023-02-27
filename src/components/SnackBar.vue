<template>
   <v-snackbar
       :color="color"
       v-model="snackbar"
       :timeout="timeout"
   >
      <span class="text-body-1">
         {{ message }}
      </span>
      <template v-slot:actions>
         <v-btn
             color="white"
             variant="text"
             @click="onCloseSnackbar"
         >
            ЗАКРЫТЬ
         </v-btn>
      </template>
   </v-snackbar>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
   name: 'SnackBar',
   data: () => ({
      timeout: 5000,
   }),
   computed: {
      ...mapGetters(['getSnackbar']),
      snackbar: {
         get() {
            return this.getSnackbar.show
         },
         set() {
            this.closeSnackbar()
         }
      },
      message() {
         return this.getSnackbar.message
      },
      color() {
         return this.getSnackbar.color
      }
   },
   methods: {
      ...mapActions(['openSnackbar', 'closeSnackbar']),
      onCloseSnackbar() {
         this.closeSnackbar()
      }
   }
}
</script>

<style scoped>

</style>
