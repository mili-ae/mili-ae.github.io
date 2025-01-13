<script setup>

    defineProps({
        src: {
            type: String,
            required: true
        },
        aspectRatio: {
            type: Number,
            required: true
        }
    })

</script>

<template>
    <div id="workspace-container" class="border-white border-2 relative w-full h-0 ml-5 mt-5" style="padding-top: 56.25%;">
        <vue-cropper
        :src = src
        ref="cropper" 
        :view-mode="1"
        :responsive="true"
        preview="#preview-container"
        dragMode="move"
        alt="There was an error while loading your image"
        class="absolute top-0 left-0 w-full h-full"
        @cropend="onCropEnd"
        >
        </vue-cropper>
    </div>

</template>

<script scope>

    export default {
        mounted() {
            // Set the initial aspect ratio when the component is mounted
            this.updateAspectRatio(this.aspectRatio);
        },
        watch: {
            aspectRatio(newVal) {
            this.updateAspectRatio(newVal); // Update the aspect ratio when it changes
            },
        },
        methods: {
            onCropEnd() {
                const cropper = this.$refs.cropper;
                if (cropper) {
                    //get the cropped canvas
                    cropper.getCroppedCanvas().toBlob((blob) => {
                        const croppedImageURL = URL.createObjectURL(blob);
                        this.$emit('image-cropped', croppedImageURL); //emit this to the parent component
                    })
                }
            },
            updateAspectRatio(aspectRatio) {
                const cropper = this.$refs.cropper.cropper; // Access the cropper instance
                if (cropper) {
                    cropper.setAspectRatio(aspectRatio); // Update the aspect ratio
                }
            },
        },
        
  
    }

</script>