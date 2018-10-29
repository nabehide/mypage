<template>
  <nav>
    <ul>
      <nuxt-link exact to="/" ><li>Top</li></nuxt-link>
      <nuxt-link to="/wallpaper" id="wallpaper" ><li>Wallpaper</li></nuxt-link>
      <nuxt-link to="/demo" id="demo" ><li>Demo</li></nuxt-link>
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

    border-bottom: none;

    .selected {
      border-bottom: black solid thin;
      -webkit-transition: all 300ms 0s ease-;
      transition: border-bottom-color 1000ms 0s ease;
    }

    li {
      display: inline-block;
      margin: 0px 10px;
    }
    a,
    a:visited {
      color: black;
      text-decoration: none;
    }
    a:hover {
      color: black;
      text-decoration {
        line: underline;
        color: black;
        style: solid;
      }
    }
    a:active {
      color: black;
      text-decoration: none;
    }
  }
  border-bottom: {
    color: black;
    style: solid;
    width: thin;
  }
}
</style>
