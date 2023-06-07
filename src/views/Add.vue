<template>
  <Header />
  <div class="add">
    <div class="logo-block"></div>
    <h1>Add Restaurant</h1>
    <v-form @submit.prevent="addRestaurant">
      <v-container style="max-width: 400px">
        <v-row>
          <v-text-field
            v-model="name"
            label="Enter Name"
            required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="address"
            label="Enter Address"
            required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="phone"
            label="Enter Contact"
            required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-btn type="submit" block class="mt-2">Add new Restaurant</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import Header from "@/components/Header";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "AddView",
  components: {
    Header,
  },
  data() {
    return {
      name: "",
      address: "",
      phone: "",
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    auth() {
      return this.isAuthenticated;
    },
  },
  methods: {
    async addRestaurant() {
      const restaurantData = {
        name: this.name,
        address: this.address,
        phone: this.phone,
      };
      try {
        const response = await axios.post("http://localhost:3000/restaurants", {
          name: this.name,
          address: this.address,
          phone: this.phone,
        });
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        //   // eslint-disable-next-line no-unreachable
        //   this.$store.dispatch("logout");
        // }
        console.log(response);
        if (response.status == 201) {
          console.log("Restaurant added:", restaurantData);
          this.$toast.success(`Restaurant added successfully`, {
            timeout: 4000,
          });
        }
        // Reset form fields
        this.name = "";
        this.address = "";
        this.contact = "";
      } catch (error) {
        console.error("Error creating account:", error);
      }
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

<style lang="scss">
form {
  padding-top: 20px;
}
.add {
  .logo {
    width: 200px;
  }
}
</style>
