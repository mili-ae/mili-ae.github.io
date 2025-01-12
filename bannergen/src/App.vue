<script setup>
  import CropperArea from './components/CropperArea.vue';
  import ImageUploader from './components/ImageUploader.vue';
  import ImagePreview from './components/ImagePreview.vue';
  import CropperControls from './components/CropperControls.vue';
  import TextInputs from './components/TextInputs.vue';
</script>

<template>
  <div class="flex flex-col h-screen justify-between">
    <header class="flex select-none justify-between">
      <div class="container w-max p-2" id="left-header-side">
        <span class="text-4xl">Trust Banner Generator</span>
      </div>
      <div class="container w-max p-2 self-end" id="right-header-side">
        <a href="https://github.com/mili-ae/mili-ae.github.io" class="flex items-center">
          <p class="pr-2">Source Code</p>
          <v-icon name="bi-github" scale="2.5"></v-icon>
        </a>
      </div>
    </header>

    <main class="grid place-items-center">
      <div class="container bg-blackMute rounded-md grid grid-cols-2 grid-rows-2 pl-2 pr-2 place-items-center" v-if="imgSrc">
        <cropper-area :src="imgSrc" :aspect-ratio="aspectRatio" @image-cropped="setCroppedImage"></cropper-area>
        <div class="grid grid-rows-2 h-max gap-2">
          <image-preview :form-data="formData" :src="croppedImage" @image-generated="setDownloadLink" :aspect-ratio="aspectRatio"></image-preview>
          <cropper-controls :image-url="finalImageURL" @toggle-status-changed="setAspectRatio"></cropper-controls>
        </div>
        <text-inputs @form-data-change="setFormData" :imageUrl="finalImageURL"></text-inputs>
      </div>
      <div class="container p-3 grid place-items-center w-max" v-if="!imgSrc">
        <image-uploader :onImageUpload="setImage"></image-uploader>
      </div>
    </main>

    <footer class="text-center mb-12 select-none">
      <p>Assets made by <a 
        href="https://www.reddit.com/r/ffxiv/comments/1c6umal/made_my_own_trust_system_template/">Velnica</a> 
        and Square Enix © 2021-2024 SQUARE ENIX CO., LTD. All Rights Reserved.</p>
    </footer>
  </div>
  
</template>

<script scope>
  export default {
    
    data() {
        return {
            imgSrc: null,
            croppedImage: "null",
            finalImageURL: "src/assets/images/Banner.png",
            aspectRatio: 16 / 9,
            formData: {
                job: "Paladin",
                name: "Name Surname",
                title: "Warrior of Light",
                level: 90
            }
        };
    },

    methods: {
      setImage(imageData) {
        this.imgSrc = encodeURI(imageData)
      },
      setAspectRatio() {
        this.aspectRatio = this.aspectRatio === 16 / 9 ? 1 : 16 / 9
      },
      setCroppedImage(croppedImageURL) {
        this.croppedImage = croppedImageURL
      },
      setFormData(newFormData) {
        this.formData = newFormData
      },
      setDownloadLink(downloadLink) {
        this.finalImageURL = downloadLink;
      }
    }
    
  }
</script>
