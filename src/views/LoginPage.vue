<template>
   <div class="d-flex align-center justify-center fill-height bg-blue-grey-darken-4">
      <v-card
          width="400"
          elevation="10"
          rounded="lg"
      >
         <v-card-title class="text-center text-blue-grey-darken-3">
            Авторизация
         </v-card-title>
         <v-divider></v-divider>
         <v-form
             ref="loginForm"
             class="d-flex flex-column px-5 py-4"
         >
            <v-text-field
                v-model="email"
                clearable
                type="email"
                label="Email"
                maxlength="50"
                validate-on="blur"
                variant="outlined"
                color="blue-grey-darken-3"
                placeholder="johndoe@gmail.com"
                :rules="[rules.required, rules.email, rules.maxLength50]"
            >
            </v-text-field>
            <v-text-field
                v-model="password"
                clearable
                class="mt-3"
                maxlength="50"
                type="password"
                label="Password"
                variant="outlined"
                :rules="[rules.required, rules.maxLength50]"
                color="blue-grey-darken-3"
                placeholder="Enter your password"
            >
            </v-text-field>
            <v-btn class="align-self-center" color="deep-orange-lighten-1" @click="validate">ВОЙТИ</v-btn>
         </v-form>
      </v-card>
   </div>
</template>

<script>
import {rules} from '@/../constants'

export default {
   name: "AppLogin",
   data: () => ({

      email: '',
      password: '',
      rules: rules
   }),
   methods: {
      async validate() {
         const {valid} = await this.$refs.loginForm.validate()
         if (!valid) return
         console.log('Форма валидна, отправляем')
         console.log()
         // this.$router.push({name: 'dashboard'})
      },
   }
}
</script>

<style scoped>

</style>
