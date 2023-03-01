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
                v-model="formData.email"
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
                v-model="formData.password"
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

<!--      <v-btn-->
<!--         @click="onTest"-->
<!--      >-->
<!--         Test-->
<!--      </v-btn>-->
   </div>
</template>

<script>
import {rules} from '@/../constants'
import axios from 'axios'

export default {
   name: "AppLogin",
   data: () => ({
      rules: rules,
      formData: {
         email: '',
         password: ''
      }
   }),
   methods: {
      // async onTest() {
      //    const url = process.env.VUE_APP_API_URL
      //    try {
      //       axios.defaults.withCredentials = true
      //       const response = await axios.get(`${url}/api/test`, {
      //          headers: {
      //             'Accept': 'application/json'
      //          }
      //       })
      //       console.log('get', response)
      //    } catch (e) {
      //       console.log('get', e)
      //    }
      // },

      async validate() {
         const {valid} = await this.$refs.loginForm.validate()
         if (!valid) return
         const url = process.env.VUE_APP_API_URL
         axios.defaults.withCredentials = true
         try {
            //   Запрос на получение cookie и токена
            await axios(`${url}/sanctum/csrf-cookie`, {
               headers: {
                  'Accept': 'application/json',
               },
            })
            await axios.post(`${url}/login`, this.formData, {
               headers: {
                  'Accept': 'application/json',
                  'X-Requested-With': 'XMLHttpRequest',
                  'Access-Control-Allow-Origin': '*',
               },
            })
                .then(res => {
                   console.log(res.config.headers['X-XSRF-TOKEN'])
                   this.$router.push({name: 'dashboard'})
                })
         } catch (e) {
            console.log(e)
         }
         // axios.get(`${url}/sanctum/csrf-cookie`,
         //     // {
         //     //    withCredentials: true,
         //     //    headers: {
         //     //       'Accept': 'Application/json',
         //     //       'X-Requested-With': 'XMLHttpRequest',
         //     //       'Access-Control-Allow-Origin': '*',
         //     //    },
         //     // }
         // )
         //     .then((res) => {
         //        console.log('res csrf', res)
         //
         //        // axios.post(`${url}/login`, this.formData, {
         //        //    withCredentials: true,
         //        //    headers: {
         //        //       'Accept': 'Application/json'
         //        //    },
         //        // }).then(response => {
         //        //    console.log(response)
         //        // })
         //     })
         // this.$router.push({name: 'dashboard'})
      },
   }
}
</script>

<style scoped>

</style>
