<template>
    <v-app-bar
        color="teal-darken-4"
        :image="randomPhoto"
        rounded
        :elevation="2"
        width="100%"
        height="210"
    >

        <template v-slot:image>
            <v-img gradient="to top right, rgba(232,203,192,.7), rgba(99,111,164,.7)" key="menu-image" />
        </template>

        <v-app-bar-title>Dutch it up!</v-app-bar-title>

        <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
    </v-app-bar>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";

const randomPhoto = ref("");
const MINIMUM = 1;
const MAXIMUM = 6;
const random = () => (Math.floor(Math.random() * (MAXIMUM - MINIMUM + 1)) + MINIMUM);

onMounted(() => {
    const randomNumber = random();
    randomPhoto.value = `images/amsterdam-${randomNumber}.jpg`;
});

// change the image randomically whenever the verb changes.
const store = useStore();
const verb = computed(() => store.getters.getCurrentVerb);
watch(verb, async () => {
    const randomNumber = random();
    randomPhoto.value = `images/amsterdam-${randomNumber}.jpg`;
});
</script>

<style scoped lang="scss">
.v-toolbar-title {
    font-family: "Satisfy" !important;
    font-size: 4rem;
    font-weight: 700;
    line-height: 4rem;
    padding-left: 2rem;
}
</style>
