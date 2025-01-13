<template>
    <div class="container grid border-8 border-blackMute cursor-pointer rounded-md p-64" 
        @dragover.prevent 
        @drop.prevent="handleDrop"
        @click="$refs.fileInput.click()">

        <v-icon name="md-uploadfile" scale="4" class="place-self-center" animation="float" speed="slow"></v-icon>
        <span class="text-2xl select-none h-min">Upload image to get started</span>
        <p class="text-sm text-center select-none h-min">Drop your image here or click on the area</p>
        <input type="file" ref="fileInput" @change.prevent="handleFileUpload" accept="image/*" style="display: none;">
        
    </div>
</template>

<script>

    export default {
        methods: {
            handleDrop(event) {
                const files = event.dataTransfer.files;
                if (files.length) {
                    this.loadImage(files[0]);
                };
            },
            handleFileUpload(event) {
                const file = event.target.files[0];
                if (file) {
                    this.loadImage(file);
                };
            },
            loadImage(file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.$emit('image-upload', e.target.result); //emit the image to parent
                };
                reader.readAsDataURL(file);
                
            }
        }
    }

</script>