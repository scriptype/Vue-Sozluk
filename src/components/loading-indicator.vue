<template>
  <span :class="classObject">
    <span></span><span></span><span></span>
  </span>
</template>

<script>
export default {
  name: 'LoadingIndicator',

  props: {
    size: {
      type: String,
      default: 'medium'
    }
  },

  computed: {
    classObject() {
      return {
        'loading-indicator': true,
        'loading-indicator--small': this.size === 'small',
        'loading-indicator--medium': this.size === 'medium',
        'loading-indicator--big': this.size === 'big'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/helpers/variables";

$elements: 3;

.loading-indicator {
  display: inline-block;
  margin-left: -.5em;

  span {
    display: inline-block;
    width: 1em;
    height: 1em;
    margin-left: .5em;
    border: .25em solid $primary-bg;
    border-radius: 50%;
    transform: translateY(75%);

    @for $i from 1 through $elements {
      &:nth-child(#{$i}) {
        animation: loading 1s $i * .2s infinite;
      }
    }
  }

  &--small {
    font-size: .75em;
  }

  &--medium {
    font-size: 1em;
  }

  &--big {
    font-size: 1.25em;
  }
}

@keyframes loading {
  50% {
    transform:
      translateY(75%)
      translateY(-100%);
  }
}
</style>
