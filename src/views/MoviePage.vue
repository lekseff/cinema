<template>
  <v-container>
    <v-card v-if="!loading" class="bg-transparent" flat>
      <div class="d-flex">
        <!-- Баннер -->
        <v-img
            cover
            width="400"
            :src="movie.logo"
            aspect-ratio="0.66"
            class="flex-grow-0 rounded-lg"
            :alt="movie.name"
        >
        </v-img>
        <!-- Информация -->
        <div class="flex-grow-1 pl-10">

          <v-card-title class="text-white text-h4 pb-4">
            {{ movie.name }}
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text class="text-subtitle-1 pr-0">
            <p class="mt-4 pb-3 font-weight-regular">
              <span class="font-weight-medium">Режиссер: </span>{{ movie.directors }}
            </p>
            <v-divider></v-divider>
            <p class="mt-5 pb-3">
              <span class="font-weight-medium">Страна: </span> {{ movie.countries.join(', ') }}
            </p>
            <v-divider></v-divider>
            <p class="mt-5 pb-3">
              <span class="font-weight-medium">Актеры: </span> {{ movie.actors }}
            </p>
            <v-divider></v-divider>
            <p class="mt-5 pb-3">
              <span class="font-weight-medium">Жанр: </span> {{ movie.genres.join(', ') }}
            </p>
            <v-divider></v-divider>
            <p class="mt-5 pb-3">
              <span class="font-weight-medium">Продолжительность: </span> {{ movie.timeline }} мин
            </p>
            <v-divider></v-divider>
            <p class="mt-5 pb-3">
              <span class="font-weight-medium">Возрастной рейтинг: </span> {{ movie.ageCategory }}
            </p>
            <v-divider></v-divider>
          </v-card-text>
        </div>
      </div>

      <!-- Описание -->
      <div class="mt-4">
        <v-card-title class="text-white text-h4 pb-4">
          Описание
        </v-card-title>
        <v-card-text class="text-subtitle-1">
          {{ movie.plot }}
        </v-card-text>
      </div>
    </v-card>
  </v-container>
  <AppFooter/>
</template>

<script>
import AppFooter from "@/components/AppFooter";
import axios from "axios";

export default {
  name: "MoviePage",
  components: {AppFooter},
  data: () => ({
    // movie: {
    //   id: 1,
    //   name: 'Дивергент',
    //   plot: 'В антиутопическом Чикаго будущего существует общество, члены которого придумали способ избегать конфликтов и поддерживать вокруг незыблемый порядок. Каждый человек по достижении 16 лет должен определить, к чему лежит его душа, и в зависимости от своих личностных качеств присоединиться к одной из пяти фракций – Искренность, Бесстрашие, Эрудиция, Дружелюбие или Отречение. Для того, чтобы и не ошибиться с фракцией, накануне церемонии выбора подростки проходят специальное тестирование. Юная Беатрис оказывается угрозой для всей сложившейся системы, когда тесты выявляют в ней дивергента – человека, которого невозможно однозначно определить в одну из фракций. Способные мыслить независимо и не питающие особого уважения к правительству, дивергенты одним своим существованием дискредитируют принципы, на которых строится общество. И теперь Беатрис – одна из таких людей, живущих вне закона и борющихся с системой, которая намерена любой ценой от них избавиться.',
    //   countries: ['США'],
    //   directors: 'Нил Бёргер',
    //   genres: ['фантастика', 'детектив', 'боевик', 'мелодрама'],
    //   actors: 'Шейлин Вудли, Тео Джеймс, Джай Кортни',
    //   logo: '/img/cards/divergent-card.jpg',
    //   ageCategory: '12+',
    //   timeline: 134, // min
    // },
    movie: {},
    loading: true
  }),
  created() {
    // const url = process.env.VUE_APP_API_URL
    // const {id} = this.$route.params
    //
    // axios
    //     .get(`${url}/api/movies/${id}`)
    //     .then((resp => {
    //       this.name = resp.data.data
    //       console.log('res', this.name.name)
    //     }))
    this.getMovie()
  },
  methods: {
    // Пока для пробы сделал загрузку фильма с сервера
    async getMovie() {
      const url = process.env.VUE_APP_API_URL
      const {id} = this.$route.params

      const response = await axios.get(`${url}/api/movies/${id}`)
      this.movie = response.data.data
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
