<script setup>
import { handler } from '@vueform/vueform/tailwind';


    defineProps({
        wolData: {
            type: Object,
            required: true
        },
        src: {
            type: String,
            required: true
        }
    })

</script>


<template>

    <div class=" border-white border-2 mr-3 ml-5 mt-3">
        <img src="" ref="imagePreview" alt="There was an error loading the preview">
        <canvas class="hidden" ref="imageGenerator" width="1048" height="276"></canvas> <!--used only for drawing the image above-->
    </div>

</template>

<script scope>

    export default {
        watch: {
            // listen to any changes made in props 
            // and immediately draw the entire image
            wolData() {
                try {
                    this.drawEntireImage();
                    this.displayImage()
                } catch (error) {
                    console.error("There was an error in watcher callback:", error)
                }
                
            },
            src() {
                try {
                    this.drawEntireImage();
                    this.displayImage()
                } catch (error) {
                    console.error("There was an error in watcher callback:", error)
                }
            }
        },
        mounted() {
            // wait until the component loads in 
            // then prepare canvas
            this.prepareCanvas();
            this.$refs.imagePreview.src = "src/assets/images/Banner.png" // set a default image otherwise it breaks
        },
        data() {
            // create map for backgrounds
            const roles = new Map([
                ["PLD", "tank.png"],
                ["WAR", "tank.png"],
                ["DRK", "tank.png"],
                ["GNB", "tank.png"],
                ["WHM", "healer.png"],
                ["AST", "healer.png"],
                ["SCH", "healer.png"],
                ["SGE", "healer.png"]
            ]);
            
            return {
                roles,
                canvas: null,
                ctx: null,
                width: 1048,
                height: 276
            }
        },
        methods: {
            prepareCanvas() {
                this.canvas = this.$refs.imageGenerator;
                this.ctx = this.canvas.getContext("2d");
            },
            drawEntireImage() {
                this.drawBackgroundAndWol();
                this.drawJob();
                this.drawWrite();
                this.displayImage();
            },
            drawBackgroundAndWol() {
                const background = new Image();
                const wolImage = new Image();

                // pick background according to the job
                if(this.roles.has(this.wolData.job)) {
                    background.src = "src/assets/images/roles/" + this.roles.get(this.wolData.job);
                }
                else {
                    background.src = "src/assets/images/roles/dps.png";
                };

                background.onload = () => {
                    // paste background on canvas
                    this.ctx.drawImage(background, 0, 0, this.width, this.height);
                    //create mask for wol image
                    this.ctx.globalCompositeOperation = "source-atop";
                    // paste wol image
                    wolImage.src = this.src;
                    wolImage.onload = () => {
                        this.ctx.drawImage(wolImage, 550, 0, 500, 290);
                        this.drawJob();
                        this.drawWrite();
                        this.displayImage();
                    }
                }
            },
            drawWrite() {
                // writing title
                this.ctx.font = '65px trajan-pro-regular';
                this.ctx.fillStyle = "#fff799"
                this.ctx.fillText(this.wolData.title, 95, 65, 500);

                // character name
                this.ctx.font = "62px eurostileextended-roman-dtc-regular";
                this.ctx.fillStyle = "#f1e9cf";
                this.ctx.fillText(this.wolData.name.toUpperCase(), 25, 255, 700);

                // level
                this.ctx.font = "190px eurostileBold";
                this.ctx.fillStyle = "#808080";
                this.ctx.save(); // save the state of the image to prevent past stuff being edited
                this.ctx.scale(1.5, 0.7); // stretch the text
                this.ctx.globalAlpha = 0.5; // opacity
                this.ctx.letterSpacing = "-15px"
                this.ctx.fillText(this.wolData.level, 5, 260, 200)
                this.ctx.restore();

                this.displayImage();
            },
            drawJob() {
                const jobIcon = new Image();
                jobIcon.src = "src/assets/images/jobs/" + this.wolData.job.toLowerCase() + ".png";
                jobIcon.onload = () => {
                    this.ctx.drawImage(jobIcon, 0, 0);
                    
                }
                this.displayImage();
            },
            displayImage() {
                const imageURL = this.canvas.toDataURL("image/png");
                this.$refs.imagePreview.src = imageURL;
                this.$emit("image-generated", imageURL)
            }
        }
    }

</script>