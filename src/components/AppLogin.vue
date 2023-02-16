<template>
  <div class="d-flex align-center justify-center fill-height">
      <v-card
        width="400"
      >
        <v-card-title class="text-center">
          Вход
        </v-card-title>
        <v-divider></v-divider>
          <v-form class="px-5 py-4"
          >
            <v-text-field
                v-model="email"
                label="Email"
            >
            </v-text-field>
            <v-text-field
                v-model="password"
                label="Password"
            >
            </v-text-field>
          </v-form>


      </v-card>
  </div>
</template>

<script>
export default {
  name: "AppLogin",
  data: () => ({
    email: '',
    password: ''
  })
}
</script>

<style scoped>

</style>
