<template>
  <div class="container">
    <h1>Sign Up</h1>
    <form @submit.prevent="registerUser">
      <v-container style="max-width: 400px">
        <v-row>
          <v-text-field
            v-model="name"
            :counter="20"
            label="Name"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field v-model="email" label="Email"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="password"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="confirmPassword"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            label="Repeat Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-btn type="submit" block class="mt-2">Register</v-btn>
        </v-row>
        <v-row>
          <v-btn to="/login" type="submit" block class="mt-2">Login</v-btn>
        </v-row>
      </v-container>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUpComponent",
  props: {
    msg: String,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userCredentials: "",
      show1: false,
      show2: true,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    async registerUser() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      try {
        const response = await axios.post("http://localhost:3000/users", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        //   // eslint-disable-next-line no-unreachable
        //   this.$store.dispatch("logout");
        // }
        console.log(response);
        if (response.status == 201) {
          console.log("Account created with data:", userData);
          this.$toast.success(`Account created`, {
            timeout: 4000,
          });
          localStorage.setItem("user-info", JSON.stringify(userData));
          this.$store.dispatch("authenticate", this.userCredentials);
          this.$router.push({ name: "Home" });
        }
        // Reset form fields
        this.name = "";
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
      } catch (error) {
        console.error("Error creating account:", error);
      }
    },
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
