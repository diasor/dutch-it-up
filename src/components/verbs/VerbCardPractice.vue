<template>
    <v-container class="py-1">
        <v-card width="100%">
            <v-tabs
                v-model="tab"
                bg-color="transparent"
                grow
            >
                <v-tab value="practice">Oefening</v-tab>
                <v-tab value="learn">Leren</v-tab>
            </v-tabs>

            <v-card-text class="px-0">
                <v-window v-model="tab">
                    <v-window-item value="practice">
                        <v-card-title class="form-title">Oefening met werkwoorden</v-card-title>
                        <v-divider />
                        <verb-form id="practice-verb" @forceUpdate="reRenderAnswers" />
                        <verb-answers :key="answerComponentKey" />
                    </v-window-item>

                    <v-window-item value="learn">
                        <v-card-title class="form-title">Werkwoorden leren</v-card-title>
                        <v-divider />
                        <verb-card-learn id="learn-verb" />
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import VerbForm from "./VerbForm.vue";
import VerbAnswers from "./VerbAnswer.vue";
import VerbCardLearn from "./show/VerbCard.vue";

const answerComponentKey = ref(0);
const reRenderAnswers = () => {
    answerComponentKey.value += 1;
};

const tab = ref("");

</script>
