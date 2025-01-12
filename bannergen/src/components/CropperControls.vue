<script setup>

    defineProps({   
        imageUrl: {
            type: String,
            required: true
        }
    })
    
</script>

<template>
  <Vueform class="mt-5 flex items-center justify-center bg-blackSoft w-max p-5 rounded-md place-self-center select-none">
    <ToggleElement
      name="toggle"
      :labels="{
        on: '1:1',
        off: '16:9',
      }"
      text="Aspect Ratio Toggle"
      @change="emitToggleStatus"
    />
    <StaticElement
      name="divider"
      tag="hr"
    />
    <ButtonElement
      name="submit"
      button-label="Save Image"
      align="center"
      :full="true"
      @click="handleFileSave"
    />
  </Vueform>
</template>
  
  <script>
  export default {
    data() {
      return {
        isToggled: false,
        formData: {
          aspectRatio: 16/9,
        }
      };
    },
    methods: {
      emitToggleStatus() {
        this.$emit('toggle-status-changed');
      },
      handleFileSave() {
        const link = document.createElement('a');
        link.href = this.imageUrl;
        link.download = "Banner.png";
        document.body.appendChild(link); // Append to the body (required for Firefox)
        link.click();
        document.body.removeChild(link); // Remove the link after triggering the download
      }
    },
  };
  </script>
  
  <style scoped>
  .toggle-bg {
    transition: background-color 0.2s;
  }
  
  .toggle-dot {
    transition: transform 0.2s;
  }
  </style>
  