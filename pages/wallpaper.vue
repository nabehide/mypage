<template>
  <div>
    <nuxt-child :key="$route.params.name" />
  </div>
</template>

<script>
export default {
  asyncData({ env }) {
    return {
      wallpapers: env.wallpapers,
    }
  },
}
</script>

<style scoped lang="scss">
div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  margin: 75px 0px;
}
@media screnn and (min-width:768px) {
  div {
    margin: 50px 0px;
  }
}
</style>
