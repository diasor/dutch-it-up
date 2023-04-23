<template>
    <!-- <v-card width="100%" v-if="props.verbs.length"> -->
        <v-chip
            v-for="(item, index) in props.verbs" :key="index"
            class="ma-2"
            :color="colorChip(index)"
            text-color="white"
            elevation="2"
        >
            {{ item }}
        </v-chip>
    <!-- </v-card> -->
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
    verbs: {
        type: Array,
        default: () => []
    },
    color: String
});

const CHIP_COLORS = ["deep-purple accent-4", "success", "warning", "error", "indigo"];
const randomColor = (itemIndex) => {
    const index = (itemIndex + 1) % 5;
    return CHIP_COLORS[index];
};

const colorChip = (index) => props.color ? props.color : randomColor(index);
</script>
