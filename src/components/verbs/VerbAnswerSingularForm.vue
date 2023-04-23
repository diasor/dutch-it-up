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
                :personText="JE_LABEL_FULL"
                person="je"
            />

            <!-- Zij / Hij / Het information -->
            <row-answer-full
                :enablePractice="props.enablePractice"
                :personText="HET_LABEL"
                person="het"
            />
    </v-form>
</v-container>

</template>

<script setup>
import { defineProps } from "vue";
import RowAnswerFull from "../base/RowAnswerFull.vue";
import { IK_LABEL, JE_LABEL_FULL, HET_LABEL } from "@/constants/index";

const props = defineProps({
    enablePractice: Boolean
});
</script>

<style scoped lang="scss">
.v-label {
    font-size: 1rem !important;
}
</style>
