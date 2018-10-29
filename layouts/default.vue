<template>
  <div class="container">
    <Navigation />
    <nuxt />
  </div>
</template>

<script>
import Navigation from '~/components/Navigation'

export default {
  components: {
    Navigation,
  }
}
</script>

<style scoped lang="scss">
.container {
  color: 'white';
  background-color: 'black';

  /*
  border: {
    top: {
      color: black;
      style: solid;
      width: thin;
    }
    bottom: {
      color: black;
      style: solid;
      width: thin;
    }
  }
  */

  margin: 5px;

}
</style>
