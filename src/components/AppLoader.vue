<template>
   <div
       class="d-flex justify-center align-center flex-grow-1 fill-height">
      <v-progress-circular
          :size="70"
          :width="6"
          indeterminate
          model-value="20"
          color="deep-orange-lighten-1"
      ></v-progress-circular>
   </div>
</template>

<script>
export default {
   name: "AppLoader"
}
</script>

<style scoped>

</style>
