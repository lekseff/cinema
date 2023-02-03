<template>
  <h1>{{ text }}</h1>
  <router-link :to="{name: 'home'}">Домой</router-link>
</template>

<script>
export default {
  name: 'AboutView',
  data: () => ({
   text: 'About Page'
  }),
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
