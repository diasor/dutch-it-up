<template>
    <v-app>
        <the-nav-bar />
        <the-drawer />
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup>
import TheNavBar from "@/components/layout/TheNavBar";
import TheDrawer from "@/components/layout/TheDrawer.vue";

</script>

<style lang="scss">
@font-face {
    font-family: "Mrs_Sheppards";
    src: local("Mrs_Sheppards"),
        url(./fonts/Mrs_Sheppards/MrsSheppards-Regular.ttf) format("truetype");
}

@font-face {
    font-family: "Lobster";
    src: local("Lobster"),
        url(./fonts/Lobster/Lobster-Regular.ttf) format("truetype");
}

@font-face {
    font-family: "Lobster Two";
    src: local("Lobster Two"),
        url(./fonts/LobsterTwo/LobsterTwo-BoldItalic.ttf) format("truetype");
}

@font-face {
    font-family: "Satisfy";
    src: local("Satisfy"),
        url(./fonts/Satisfy/Satisfy-Regular.ttf) format("truetype");
}

@font-face {
    font-family: "Permanent_Marker";
    src: local("Permanent_Marker"),
        url(./fonts/Permanent_Marker/PermanentMarker-Regular.ttf)
            format("truetype");
}
</style>
