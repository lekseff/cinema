<template>
   <v-container>
      <v-file-input
          v-model="file"
          show-size
          variant="outlined"
          label="Файл"
          density="comfortable"
          color="deep-orange-lighten-1"
      ></v-file-input>
      <v-btn variant="elevated" color="primary" @click="sendFile">
         Отправить
      </v-btn>
   </v-container>
</template>

<script>
import axios from "axios";

export default {
   name: "TestLoadFile",
   data: () => ({
      file: [],
   }),
   methods: {
      async sendFile() {
         console.log(this.file['0'])

         const url = process.env.VUE_APP_API_URL
         try {
            const response = await axios.post(`${url}/api/movies`,{file: this.file['0']}, {
               headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'multipart/form-data',
               }
            })
            console.log('send', response)
         } catch (e) {
            console.log(e)
         }
      }
   }
}
</script>

<style scoped>

</style>
