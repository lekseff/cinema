<template>
   <v-container class="ma-0 pa-0" fluid>
      <v-container>
         <!-- Слайдер -->
         <AppSlider/>
         <!-- Панель выбора сеанса -->
         <AppSession/>
         <!-- Карточки фильмов -->
         <v-row class="mt-6 mb-2">
            <v-col
                v-for="movie in movies"
                :key="movie.id"
                cols="12"
                lg="6"
            >
               <MovieCard :movie="movie"/>
            </v-col>
         </v-row>
      </v-container>
      <!-- Footer -->
      <AppFooter/>
   </v-container>
   <!-- Модалка -->
   <ModalHall/>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AppSlider from "@/components/AppSlider";
import AppSession from "@/components/AppSession";
import MovieCard from "@/components/MovieCard";
import AppFooter from "@/components/AppFooter";
import ModalHall from "@/components/ModalHall";

export default {
   name: 'HomePage',
   components: {AppSlider, AppSession, MovieCard, AppFooter, ModalHall},
   data: () => ({
      // movies: [],
      // movies: [
      //    {
      //       id: 1,
      //       name: 'Дивергент',
      //       plot: 'В антиутопическом Чикаго будущего существует общество, члены которого придумали способ избегать конфликтов и поддерживать вокруг незыблемый порядок. Каждый человек по достижении 16 лет должен определить, к чему лежит его душа, и в зависимости от своих личностных качеств присоединиться к одной из пяти фракций – Искренность, Бесстрашие, Эрудиция, Дружелюбие или Отречение. Для того, чтобы и не ошибиться с фракцией, накануне церемонии выбора подростки проходят специальное тестирование. Юная Беатрис оказывается угрозой для всей сложившейся системы, когда тесты выявляют в ней дивергента – человека, которого невозможно однозначно определить в одну из фракций. Способные мыслить независимо и не питающие особого уважения к правительству, дивергенты одним своим существованием дискредитируют принципы, на которых строится общество. И теперь Беатрис – одна из таких людей, живущих вне закона и борющихся с системой, которая намерена любой ценой от них избавиться.',
      //       countries: ['США'],
      //       directors: 'Нил Бёргер',
      //       genres: ['фантастика', 'детектив', 'боевик', 'мелодрама'],
      //       actors: 'Шейлин Вудли, Тео Джеймс, Джай Кортни',
      //       logo: '/img/cards/divergent-card.jpg',
      //       logoMobile: '/img/cards/divergent-card-mobile.jpg',
      //       ageCategory: '12+',
      //       // timeline: {
      //       //   hours :0,
      //       //   minutes: 48
      //       // },
      //       timeline: 134, // min
      //       sessions: [
      //          {
      //             id: 1001,
      //             isAvailable: false,
      //             hall_id: 1,
      //             time: '10:45'
      //          },
      //          {
      //             id: 1002,
      //             isAvailable: true,
      //             hall_id: 2,
      //             time: '12:45'
      //          },
      //          {
      //             id: 1003,
      //             isAvailable: true,
      //             hall_id: 4,
      //             time: '14:00'
      //          },
      //          {
      //             id: 1005,
      //             isAvailable: true,
      //             hall_id: 6,
      //             time: '18:10'
      //          }
      //       ],
      //    },
      //    {
      //       id: 2,
      //       name: 'Путешествие 2',
      //       plot: 'На этот раз Шон Андерсон получает закодированный сигнал с просьбой о помощи, причем с загадочного острова, из места, где никакого острова и быть не может. Там обитают странные формы жизни, скрываются горы золота, смертоносные вулканы и не одна ошеломляющая тайна. Отчиму Шона, не сумевшему остановить его, ничего не остается, как тоже присоединиться к поискам. Вместе с пилотом вертолета и его прекрасной и решительной дочерью им предстоит найти остров, спасти его одинокого обитателя и немедленно покинуть это место, прежде чем землетрясение скроет остров под водой и похоронит навеки его сокровища.',
      //       countries: ['США'],
      //       directors: 'Брэд Пейтон',
      //       genres: ['фантастика', 'фэнтези', 'боевик', 'комедия', 'приключения', 'семейный'],
      //       actors: 'Дуэйн Джонсон, Джош Хатчерсон, Ванесса Энн Хадженс',
      //       logo: 'img/cards/tour-card.jpg',
      //       logoMobile: '/img/cards/tour-card-mobile.jpg',
      //       ageCategory: '0+',
      //       timeline: 94, // min
      //       sessions: [
      //          {
      //             id: 1010,
      //             isAvailable: false,
      //             time: '9:45'
      //          },
      //          {
      //             id: 1011,
      //             isAvailable: false,
      //             time: '11:05'
      //          },
      //          {
      //             id: 1012,
      //             isAvailable: true,
      //             time: '14:00'
      //          }
      //       ],
      //    },
      //    {
      //       id: 3,
      //       name: 'Властелин колец. Две крепости',
      //       plot: 'Братство распалось, но Кольцо Всевластья должно быть уничтожено. Фродо и Сэм вынуждены довериться Голлуму, который взялся провести их к вратам Мордора. Громадная армия Сарумана приближается: члены братства и их союзники готовы принять бой. Битва за Средиземье продолжается.',
      //       countries: ['Новая Зеландия', 'США'],
      //       directors: 'Питер Джексон',
      //       genres: ['фэнтези', 'приключения', 'драма'],
      //       actors: 'Элайджа Вуд, Иэн Маккеллен, Вигго Мортенсен',
      //       logo: 'img/cards/ring-card.jpg',
      //       logoMobile: '/img/cards/ring-card-mobile.jpg',
      //       ageCategory: '12+',
      //       timeline: 179, // min
      //       sessions: [
      //          {
      //             id: 1020,
      //             isAvailable: true,
      //             time: '7:10'
      //          },
      //          {
      //             id: 1021,
      //             isAvailable: true,
      //             time: '11:05'
      //          },
      //          {
      //             id: 1022,
      //             isAvailable: true,
      //             time: '13:00'
      //          },
      //          {
      //             id: 1023,
      //             isAvailable: true,
      //             time: '15:45'
      //          },
      //          {
      //             id: 1024,
      //             isAvailable: true,
      //             time: '20:45'
      //          }
      //       ],
      //    },
      //    {
      //       id: 4,
      //       name: 'Джокер',
      //       plot: 'Готэм, начало 1980-х годов. Комик Артур Флек живет с больной матерью, которая с детства учит его «ходить с улыбкой». Пытаясь нести в мир хорошее и дарить людям радость, Артур сталкивается с человеческой жестокостью и постепенно приходит к выводу, что этот мир получит от него не добрую улыбку, а ухмылку злодея Джокера.',
      //       countries: ['США', 'Канада'],
      //       directors: 'Тодд Филлипс',
      //       genres: ['драма', 'криминал', 'триллер'],
      //       actors: 'Хоакин Феникс, Роберт Де Ниро, Зази Битц',
      //       logo: 'img/cards/joker-card.jpg',
      //       logoMobile: '/img/cards/joker-card-mobile.jpg',
      //       ageCategory: '18+',
      //       timeline: 122, // min
      //       sessions: [
      //          {
      //             id: 1030,
      //             isAvailable: true,
      //             time: '7:10'
      //          },
      //          {
      //             id: 1031,
      //             isAvailable: true,
      //             time: '11:05'
      //          },
      //       ],
      //    },
      //    {
      //       id: 5,
      //       name: 'Начало',
      //       plot: 'Кобб – талантливый вор, лучший из лучших в опасном искусстве извлечения: он крадет ценные секреты из глубин подсознания во время сна, когда человеческий разум наиболее уязвим. Редкие способности Кобба сделали его ценным игроком в привычном к предательству мире промышленного шпионажа, но они же превратили его в извечного беглеца и лишили всего, что он когда-либо любил.\n' +
      //           '\n' +
      //           'И вот у Кобба появляется шанс исправить ошибки. Его последнее дело может вернуть все назад, но для этого ему нужно совершить невозможное – инициацию. Вместо идеальной кражи Кобб и его команда спецов должны будут провернуть обратное. Теперь их задача – не украсть идею, а внедрить ее. Если у них получится, это и станет идеальным преступлением.\n' +
      //           '\n' +
      //           'Но никакое планирование или мастерство не могут подготовить команду к встрече с опасным противником, который, кажется, предугадывает каждый их ход. Врагом, увидеть которого мог бы лишь Кобб.',
      //       countries: ['США', 'Великобритания'],
      //       directors: 'Кристофер Нолан',
      //       genres: ['фантастика', 'боевик', 'триллер', 'драма', 'детектив'],
      //       actors: 'Леонардо ДиКаприо, Джозеф Гордон-Левитт',
      //       logo: 'img/cards/inception-card.jpg',
      //       logoMobile: '/img/cards/inception-card-mobile.jpg',
      //       ageCategory: '12+',
      //       timeline: 148, // min
      //       sessions: [
      //          {
      //             id: 1040,
      //             isAvailable: true,
      //             time: '7:10'
      //          },
      //          {
      //             id: 1041,
      //             isAvailable: true,
      //             time: '11:05'
      //          },
      //          {
      //             id: 1042,
      //             isAvailable: true,
      //             time: '13:00'
      //          },
      //          {
      //             id: 1043,
      //             isAvailable: true,
      //             time: '15:45'
      //          },
      //          {
      //             id: 1044,
      //             isAvailable: true,
      //             time: '20:45'
      //          },
      //          {
      //             id: 1045,
      //             isAvailable: true,
      //             time: '15:45'
      //          },
      //       ],
      //    },
      // ]
   }),
   created() {
      this.setSelectedDate('2023-02-15')
   },
   methods: {
      ...mapActions(['setSelectedDate'])
   },
   computed: {
      ...mapGetters({
         selectedDate: 'getSelectedDate',
         getMovieById: 'getMovieById',
         filtered: 'getSessionsWithDate'
      }),
      movies () {
         const result = []
         const currentSessions = this.filtered(this.selectedDate)
         currentSessions.forEach(item => {
            const [movieId, sessions] = Object.entries(item)[0]
            const movie = this.getMovieById(Number(movieId))
            movie.sessions = sessions
            result.push(movie)
         })
         return result
      }
   }
}
</script>

<style scoped>

</style>
