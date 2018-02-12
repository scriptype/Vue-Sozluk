<template>
  <div class="initial-container" v-if="step === 'initial'">
    <a @click.prevent="onClickLogin" href="#">Giriş</a>
    {{ ' / ' }}
    <a @click.prevent="onClickSignUp" href="#">Kaydol</a>
  </div>


  <form class="login-container" v-else-if="step === 'login'">
    <label class="login-container__row" for="username">
      E-Mail / Nick: <text-input id="username" />
    </label>

    <label class="login-container__row" for="password">
      Şifre: <text-input id="password" type="password" />
    </label>

    <div class="login-container__footer">
      <a href="#" @click="onClickSignUp">← Kaydol</a>
      <my-button>Giriş</my-button>
    </div>

  </form>


  <form class="signup-container" v-else-if="step === 'signup'">
    <label class="login-container__row" for="email">
      E-Mail: <text-input id="email" type="email" />
    </label>

    <label class="login-container__row" for="username">
      Nick: <text-input id="username" />
    </label>

    <label class="login-container__row" for="password">
      Şifre: <text-input id="password" type="password" />
    </label>

    <div class="login-container__footer">
      <a href="#" @click="onClickLogin">← Üye Girişi</a>
      <my-button>Kaydol</my-button>
    </div>

  </form>
</template>

<script>
import MyButton from '@/components/my-button'
import TextInput from '@/components/text-input'

export default {
  name: 'LoginSignupForm',

  components: {
    MyButton,
    TextInput
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
@import "../styles/helpers/responsive";

.login-container,
.signup-container {
  display: flex;
  flex-direction: column;
  width: 222px;

  @media (min-width: $sm-max + 1) {
    width: 280px;
  }

  &__row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: .5em;

    @media (min-width: $sm-max + 1) {
      flex-direction: row;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
  }
}
</style>
