<template>
  <v-container class="my-0 py-0">
    <v-form
      id="select-verb-form"
      ref="form"
      lazy-validation
      class="my-0 py-0"
    >
      <v-row class="my-0 py-0">
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            v-if="verbList"
            v-model="verb"
            :items="verbList"
            label="Selecteer een werkwoord"
            clearable
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            v-model="tense"
            :items="tenseList"
            label="Selecteer een tijden"
            clearable
          />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, computed, watch, defineEmits } from "vue";
import { useStore } from "vuex";
import { useVerb } from "@/composables/verbs";
import { TENSES } from "@/constants/index";
import { map } from "lodash";

const emit = defineEmits(["forceUpdate"]);
const store = useStore();

// verb management
const verbList = computed(() => store.getters.getVerbList);
const verb = ref("");
watch(verb, async (newValue, oldValue) => {
    if (oldValue !== newValue) {
        store.dispatch("setCurrentVerb", newValue);
        if (oldValue !== "") {
            tense.value = "";
            await store.dispatch("resetCurrentVerb", newValue);

            // if the verb changes, force update of the components to refresh
            emit("forceUpdate");
        }
    }
});

// verb tense management
const tenseList = map(TENSES, (tense) => tense.value);
const tense = ref("");
watch(tense, async (newValue, oldValue) => {
    if (oldValue !== newValue) {
        await store.dispatch("setCurrentTense", newValue);
        const currentTense = store.getters.getCurrentTense;
        const getCurrentVerbData = store.getters.getCurrentVerbData;

        const { verbConjugation } = useVerb();
        const results = verbConjugation(currentTense, getCurrentVerbData);
        await store.dispatch("setCurrentAnswers", results);

        // if the tense changes, force update of the components to refresh
        emit("forceUpdate");
    }
});
</script>
