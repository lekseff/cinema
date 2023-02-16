<template>
   <main class="d-flex flex-column bg-blue-grey-darken-4 fill-height">
      <AppLoader v-if="getLoading"/>
      <template v-else>
         <TheHeader/>
         <v-divider></v-divider>
         <router-view></router-view>
      </template>
   </main>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import AppLoader from "@/components/AppLoader";
import {mapGetters} from "vuex";

export default {
   name: "MainLayout",
   components: {TheHeader, AppLoader},
   computed: {
      ...mapGetters(['getLoading'])
   }
}
</script>

<style scoped>

</style>
