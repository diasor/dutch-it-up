<template>
    <v-row style="height: 4rem">
        <v-col cols="12" md="3">
            <v-label class="pl-1">{{ props.personText }}</v-label>
        </v-col>
        <v-col cols="12" md="6">
            <v-label class="pl-1">{{ props.verbText }}</v-label>
        </v-col>
        <v-col cols="12" md="3">
            <!-- <v-icon size="large" class="pr-2" @click.prevent="showQuestion">mdi-eye-off-outline</v-icon> -->
            <v-tooltip text="Got it! Now send me back to the question">
                <template v-slot:activator="{ props }">
                    <v-icon
                        size="large"
                        class="pr-2"
                        v-bind="props"
                        color="grey-darken-2"
                        @click.prevent="showQuestion"
                    >
                        mdi-eye-off-outline
                    </v-icon>
                </template>
            </v-tooltip>
        </v-col>
    </v-row>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
    personText: String,
    verbText: String
});
const emit = defineEmits(["showQuestion"]);
const showQuestion = () => {
    emit("showQuestion");
};
</script>

<style scoped lang="scss">
.v-label {
    font-size: 1rem !important;
}
</style>
