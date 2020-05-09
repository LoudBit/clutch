<template>
  <div class="color" :style="style"></div>
</template>

<script>
export default {
  props: {
    color: {
      type: Object,
      required: true
    }
  },
  computed: {
    style() {
      const pad = 1 + this.color.lch()[1] / 50
      const margin = ' ' + pad * -1 + 'em'
      return {
        background: this.color.hex(),
        bottom: `${Math.abs(this.color.lch()[0]).toFixed(4)}%`,
        left: `${Math.abs((this.color.lch()[2] / 360) * 100).toFixed(6)}%`,
        padding: `${Math.abs(1 + this.color.lch()[1] / 50).toFixed(6)}em`,
        margin: '0 0' + margin + margin
      }
    }
  }
}
</script>

<style>
.color {
  box-sizing: border-box;
  height: 24px;
  width: 24px;
  border-radius: 96px;
  position: absolute;
}

.color code {
  background: transparent;
  color: #fff;
}
</style>
