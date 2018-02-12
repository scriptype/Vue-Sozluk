<template>
  <img
    :src="Logo"
    class="logo" />
</template>

<script>
import Logo from '@/assets/logo.png'

export default {
  name: 'SozlukLogo',
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
}
</style>
