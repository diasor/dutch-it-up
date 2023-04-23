<template>
    <v-container class="py-1">
        <v-card width="100%">
            <verb-form id="practice-verb" @forceUpdate="reRenderAnswers" />

            <v-tabs
                v-model="tab"
                bg-color="transparent"
                grow
                :direction="tabsDirection"
            >
                <v-tab value="practice">Oefening met werkwoorden</v-tab>
                <v-tab value="learn">Werkwoorden leren</v-tab>
                <v-tab value="examples">Voorbeelden</v-tab>
            </v-tabs>

            <v-card-text class="px-0">
                <v-window v-model="tab">
                    <!-- Practice form -->
                    <v-window-item value="practice">
                        <verb-answers :key="answerComponentKey" />
                    </v-window-item>

                    <!-- Learning tiles (with the answers) -->
                    <v-window-item value="learn">
                        <verb-card id="learn-verb" />
                    </v-window-item>

                    <!-- Verb examples (full sentences) -->
                    <v-window-item value="examples">
                        <verb-card-examples id="examples-verb" />
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { useDisplay } from "vuetify";
import VerbForm from "@/components/verbs/VerbForm.vue";
import VerbAnswers from "@/components/verbs/practice/VerbAnswer.vue";
import VerbCard from "@/components/verbs/show/VerbCard.vue";
import VerbCardExamples from "@/components/verbs/VerbCardExamples.vue";

const store = useStore();
const { name } = useDisplay();

// answers
const answerComponentKey = ref(0);
const reRenderAnswers = () => {
    answerComponentKey.value += 1;
};

// tabs
const tab = ref("");
const tabsDirection = ref("vertical");
const isMobile = computed(() => {
    switch (name.value) {
    case "xs": return true;
    case "sm": return true;
    case "md": return false;
    case "lg": return false;
    case "xl": return false;
    case "xxl": return false;
    default: return false;
    };
});
const getTabsDirection = () => {
    return isMobile.value === true ? "vertical" : "horizontal";
};
onMounted(() => {
    store.dispatch("setVerbList");
    tabsDirection.value = getTabsDirection();
});

watch(isMobile, () => {
    tabsDirection.value = getTabsDirection();
});
</script>

<style scoped lang="scss">
.v-btn  {
    font-family: "Lobster Two" !important;
    font-size: 1.2rem;
    line-height: 1.2rem !important;
    text-transform: none;
}
</style>
