<template>
  <div class="foreground-overlay" v-if="hasError">
    <div class="screen-center">
      A localização que você procurou não foi encontrada :/
      <br />Tente pesquisar por outra:
      <br />
      <br />
      <input
        class="search-input"
        v-model="searchCity"
        @keypress.enter="$emit('search', searchCity)"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "error-overlay",
  props: {
    hasError: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    searchCity: null,
  }),
};
</script>