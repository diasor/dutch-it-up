<template>
    <v-navigation-drawer rail>
        <v-list>
        <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="User Name"
            subtitle="name.lastname@gmailcom"
        />
        </v-list>

        <v-divider />

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles" />
            <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared" />
            <v-list-item prepend-icon="mdi-star" title="Starred" value="starred" />
        </v-list>
    </v-navigation-drawer>
</template>
