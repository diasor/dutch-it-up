<template>
    <v-container>
        <v-card width="100%">
            <v-row>
                <v-col cols="12" xl="4" lg="4" md="6" sm="6" xs="12">
                    <verb-card-present
                        v-if="presentResults"
                        :color="colorPalette[0]"
                        :tense="PRESENT"
                        :presentData="presentResults"
                    />
                </v-col>

                <v-col cols="12" xl="4" lg="4" md="6" sm="6" xs="12">
                    <verb-card-present
                        v-if="pastResults"
                        :color="colorPalette[1]"
                        :tense="PERFECTUM"
                        :presentData="pastResults"
                    />
                </v-col>
                <v-col cols="12" xl="4" lg="4" md="6" sm="6" xs="12">
                    <verb-card-past
                        v-if="imperfectumResults"
                        :tense="IMPERFECTUM"
                        :color="colorPalette[2]"
                        :pastData="imperfectumResults"
                    />
                    <verb-card-past
                        v-if="plusquamperfectumResults"
                        :color="colorPalette[3]"
                        :tense="PLUSQUAMPERFECTUM"
                        :pastData="plusquamperfectumResults"
                    />
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import VerbCardPresent from "../show/VerbCardPresent.vue";
import VerbCardPast from "../show/VerbCardPast.vue";
import { useVerb } from "@/composables/verbs";
import { TENSES } from "@/constants/index";
import {
    MAXIMUM,
    MINIMUM,
    COLOR_PALETTE_1,
    COLOR_PALETTE_2,
    COLOR_PALETTE_3
} from "@/constants/colors";

const store = useStore();

const presentResults = ref([]);
const pastResults = ref([]);
const imperfectumResults = ref([]);
const plusquamperfectumResults = ref([]);

const { verbConjugation } = useVerb();

const verb = computed(() => store.getters.getCurrentVerb);
const getCurrentVerbData = computed(() => store.getters.getCurrentVerbData);

const PRESENT = TENSES[0].text;
const PERFECTUM = TENSES[1].text;
const IMPERFECTUM = TENSES[2].text;
const PLUSQUAMPERFECTUM = TENSES[3].text;

const getVerbResultsPerTense = () => {
    presentResults.value = verbConjugation(TENSES[0].value, getCurrentVerbData.value);
    pastResults.value = verbConjugation(TENSES[1].value, getCurrentVerbData.value);
    imperfectumResults.value = verbConjugation(TENSES[2].value, getCurrentVerbData.value);
    plusquamperfectumResults.value = verbConjugation(TENSES[3].value, getCurrentVerbData.value);
};

// color palette
const random = () => (Math.floor(Math.random() * (MAXIMUM - MINIMUM + 1)) + MINIMUM);
const colorPalette = computed(() => {
    const randomColorIndex = random();
    const palettes = [
        COLOR_PALETTE_1,
        COLOR_PALETTE_2,
        COLOR_PALETTE_3
    ];
    return palettes[randomColorIndex];
});

onMounted(async () => {
    await store.dispatch("setCurrentVerb", verb.value);
    getVerbResultsPerTense();
});

watch(verb, async () => {
    await store.dispatch("setCurrentVerb", verb.value);
    getVerbResultsPerTense();
});
</script>

<style scoped lang="scss">
.form-title{
    font-family: "Lobster Two" !important;
    font-size: 1.2rem;
    line-height: 1.2rem !important;
}

.v-text-field.centered-input .v-label {
  left: 50% !important;
  transform: translateX(-50%);
  &.v-label--active {
    transform: translateY(-18px) scale(.75) translateX(-50%);
  }
}
</style>
