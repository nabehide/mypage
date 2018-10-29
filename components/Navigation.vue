<template>
  <nav>
    <ul>
      <nuxt-link exact to="/" ><li>Top</li></nuxt-link>
      <nuxt-link to="/wallpaper" ><li>Wallpaper</li></nuxt-link>
      <nuxt-link to="/demo" ><li>Demo</li></nuxt-link>
    </ul>
  </nav>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
nav {
  ul {
    list-style: none;
    margin: 5px 0px;

    border-bottom: white solid thin;

    .selected {
      border-bottom: black solid thin;
    }

    a {
      color: black;
    }

    li {
      display: inline-block;
      margin: 0px 10px;
    }
  }
  border-bottom: {
    color: black;
    style: solid;
    width: thin;
  }
}
</style>
