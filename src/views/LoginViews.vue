<template>
  <div class="hello">
    <h1>Login</h1>
    <v-form @submit.prevent="loginUser">
      <v-container style="max-width: 400px">
        <v-row>
          <v-text-field
            v-model="email"
            :counter="10"
            label="Enter email"
            required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="password"
            :counter="10"
            label="Password"
            required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-btn type="submit" block class="mt-2">Login</v-btn>
        </v-row>
        <v-row>
          <v-btn to="/sign-up" type="submit" block class="mt-2">Register</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginUser",
  props: {
    msg: String,
  },
  data() {
    return {
      email: "",
      password: "",
      userCredentials: "",
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.get(
          `http://localhost:3000/users?email=${this.email}&password=${this.password}`
        );
        if (!response.data.length) {
          this.$toast.error(`Password or username not found!`, {
            timeout: 4000,
          });
          // eslint-disable-next-line no-unreachable
          this.$store.dispatch("logout");
        }
        console.log(response);
        if (response.data.length) {
          localStorage.setItem("user-info", JSON.stringify(response.data[0]));
          this.$store.dispatch("authenticate", response.data[0]);
          this.$router.push({ name: "Home" });
        }
        // Reset form fields
        this.email = "";
        this.password = "";
      } catch (error) {
        console.error("Error creating account:", error);
      }
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

<style scoped lang="scss">
h1 {
  padding-top: 5%;
}
.register {
  margin: 0 auto;
  max-width: 300px;
  display: flex;
  flex-wrap: wrap;
  input {
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
  }
  button {
    width: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    height: 30px;
  }
}
</style>
