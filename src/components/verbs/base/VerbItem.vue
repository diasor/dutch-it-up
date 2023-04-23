<template>
    <div class="verb-container">
        <div class="ml-2 verb-item__person">{{ props.personText }}</div>
        <div class="mr-2 verb-item__verb">{{ props.personVerb }}</div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
    personText: String,
    personVerb: String
});
</script>

<style scoped lang="scss">
.verb-container {
    display: flex;
    min-width: 100%;
    font-size: 1rem;
    height: 2.3rem;
}
.verb-item {
    display: flex;

    word-break: break-all !important;

    &__person {
        width: 35%;
    }

    &__verb {
        width: 65%;
    }
}
</style>
