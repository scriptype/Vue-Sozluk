<template>
  <button
    :class="buttonClassObject"
    @click="onClick"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',

  props: {
    type: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'auto'
    },
    level: {
      type: String,
      default: 'primary'
    }
  },

  computed: {
    buttonClassObject() {
      return {
        button: true,
        'button--error': this.$props.type === 'error',
        'button--danger': this.$props.type === 'danger',
        'button--success': this.$props.type === 'success',
        'button--big': this.$props.size === 'big',
        'button--fluid': this.$props.size === 'fluid',
        'button--primary': this.$props.level === 'primary',
        'button--secondary': this.$props.level === 'secondary',
        'button--tertiary': this.$props.level === 'tertiary'
      }
    }
  },

  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/helpers/variables";
@import "../styles/helpers/responsive";

.button {
  padding: .4em 1em;
  border: none;
  border-radius: 3px;
  font: inherit;

  @media (min-width: $sm-max + 1) {
    padding: .2em .8em;
  }
}

.button--primary {
  background: $primary-bg;
  color: $primary-fg;
}

.button--secondary {
  background: $secondary-bg;
  color: $secondary-fg;
}

.button--tertiary {
  background: $tertiary-bg;
  color: $tertiary-fg;
}

.button--error {
  background: $error-bg;
  color: $error-fg;
}

.button--danger {
  background: $danger-bg;
  color: $danger-fg;
}

.button--success {
  background: $success-bg;
  color: $success-fg;
}

.button--big {
  padding: .4em 1.6em;
}

.button--fluid {
  width: 100%;
}
</style>
