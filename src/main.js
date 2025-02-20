import './assets/main.css';
import VueCropper from '../node_modules/vue-cropperjs/VueCropper';
import '../node_modules/cropperjs/dist/cropper.css';
import Vueform from '@vueform/vueform'
import vueformConfig from './../vueform.config'

import { createApp } from 'vue'
import App from './App.vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";

import { BiGithub, MdUploadfile, RiLoader2Line } from "oh-vue-icons/icons";
addIcons(
    BiGithub,
    MdUploadfile,
    RiLoader2Line
)

const app = createApp(App);
app.use(Vueform, vueformConfig)
app.component("vue-cropper", VueCropper);
app.component("v-icon", OhVueIcon);
app.mount('#app')
