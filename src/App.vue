<template>
   <v-app>
      <MainLayout/>
   </v-app>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import {mapActions} from 'vuex'

export default {
   name: 'App',
   components: {MainLayout},
   mounted() {
      this.getCinemaDates()
   },
   methods: {
      ...mapActions(['getCinemaDates']),
   }
}
</script>
