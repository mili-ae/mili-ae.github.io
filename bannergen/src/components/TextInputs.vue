<template>
    <div class="grid gap-4 p-4 w-full grid-cols-2 col-span-2 bg-blackSoft rounded-md">
        
        <Vueform>
            <StaticElement name="divider" tag="hr"/>
            <SelectElement
            name="jobSelect"
            ref="job"
            :items=jobs
            label="Job"
            :default="0"
            @change="onFormDataChanged"
            />
            <StaticElement name="divider" tag="hr"/>
            <TextElement
            name="nameBox"
            ref="name"
            label="Full Name"
            placeholder="e.g. Borte Ujin"
            @change="onFormDataChanged"
            />
        </Vueform>
        <Vueform>
            <StaticElement name="divider" tag="hr"/>
            <SelectElement
            name="titleSelect"
            ref="title"
            :items=titles
            :search="true"
            label="Title"
            info="Supports searching"
            :default="751"
            @change="onFormDataChanged"
            />
            <StaticElement name="divider" tag="hr"/>
            <SliderElement
            name="levelSlider"
            ref="level"
            label="Level"
            info="Level of your character"
            :min="1"
            :max="100"
            tooltip-position="bottom"
            :default="90"
            @change="onFormDataChanged"
            />
        </Vueform>
    </div>
</template>

<script scope>

    import titlesData from "../data/titlesFixed.json";
    import jobsData from "../data/jobs.json";
    

    export default {
        data() {
            return {
                titles: titlesData.items,
                jobs: jobsData.items,
                formData: {
                    job: "Paladin",
                    name: "Name Surname",
                    title: "Warrior of Light",
                    level: 90
                }
            }
        },
        methods: {
            onFormDataChanged() {
                const jobIndex = this.$refs.job.data.jobSelect;
                const name = this.$refs.name.data.nameBox;
                const titleIndex = this.$refs.title.data.titleSelect;
                const level = this.$refs.level.data.levelSlider;

                this.jobs.forEach(element => {
                    if (element.value == jobIndex) {
                        this.formData.job = element.label;
                    }
                });
                this.titles.forEach(element => {
                    if (element.value == titleIndex) {
                        this.formData.title = element.label;
                    }
                })
                this.formData.name = name == null ? "Name Surname" : name;
                this.formData.level = level;

                this.$emit("form-data-change", this.formData);
            }
        }
    }

</script>