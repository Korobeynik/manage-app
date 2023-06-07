<template>
  <v-card class="header-menu">
    <v-layout>
      <v-app-bar color="#FF8000" prominent>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>My App</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn variant="text" icon="mdi-magnify"></v-btn>

        <v-btn variant="text" icon="mdi-filter"></v-btn>

        <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" location="bottom" temporary>
        <v-list>
          <v-list-item to="/" type="submit" block class="mt-2"
            >Home</v-list-item
          >
          <v-list-item to="/add" type="submit" block class="mt-2"
            >Add Restaurant</v-list-item
          >
          <v-list-item @click="logout()" type="submit" block class="mt-2"
            >Logout</v-list-item
          >
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 60px; border: none"></v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "HeaderMain",
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("user-info");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style lang="scss">
.v-card.v-theme--light.v-card--density-default.v-card--variant-elevated.header-menu {
  z-index: 1;
}
nav.v-navigation-drawer.v-navigation-drawer--bottom.v-navigation-drawer--temporary.v-navigation-drawer--active.v-theme--light {
  background: #ff8000;
}
.header {
  background: #ccc;
}
.logo {
  width: 200px;
}
.v-list-item-title {
  text-transform: uppercase;
  font-weight: bold !important;
}
</style>
