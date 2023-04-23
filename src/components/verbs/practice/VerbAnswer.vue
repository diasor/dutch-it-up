<template>
    <v-container class="py-0">
        <v-row>
            <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                <v-sheet
                    class="d-flex"
                    color="teal-lighten-3"
                    :height="SHEET_HEIGHT"
                    rounded="xl"
                >
                    <verb-answer-singular-form :enablePractice="enablePractice" />
                </v-sheet>
            </v-col>

            <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                <v-sheet
                    class="d-flex"
                    color="red-lighten-3"
                    :height="SHEET_HEIGHT"
                    rounded="xl"
                >
                    <verb-answer-plural-form :enablePractice="enablePractice" />
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import VerbAnswerSingularForm from "./VerbAnswerSingularForm.vue";
import VerbAnswerPluralForm from "./VerbAnswerPluralForm.vue";

const SHEET_HEIGHT = "250";
const store = useStore();
const enablePractice = computed(() => store.getters.getEnablePractice);
</script>
