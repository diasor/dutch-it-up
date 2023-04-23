<template>
    <v-sheet
        class="d-flex ma-3"
        :color="props.color"
        height="130"
        rounded="xl"
    >
        <v-container>
            <v-label class="mb-2" style="height: 1.5rem"><h4>{{ props.tense }}</h4></v-label>
            <verb-item
                :personText="SINGULAR_PERSON"
                :personVerb="singularPastVerb"
                class="mb-2"
            />
            <verb-item
                :personText="PLURAL_PERSON"
                :personVerb="pluralPastVerb"
                class="mb-2"
            />
        </v-container>
    </v-sheet>
</template>

<script setup>
import { computed, defineProps } from "vue";
import VerbItem from "@/components/verbs/base/VerbItem.vue";

const SINGULAR_PERSON = "Singular";
const PLURAL_PERSON = "Plural";

const props = defineProps({
    pastData: {
        type: Array,
        default: () => []
    },
    tense: {
        type: String,
        default: ""
    },
    color: {
        type: String,
        default: "amber-lighten-2"
    }
});

const singularPastVerb = computed(() => {
    return props.pastData.length
        ? props.pastData[0].verb
        : "";
});
const pluralPastVerb = computed(() => {
    return props.pastData.length
        ? props.pastData[4].verb
        : "";
});
</script>

<style scoped lang="scss">
.v-text-field.centered-input .v-label {
  left: 50% !important;
  transform: translateX(-50%);
  &.v-label--active {
    transform: translateY(-18px) scale(.75) translateX(-50%);
  }
}
</style>
