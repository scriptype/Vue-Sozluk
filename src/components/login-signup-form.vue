<template>
  <div v-if="step === 'initial'">
    <a @click.prevent="onClickLogin" href="#">Giriş</a>
    {{ ' / ' }}
    <a @click.prevent="onClickSignUp" href="#">Kaydol</a>
  </div>


  <form v-else-if="step === 'login'">
    <label for="username">
      E-Mail / Kullanıcı Adı: <input id="username" type="text" />
    </label>

    <label for="password">
      Şifre: <input id="password" type="password" />
    </label>

    <button type="button">Giriş</button>

    <a href="#" @click="onClickSignUp">Kaydol</a>
  </form>


  <form v-else-if="step === 'signup'">
    <label for="email">
      E-Mail: <input id="email" type="email" />
    </label>

    <label for="username">
      Kullanıcı Adı: <input id="username" type="text" />
    </label>

    <label for="password">
      Şifre: <input id="password" type="password" />
    </label>

    <button type="button">Kaydol</button>

    <a href="#" @click="onClickLogin">Üye Girişi</a>
  </form>
</template>

<script>
export default {
  name: 'LoginSignupForm',

  data() {
    return {
      step: 'initial'
    }
  },

  methods: {
    onClickLogin() {
      this.step = 'login'
    },
    onClickSignUp() {
      this.step = 'signup'
    }
  }

}
</script>

<style scoped></style>
