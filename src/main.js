import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Player from './components/player/Player.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
// import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import vidstack from  'vidstack';

const vuetify = createVuetify({
    components,
  })
const app=createApp(App)
app.use(router)
// app.use(vidstack)
app.use(store)
app.use(Player)
app.use(vuetify)
// app.use(Vuetify)
app.component('Player', Player)
app.mount('#app')
