<template>
  <div class="top-panel-container">
    <sozluk-logo />

    <search-form />

    <user-profile-mini
      v-if="loggedIn"
      :user="user"
      @onClickNick="goToProfile"
    />

    <login-signup-form v-else />
  </div>
</template>


<script>
import SozlukLogo from '@/components/sozluk-logo'
import SearchForm from '@/components/search-form'
import UserProfileMini from '@/components/user-profile-mini'
import LoginSignupForm from '@/components/login-signup-form'

export default {
  name: 'Home',

  components: {
    SozlukLogo,
    SearchForm,
    LoginSignupForm,
    UserProfileMini
  },

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  computed: {
    loggedIn() {
      return this.$props.user.loggedIn
    }
  },

  methods: {
    goToProfile() {
      console.log('go to profile')
    }
  }
}
</script>


<style scoped>
.top-panel-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
