<template>
  <div class="initial-container" v-if="step === 'initial'">
    <a @click.prevent="onClickLogin" href="#">Giriş</a>
    {{ ' / ' }}
    <a @click.prevent="onClickSignUp" href="#">Kaydol</a>
  </div>


  <form class="login-container" v-else-if="step === 'login'">
    <label class="login-container__row" for="username">
      E-Mail / Kullanıcı Adı: <input id="username" type="text" />
    </label>

    <label class="login-container__row" for="password">
      Şifre: <input id="password" type="password" />
    </label>

    <div class="login-container__button-container">
      <my-button>Giriş</my-button>
    </div>

    <a href="#" @click="onClickSignUp">Kaydol</a>
  </form>


  <form class="signup-container" v-else-if="step === 'signup'">
    <label class="login-container__row" for="email">
      E-Mail: <input id="email" type="email" />
    </label>

    <label class="login-container__row" for="username">
      Kullanıcı Adı: <input id="username" type="text" />
    </label>

    <label class="login-container__row" for="password">
      Şifre: <input id="password" type="password" />
    </label>

    <div class="login-container__button-container">
      <my-button>Kaydol</my-button>
    </div>

    <a href="#" @click="onClickLogin">Üye Girişi</a>
  </form>
</template>

<script>
import MyButton from '@/components/my-button'

export default {
  name: 'LoginSignupForm',

  components: {
    MyButton
  },

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

<style scoped lang="scss">
.initial-container { }

.login-container {
  display: flex;
  flex-direction: column;
  width: 300px;

  &__row {
    display: flex;
    justify-content: space-between;
  }

  &__button-container {
    text-align: right;
  }
}
</style>
