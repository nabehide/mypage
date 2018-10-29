<template>
  <div>
    <GlslCanvas/>
    <Gui/>
  </div>
</template>

<script>
import GlslCanvas from '~/components/GlslCanvas'
import Gui from '~/components/Gui'

export default {
  components: {
    GlslCanvas,
    Gui,
  },
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
