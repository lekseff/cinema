<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/about">About</router-link>
    <div>
      <div class="text-subtitle-2 mb-2">Default</div>
      <v-expansion-panels>
        <v-expansion-panel
            v-for="i in 3"
            :key="i"
            title="Item"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => ({
    items: [
      {
        title: 'Item #1',
        value: 1,
      },
      {
        title: 'Item #2',
        value: 2,
      },
      {
        title: 'Item #3',
        value: 3,
      },
    ],
  }),
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
