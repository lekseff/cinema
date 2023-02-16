<template>
   <v-app>
     <component :is="layout"></component>
<!--      <MainLayout/>-->
   </v-app>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import EmptyLayout from "@/layouts/EmptyLayout";

import {mapActions} from 'vuex'

export default {
   name: 'App',
   components: {MainLayout, EmptyLayout},
   mounted() {
      this.getCinemaDates ()
   },
   methods: {
      ...mapActions(['getCinemaDates']),
   },
  computed: {
    layout () {
       return (this.$route.meta.layout || 'empty') + '-layout'
     }
  }
}
</script>
