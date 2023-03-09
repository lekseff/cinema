<template>
   <v-container>
      <h3 class="text-center text-grey-darken-3 text-h4 py-2 mb-2">Новый фильм</h3>
      <v-divider class="mb-8"></v-divider>
      <v-sheet class="rounded-lg border bg-white pa-5">
         <!-- :FIXME Вынести форму в компонент -->
         <v-form ref="createMovieForm">
            <v-row>
               <!-- Название фильма -->
               <v-col cols="12">
                  <v-text-field
                      counter
                      min="1"
                      type="Текст"
                      bg-color="white"
                      label="Название фильма"
                      variant="outlined"
                      density="comfortable"
                      v-model.trim="movie.name"
                      :rules="[rules.required, rules.maxLength250]"
                      color="deep-orange-lighten-1"
                  >
                  </v-text-field>
               </v-col>
               <!-- Режиссер -->
               <v-col cols="12">
                  <v-text-field
                      counter
                      min="1"
                      type="Текст"
                      bg-color="white"
                      label="Режиссер"
                      variant="outlined"
                      density="comfortable"
                      v-model.trim="movie.directors"
                      :rules="[rules.required, rules.maxLength250]"
                      color="deep-orange-lighten-1"
                  >
                  </v-text-field>
               </v-col>
               <!-- Актеры -->
               <v-col cols="12">
                  <v-text-field
                      counter
                      min="1"
                      type="Текст"
                      label="Актеры"
                      bg-color="white"
                      variant="outlined"
                      density="comfortable"
                      v-model.trim="movie.actors"
                      :rules="[rules.required, rules.maxLength250]"
                      color="deep-orange-lighten-1"
                  >
                  </v-text-field>
               </v-col>
               <!-- Выбор стран -->
               <v-col cols="12">
                  <v-select
                      multiple
                      clearable
                      item-value="id"
                      item-title="name"
                      variant="outlined"
                      density="comfortable"
                      label="Страна (Страны)"
                      :items="getCountries"
                      v-model="movie.countries"
                      color="deep-orange-lighten-1"
                      :rules="[rules.requiredSelect]"
                  >
                     <template v-slot:selection="{ item }">
                        <v-chip text="white" class="bg-deep-orange-lighten-1 ma-1">
                           <span>{{ item.title }}</span>
                        </v-chip>
                     </template>
                  </v-select>
               </v-col>
               <!-- Выбор жанров -->
               <v-col cols="12">
                  <v-select
                      multiple
                      clearable
                      item-value="id"
                      item-title="name"
                      variant="outlined"
                      label="Жанр (Жанры)"
                      density="comfortable"
                      :items="getGenres"
                      v-model="movie.genres"
                      color="deep-orange-lighten-1"
                      :rules="[rules.requiredSelect]"
                  >
                     <template v-slot:selection="{ item }">
                        <v-chip text="white" class="bg-deep-orange-lighten-1 ma-1">
                           <span>{{ item.title }}</span>
                        </v-chip>
                     </template>
                  </v-select>
               </v-col>
               <!-- Возрастная категория -->
               <v-col cols="12" md="6" lg="3">
                  <v-select
                      item-value="id"
                      item-title="name"
                      variant="outlined"
                      density="comfortable"
                      label="Возрастная категория"
                      :items="getAgeCategories"
                      v-model="movie.ageCategory"
                      color="deep-orange-lighten-1"
                      :rules="[rules.required]"
                  >
                     <template v-slot:selection="{ item }">
                        <v-chip text="white" class="bg-deep-orange-lighten-1 ma-1">
                           <span>{{ item.title }}</span>
                        </v-chip>
                     </template>
                  </v-select>
               </v-col>
               <v-col cols="12" md="6" lg="3">
                  <v-text-field
                      min="1"
                      prefix="мин"
                      type="number"
                      label="Продолжительность"
                      variant="outlined"
                      v-model.number="movie.timeline"
                      density="comfortable"
                      oninput="validity.valid||(value='')"
                      color="deep-orange-lighten-1"
                      :rules="[rules.required, rules.negative, rules.maxValue500]"
                  >
                  </v-text-field>
               </v-col>
               <v-col cols="12" md="6" lg="3">
                  <v-file-input
                      show-size
                      label="Постер"
                      variant="outlined"
                      v-model="movie.logo"
                      density="comfortable"
                      accept=".jpg,.jpeg,.webp"
                      color="deep-orange-lighten-1"
                      :rules="[rules.requiredSelect]"
                  ></v-file-input>
               </v-col>
               <v-col cols="12" md="6" lg="3">
                  <v-file-input
                      show-size
                      variant="outlined"
                      density="comfortable"
                      label="Мобильный постер"
                      accept=".jpg,.jpeg,.webp"
                      v-model="movie.logoMobile"
                      color="deep-orange-lighten-1"
                      :rules="[rules.requiredSelect]"
                  ></v-file-input>
               </v-col>
               <v-col cols="12">
                  <v-textarea
                      counter
                      clearable
                      name="plot"
                      variant="outlined"
                      label="Описание фильма"
                      auto-grow
                      v-model="movie.plot"
                      color="deep-orange-lighten-1"
                      :rules="[rules.required, rules.maxLength4000]"
                  ></v-textarea>
               </v-col>
            </v-row>
         </v-form>
         <v-btn
             variant="flat"
             color="light-blue-darken-1"
             class="d-block mx-auto"
             @click="onSubmitForm"
         >
            Сохранить
         </v-btn>
      </v-sheet>
   </v-container>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import {rules} from "../../../../constants";

export default {
   name: 'MovieCreatePage',
   data: () => ({
      movie: {
         name: '',
         plot: null,
         logo: [],
         genres: [],
         actors: '',
         directors: '',
         logoMobile: [],
         countries: [],
         ageCategory: null
      },
      rules: rules
   }),
   mounted() {
      this.loadAllCountries()
      this.loadAllGenres()
      this.loadAllAgeCategories()
   },
   computed: {
      ...mapGetters(['getCountries', 'getGenres', 'getAgeCategories'])
   },
   methods: {
      ...mapActions(['loadAllCountries', 'loadAllGenres', 'loadAllAgeCategories', 'createMovie']),
      /**
       * Валидация и отправка формы
       * @returns {Promise<void>}
       */
      async onSubmitForm() {
         const {valid} = await this.$refs.createMovieForm.validate()
         if (!valid) return

         const data = {...this.movie}
         data.logo = data.logo[0]
         data.logoMobile = data.logoMobile[0]

         const response = await this.createMovie(data)

         if (response && response.status === 200) {
            await this.$refs.createMovieForm.reset()
         }
      }
   }
}
</script>

<style scoped>

</style>
