<script setup>

    defineProps({
        formData: {
            type: Object,
            required: true
        },
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

    <div class=" border-white border-2 mr-3 ml-5 mt-3 relative">
        <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
            <v-icon name="ri-loader-2-line" scale="2.5" animation="spin"></v-icon>
        </div>
        <img src="" ref="imagePreview" alt="There was an error loading the preview">
        <canvas class="hidden" ref="imageGenerator" width="1048" height="276"></canvas> <!--used only for drawing the image above-->
    </div>

</template>

<script scope>

    export default {
        watch: {
            // listen to any changes made in props 
            // and immediately draw the entire image
            formData: {
                handler(){
                    try {
                        this.drawEntireImage();
                    } catch (error) {
                        console.error("There was an error in watcher callback:", error)
                    }
                
                },
                deep: true
            },
            src() {
                try {
                    this.drawEntireImage();
                } catch (error) {
                    console.error("There was an error in watcher callback:", error)
                }
            },
            aspectRatio(newRatio) {
                this.cropperAspectRatio = newRatio;
                this.drawEntireImage();
            }
        },
        mounted() {
            // wait until the component loads in 
            // then prepare canvas
            this.prepareCanvas();
            this.$refs.imagePreview.src = "/images/Banner.png" // set a default image otherwise it breaks
            this.isLoading = false;
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
                height: 276,
                isLoading: true,
                cropperAspectRatio: 16/9
            }
        },
        methods: {
            prepareCanvas() {
                this.canvas = this.$refs.imageGenerator;
                this.ctx = this.canvas.getContext("2d");
            },
            async drawEntireImage() {
                // wait for all drawing methods to be done
                this.isLoading = true;
                await Promise.all([
                    this.drawBackgroundAndWol(),
                    this.drawJob(),
                ])
                this.drawWrite(),

                this.isLoading = false;
                this.displayImage();
            },
            drawBackgroundAndWol() {
                return new Promise((resolve) => {
                    const background = new Image();
                    const wolImage = new Image();

                    // pick background according to the job
                    if(this.roles.has(this.formData.job)) {
                        background.src = "/images/roles/" + this.roles.get(this.formData.job);
                    }
                    else {
                        background.src = "/images/roles/dps.png";
                    };

                    background.onload = () => {
                        // paste background on canvas
                        this.ctx.drawImage(background, 0, 0, this.width, this.height);
                        //create mask for wol image
                        this.ctx.globalCompositeOperation = "source-atop";
                        // paste wol image
                        wolImage.src = this.src;
                        wolImage.onload = () => {
                            if (this.cropperAspectRatio == 16/9) {
                                this.ctx.drawImage(wolImage, 550, 0, 500, 290);
                            }
                            else {
                                this.ctx.drawImage(wolImage, 650, -100, 400, 400);
                            }
                            
                            resolve();
                        }
                    }
                })
            },
            drawWrite() {
                return new Promise((resolve) => {
                    // writing title
                    this.ctx.font = '65px trajan-pro-regular';
                    this.ctx.fillStyle = "#fff799"
                    this.ctx.fillText(this.formData.title, 95, 65, 500);

                    // character name
                    this.ctx.font = "62px eurostileextended-roman-dtc-regular";
                    this.ctx.fillStyle = "#f1e9cf";
                    this.ctx.fillText(this.formData.name.toUpperCase(), 25, 255, 700);

                    // level
                    this.ctx.font = "190px eurostileBold";
                    this.ctx.fillStyle = "#808080";
                    this.ctx.save(); // save the state of the image to prevent past stuff being edited
                    this.ctx.scale(1.5, 0.7); // stretch the text
                    this.ctx.globalAlpha = 0.5; // opacity
                    this.ctx.letterSpacing = "-15px"
                    this.ctx.fillText(this.formData.level, 5, 260, 200)
                    this.ctx.restore();

                    resolve();
                })
            },
            drawJob() {
                return new Promise((resolve) => {
                    const jobIcon = new Image();
                    jobIcon.src = "/images/jobs/" + this.formData.job.toLowerCase() + ".png";
                    jobIcon.onload = () => {
                        this.ctx.drawImage(jobIcon, 0, 0);
                        resolve();
                    }
                })
            },
            displayImage() {
                const imageURL = this.canvas.toDataURL("image/png");
                this.$refs.imagePreview.src = imageURL;
                this.$emit("image-generated", imageURL)
            }
        }
    }

</script>