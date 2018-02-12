<template>
  <div>
    <a @click.prevent="onClickLogin" href="#">Giriş</a>
    {{ ' / ' }}
    <a @click.prevent="onClickSignUp" href="#">Kaydol</a>
  </div>
</template>

<script>
export default {
  name: 'LoginSignupForm',
  methods: {
    onClickLogin() {
      console.log('clicked login')
    },
    onClickSignUp() {
      console.log('clicked signup')
    }
  }
}
</script>

<style scoped></style>
