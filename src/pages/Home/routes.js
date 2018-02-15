import Home from '.'
import Topic from './pages/Topic'

export default {
  path: '/',
  name: 'Home',
  component: Home,
  children: [
    {
      path: '',
      name: 'LandingTopic',
      component: Topic
    },
    {
      path: ':slug--:topicID',
      name: 'Topic',
      component: Topic
    }
  ]
}
