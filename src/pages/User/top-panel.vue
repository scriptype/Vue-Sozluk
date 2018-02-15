<template>
  <div :class="['top-panel-container', expandingCollapsingPanelClassObject]">
    <sozluk-logo linked class="sozluk-logo" />

    <hr
      class="separator display-mobile hide-desktop"
      @click="toggleToolsVisibility"
      tabindex="0" />

    <search-form :class="['search-form', toolsVisibleClassObject]" />

    <user-profile-mini
      v-if="loggedIn"
      :user="user"
      :class="['user-profile-mini', toolsVisibleClassObject]"
    />

    <login-signup-form
      v-else
      :class="['login-signup-form', toolsVisibleClassObject]" />
  </div>
</template>


<script>
import { mapState } from 'vuex'
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
      toolsVisible: false,
      isToolsLeaving: false,
      isToolsEntering: false,
      toolsVisiblityAnimationDuration: 0.35
    }
  },

  computed: {
    ...mapState([
      'loggedIn'
    ]),
    toolsVisibleClassObject() {
      return {
        'display-desktop': true,
        'hide-mobile': !this.toolsVisible,
        tools: true,
        entering: this.isToolsEntering,
        leaving: this.isToolsLeaving
      }
    },
    expandingCollapsingPanelClassObject() {
      return {
        expanding: this.isToolsEntering,
        collapsing: this.isToolsLeaving
      }
    }
  },

  methods: {
    toggleToolsVisibility() {
      const isVisible = this.toolsVisible
      if (isVisible) {
        this.isToolsLeaving = true
        this.isToolsEntering = false
        setTimeout(() => {
          this.toolsVisible = false
          this.isToolsLeaving = false
          this.isToolsEntering = false
        }, this.toolsVisiblityAnimationDuration * 1000)
      } else {
        this.toolsVisible = true
        this.isToolsEntering = true
        this.isToolsLeaving = false
        setTimeout(() => {
          this.isToolsLeaving = false
          this.isToolsEntering = false
        }, this.toolsVisiblityAnimationDuration * 1000)
      }
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

.top-panel-container.expanding {
  max-height: 185px;
  animation: panel-expanding .4s 1 forwards;
}

.top-panel-container.collapsing {
  max-height: 530px;
  animation: panel-collapsing .4s 1 forwards;
}

@keyframes panel-expanding {
  to {
    max-height: 530px;
  }
}

@keyframes panel-collapsing {
  to {
    max-height: 185px;
  }
}

.tools.entering {
  opacity: 0;
  animation: tools-entering .3s 1 forwards;
}

.tools.leaving {
  opacity: 1;
  animation: tools-leaving .3s 1 forwards;
}

@keyframes tools-entering {
  to {
    opacity: 1;
  }
}

@keyframes tools-leaving {
  to {
    opacity: 0;
  }
}
</style>
