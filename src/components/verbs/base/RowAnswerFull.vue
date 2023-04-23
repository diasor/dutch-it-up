<template>
    <v-container fluid>
        <v-form
            ref="form"
            lazy-validation
            width="100%"
        >
            <row-answer
                v-if="showAnswer"
                :person-text="props.personText"
                :verbText="verbAnswer"
                @showQuestion="toggleAnswer"
            />
            <row-answer-form
                v-else
                :person-text="props.personText"
                :verbAnswer="verbAnswer"
                :enablePractice="props.enablePractice"
                @showAnswer="toggleAnswer"
            />
    </v-form>
</v-container>

</template>

<script setup>
import { ref, computed, defineProps } from "vue";
import RowAnswer from "../base/RowAnswer.vue";
import RowAnswerForm from "../base/RowAnswerForm.vue";
import { useStore } from "vuex";

const props = defineProps({
    enablePractice: Boolean,
    personText: String,
    person: String
});

const showAnswer = ref(false);
const toggleAnswer = () => {
    showAnswer.value = !showAnswer.value;
};

const store = useStore();
const verbAnswer = computed(() => store.getters.getCurrentAnswersPerTensePerPerson(props.person));
</script>

<style scoped lang="scss">
.v-label {
    font-size: 1rem !important;
}
</style>
