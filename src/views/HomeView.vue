<template>
  <Header />
  <div class="home">
    <div class="logo-block"></div>
    <HomePage />
  </div>
</template>

<script>
import Header from "@/components/Header";
import HomePage from "@/components/HomePage.vue";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    HomePage,
    Header,
  },
  data() {
    return {
      //auth: false,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    auth() {
      return this.isAuthenticated;
    },
  },
  mounted() {
    const currentFont = localStorage.getItem("user-info");
    if (!currentFont) {
      this.$store.dispatch("authenticate");
      this.$router.push({ name: "SignUp" });
    } else {
      const user = JSON.parse(localStorage.getItem("user-info"));
      this.$store.commit("setUser", user);
    }
  },
};
</script>
