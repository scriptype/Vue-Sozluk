<template>
  <router-link v-if="linked" to="/">
    <img :src="Logo" class="logo" />
  </router-link>
  <img v-else :src="Logo" class="logo" />
</template>

<script>
import Logo from '@/assets/logo.png'

export default {
  name: 'SozlukLogo',

  props: {
    linked: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      Logo
    }
  }
}
</script>

<style scoped>
.logo {
  height: 96px;
  vertical-align: middle;
}
</style>
