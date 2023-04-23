<template>
    <v-sheet
        class="d-flex ma-3"
        :color="color"
        height="280"
        rounded="xl"
    >
        <v-container>
            <v-label class="mb-2" style="height: 1.5rem"><h4>{{ props.tense }}</h4></v-label>

            <verb-item :personText="IK_LABEL" :personVerb="ikVerb" />
            <verb-item :personText="JE_LABEL" :personVerb="jeVerb" />
            <verb-item :personText="HET_LABEL" :personVerb="hetVerb" />
            <verb-item :personText="WE_LABEL" :personVerb="weVerb" />
            <verb-item :personText="JULLIE_LABEL" :personVerb="jullieVerb" />
            <verb-item :personText="ZIJ_LABEL" :personVerb="zijVerb" />
        </v-container>
    </v-sheet>
</template>

<script setup>
import { computed, defineProps } from "vue";
import VerbItem from "@/components/verbs/base/VerbItem.vue";
import { IK_LABEL, JE_LABEL, HET_LABEL, WE_LABEL, JULLIE_LABEL, ZIJ_LABEL } from "@/constants/index";

const props = defineProps({
    presentData: {
        type: Array,
        default: () => []
    },
    tense: {
        type: String,
        default: "Presens"
    },
    color: {
        type: String,
        default: "teal-lighten-3"
    }
});

const ikVerb = computed(() => {
    return props.presentData.length
        ? props.presentData[0].verb
        : "";
});
const jeVerb = computed(() => {
    return props.presentData.length
        ? props.presentData[1].verb
        : "";
});
const hetVerb = computed(() => {
    return props.presentData.length
        ? props.presentData[2].verb
        : "";
});
const weVerb = computed(() => {
    return props.presentData.length
        ? props.presentData[4].verb
        : "";
});
const jullieVerb = computed(() => {
    return props.presentData.length
        ? props.presentData[5].verb
        : "";
});
const zijVerb = computed(() => {
    return props.presentData.length
        ? props.presentData[6].verb
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
