<template>
  <div>
    <SignUp />
  </div>
</template>

<script>
import SignUp from "@/components/SignUp.vue";
import { mapGetters } from "vuex";
export default {
  name: "SignUpViews.vue",
  components: {
    SignUp,
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
    if (currentFont) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>
