<template>
    <v-container fluid>
        <v-form
            ref="form"
            lazy-validation
            width="100%"
        >
            <!-- We information -->
            <row-answer-full
                :enablePractice="props.enablePractice"
                :personText="WE_LABEL"
                person="we"
            />

            <!-- Je information -->
            <row-answer-full
                :enablePractice="props.enablePractice"
                :personText="JULLIE_LABEL"
                person="jullie"
            />

            <!-- Zij information -->
            <row-answer-full
                :enablePractice="props.enablePractice"
                :personText="ZIJ_LABEL"
                person="ze"
            />
    </v-form>
</v-container>

</template>

<script setup>
import { defineProps } from "vue";
import RowAnswerFull from "../base/RowAnswerFull.vue";

const props = defineProps({
    enablePractice: Boolean
});

const WE_LABEL = "We / Wij";
const JULLIE_LABEL = "Jullie";
const ZIJ_LABEL = "Zij";
</script>

<style scoped lang="scss">
.v-label {
    font-size: 1rem !important;
}
</style>
