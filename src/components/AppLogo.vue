<template>
  <div class="app-logo d-inline">
    <router-link
        :to="{name: 'home'}"
        class="text-uppercase font-weight-black text-decoration-none text-white text-h4"
    >
      Идём<span class="app-logo font-weight-thin">в</span>кино
    </router-link>
  </div>
</template>

<script>
export default {
  name: "AppLogo"
}
</script>

<style scoped>

.app-logo {
  user-select: none;
}
</style>
