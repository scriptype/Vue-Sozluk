<template>
  <input
    :type="type"
    :class="textInputClassObject"
  />
</template>

<script>
export default {
  name: 'TextInput',

  props: {
    type: {
      type: String,
      default: 'text'
    },
    styling: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'auto'
    }
  },

  computed: {
    textInputClassObject() {
      return {
        'text-input': true,
        'text-input--text': this.$props.type === 'text',
        'text-input--password': this.$props.type === 'password',
        'text-input--email': this.$props.type === 'email',
        'text-input--error': this.$props.styling === 'error',
        'text-input--danger': this.$props.styling === 'danger',
        'text-input--success': this.$props.styling === 'success',
        'text-input--small': this.$props.size === 'small',
        'text-input--big': this.$props.size === 'big',
        'text-input--fluid': this.$props.size === 'fluid',
        'text-input--primary': this.$props.level === 'primary',
        'text-input--secondary': this.$props.level === 'secondary',
        'text-input--tertiary': this.$props.level === 'tertiary'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/helpers/variables";
@import "../styles/helpers/responsive";

.text-input {
  padding: .4em 1em;
  border: 1px solid;
  border-color: $grey;
  border-radius: 3px;
  font: inherit;

  @media (min-width: $sm-max + 1) {
    padding: .2em .8em;
  }
}

.text-input--error {
  border-color: $error-bg;
  color: $error-fg;
}

.text-input--danger {
  border-color: $danger-bg;
  color: $danger-fg;
}

.text-input--success {
  border-color: $success-bg;
  color: $success-fg;
}

.text-input--small {
  width: 160px;
}

.text-input--big {
  padding: .4em 1.6em;
}

.text-input--fluid {
  width: 100%;
}
</style>
