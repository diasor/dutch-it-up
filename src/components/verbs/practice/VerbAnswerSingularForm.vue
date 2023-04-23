<template>
    <v-container fluid>
        <v-form
            ref="form"
            lazy-validation
            width="100%"
            id="verb-answers-form"
        >
            <!-- Ik information -->
            <row-answer-full
                :enablePractice="props.enablePractice"
                :personText="IK_LABEL"
                person="ik"
            />

            <!-- Je / Jij / U information -->
            <row-answer-full
                :enablePractice="props.enablePractice"
                :personText="secondPersonLabel"
                person="je"
            />

            <!-- Zij / Hij / Het information -->
            <row-answer-full
                :enablePractice="props.enablePractice"
                :personText="thirdPersonLabel"
                person="het"
            />
    </v-form>
</v-container>

</template>

<script setup>
import { defineProps, computed } from "vue";
import { useDisplay } from "vuetify";
import RowAnswerFull from "./../base/RowAnswerFull.vue";
import { IK_LABEL, JE_LABEL, JE_LABEL_FULL, HET_LABEL, HET_LABEL_FULL } from "@/constants/index";

const props = defineProps({
    enablePractice: Boolean
});
const { mobile } = useDisplay();
const secondPersonLabel = computed(() => mobile.value ? JE_LABEL : JE_LABEL_FULL);
const thirdPersonLabel = computed(() => mobile.value ? HET_LABEL : HET_LABEL_FULL);
</script>

<style scoped lang="scss">
.v-label {
    font-size: 1rem !important;
}
</style>
