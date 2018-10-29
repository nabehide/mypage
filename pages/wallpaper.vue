<template>
  <nuxt-child :key="$route.params.name" />
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
