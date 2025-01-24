import { createApp } from 'vue'
import App from './App.vue'
import './assets/scss/main.scss'
import Vuelidate from '@vuelidate/core'

const app = createApp(App)

app.use(Vuelidate)

app.mount('#app')
