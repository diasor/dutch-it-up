<template>
    <v-container>
        <v-form
            ref="form"
            lazy-validation
        >
            <v-row>
                <v-col>
                    <verb-chip v-if="!loading" :verbs="translations" />
                </v-col>
            </v-row>
        </v-form>
        <v-card width="100%" v-if="!loading">
            <v-alert
                v-for="(example, index) in examples" :key="index"
                :border="borderAlert(index)"
                :border-color="borderAlertColor(index)"
                elevation="2"
                class="ma-4 example-container"
            >
                {{ example }}
            </v-alert>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import VerbChip from "@/components/verbs/base/VerbChip.vue";
import { useStore } from "vuex";

const store = useStore();
const loading = ref(true);
const translations = ref([]);
const examples = ref([]);

// verb
const verb = computed(() => store.getters.getCurrentVerb);

// translations
const getCurrentVerbTranslations = computed(() => store.getters.getCurrentVerbTranslations);

// examples
const getCurrentVerbExamples = computed(() => store.getters.getCurrentVerbExamples);

// colors
const BORDERS = ["start", "top", "bottom", "end"];
const borderAlert = (itemIndex) => {
    const index = (itemIndex + 1) % 4;
    return BORDERS[index];
};
const BORDER_COLORS = ["deep-purple accent-4", "success", "warning", "error"];
const borderAlertColor = (itemIndex) => {
    const index = (itemIndex + 1) % 4;
    return BORDER_COLORS[index];
};

const getVerbResultsExamples = () => {
    examples.value = getCurrentVerbExamples.value;
    translations.value = getCurrentVerbTranslations.value;
    loading.value = false;
};

onMounted(async () => {
    await store.dispatch("setCurrentVerb", verb.value);
    getVerbResultsExamples();
});

watch(verb, async () => {
    await store.dispatch("setCurrentVerb", verb.value);
    getVerbResultsExamples();
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

.example-container {
    font-size: 1.1rem;
}
</style>
