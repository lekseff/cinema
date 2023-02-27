<template>
   <div class="app-logo d-inline">
      <router-link
          :to="{name: 'home'}"
          class="text-h6 text-sm-h4 font-weight-black text-decoration-none text-white"
      >
         <span class="text-uppercase">Идем</span>
         <span class="font-weight-thin text-deep-orange-lighten-1 text-uppercase">в</span>
         <span class="text-uppercase">кино</span>
      </router-link>
   </div>
</template>

<script>
export default {
   name: 'AppLogo'
}
</script>

<style scoped>

.app-logo {
   user-select: none;
}
</style>
