import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import MyButton from './Button.vue';

storiesOf('MyButton', module)
  .add('story as a component', () => ({
    components: { MyButton },
    template: `
      <my-button @clicked="onClickButton">
        My Button
      </my-button>
    `,
    methods: {
      onClickButton(e) {
        action('click eeee')(e.target)
        console.log('clicked my button', e)
      }
    }
  }));
