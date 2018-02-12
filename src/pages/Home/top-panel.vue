<template>
  <div class="top-panel-container">
    <sozluk-logo class="sozluk-logo" />

    <hr
      class="separator display-mobile hide-desktop"
      @click="toggleToolsVisibility"
      tabindex="0" />

    <search-form :class="['search-form', toolsVisibleClassObject]" />

    <user-profile-mini
      v-if="loggedIn"
      :user="user"
      @onClickNick="goToProfile"
      :class="['user-profile-mini', toolsVisibleClassObject]"
    />

    <login-signup-form
      v-else
      :class="['login-signup-form', toolsVisibleClassObject]" />
  </div>
</template>


<script>
import SozlukLogo from '@/components/sozluk-logo'
import SearchForm from '@/components/search-form'
import UserProfileMini from '@/components/user-profile-mini'
import LoginSignupForm from '@/components/login-signup-form'

export default {
  name: 'TopPanel',

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  components: {
    SozlukLogo,
    SearchForm,
    LoginSignupForm,
    UserProfileMini
  },

  data() {
    return {
      toolsVisible: false
    }
  },

  computed: {
    loggedIn() {
      return this.$props.user.loggedIn
    },
    toolsVisibleClassObject() {
      return {
        'display-desktop': true,
        'hide-mobile': !this.toolsVisible
      }
    }
  },

  methods: {
    goToProfile() {
      console.log('go to profile')
    },
    toggleToolsVisibility() {
      this.toolsVisible = !this.toolsVisible
    }
  }
}
</script>


<style scoped lang="scss">
@import "../../styles/helpers/variables";
@import "../../styles/helpers/responsive";

.top-panel-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: $light-grey;

  @media (min-width: $sm-max + 1) {
    flex-direction: row;
    font-size: .9em;
  }
}

.separator {
  height: .75em;
  width: 100%;
  margin: 0;
  position: relative;
  background: linear-gradient(
    to bottom,
    lighten($secondary-bg, 5%),
    $secondary-bg
  );
  border: none;
  cursor: pointer;

  &::after {
    content: "~";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.25em;
    color: $secondary-fg;
  }
}

@media (max-width: $sm-max) {
  .separator,
  .search-form,
  .user-profile-mini,
  .login-signup-form {
    margin-top: 1.8em;
  }
}
</style>
