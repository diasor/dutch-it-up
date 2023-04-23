<template>
    <v-row style="height: 3.5rem">
        <v-col cols="12" md="3">
            <v-label class="pl-1">{{ props.personText }}</v-label>
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field
                v-model="verb"
                label=""
                :counter="30"
                :rules="rules"
                variant="outlined"
                density="compact"
                :disabled="!props.enablePractice"
                @input="startTyping"
                @blur="answerReady"
            />
        </v-col>
        <v-col cols="12" md="3">
            <!-- show correct answer icon -->
            <v-tooltip text="Show me the correct answer">
                <template v-slot:activator="{ props }">
                    <v-icon
                        size="large"
                        class="pr-2"
                        v-bind="props"
                        @click.prevent="showAnswer"
                    >
                        mdi-eye-outline
                    </v-icon>
                </template>
            </v-tooltip>
            <!-- show control answer icon -->
            <v-tooltip text="Validate my answer">
                <template v-slot:activator="{ props }">
                    <v-icon
                        v-if="showValidateAnswerIcon"
                        size="large"
                        :color="validateAnswerIconColor"
                        class="pr-2"
                        :disabled="props.enablePractice"
                        v-bind="props"
                        @click.prevent="validateAnswer"
                    >
                        mdi-account-check
                    </v-icon>
                </template>
            </v-tooltip>
            <!-- show answer's result icon -->
            <v-tooltip :text="controlAnswerTooltip">
                <template v-slot:activator="{ props }">
                    <v-icon
                        v-if="showControlledAnswerIcon"
                        size="large"
                        :color="controlledAnswerIconColor"
                        class="pr-2"
                        :disabled="props.enablePractice"
                        v-bind="props"
                        @click.prevent="validateAnswer"
                    >
                        {{ correctAnswerIcon  }}
                    </v-icon>
                </template>
            </v-tooltip>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
    personText: String,
    verbAnswer: String,
    enablePractice: Boolean
});

const verb = ref("");
const rules = [
    v => (v && v.length <= 30) || "The verb must be less than 30"
];
const emit = defineEmits(["showAnswer"]);
const showAnswer = () => {
    emit("showAnswer");
};

// input events
const typing = ref(false);
const startTyping = () => {
    typing.value = true;
};
const answerReady = () => {
    typing.value = false;
    validateAnswer();
};

const noAnswerAvailable = computed(() => {
    return props.verbAnswer === "no answer available";
});
// control the check icon
const controlled = ref(false);
const showValidateAnswerIcon = computed(() => {
    return props.enablePractice && verb.value !== "";
});
const validateAnswerIconColor = computed(() => {
    return verb.value !== "" && typing.value
        ? "grey-darken-1"
        : "lime-darken-2";
});

// validate the answer
const isCorrect = ref(false);
const validateAnswer = () => {
    if (!noAnswerAvailable.value) {
        isCorrect.value = !typing.value && verb.value !== "" && verb.value.trim().toLowerCase() === props.verbAnswer;
    }
    controlled.value = true;
};
const showControlledAnswerIcon = computed(() => {
    return props.enablePractice && !typing.value && verb.value !== "" && controlled.value === true;
});
const controlledAnswerIconColor = computed(() => {
    if (showControlledAnswerIcon.value && !typing.value) {
        if (noAnswerAvailable.value) {
            return "deep-orange-darken-4";
        }
        return isCorrect.value ? "green-darken-2" : "red-darken-4";
    } else {
        return "grey-darken-2";
    }
});
const correctAnswerIcon = computed(() => {
    if (showControlledAnswerIcon.value && !typing.value) {
        if (noAnswerAvailable.value) {
            return "mdi-alert-octagon";
        }
        return isCorrect.value ? "mdi-thumb-up-outline" : "mdi-thumb-down-outline";
    } else {
        return "mdi-thumbs-up-down";
    }
});
const controlAnswerTooltip = computed(() => {
    if (showControlledAnswerIcon.value && !typing.value) {
        if (noAnswerAvailable.value) {
            return "Sorry! There is no answer available for that verb.";
        }
        return isCorrect.value ? "Nice! You've got this!" : "Ouch! Try again.";
    } else {
        return "";
    }
});
</script>

<style scoped lang="scss">
.v-label {
    font-size: 1rem !important;
}
</style>
