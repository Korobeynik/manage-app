<template>
  <Header />
  <div class="add">
    <div class="logo-block"></div>
    <h1>Update Restaurant</h1>
    <v-form @submit.prevent="updateRestaurant">
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
          <v-btn type="submit" block class="mt-2">Update Restaurant</v-btn>
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
  name: "UpdateView",
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
    async updateRestaurant() {
      try {
        const response = await axios.put(
          `http://localhost:3000/restaurants/${this.$route.params.id}`,
          {
            name: this.name,
            address: this.address,
            phone: this.phone,
          }
        );
        console.log(response);
        if (response.status == 200) {
          this.$toast.success(`Restaurant updated successfully`, {
            timeout: 4000,
          });
        }
      } catch (error) {
        console.error("Error creating account:", error);
      }
    },
  },
  async mounted() {
    const currentFont = localStorage.getItem("user-info");
    if (!currentFont) {
      this.$store.dispatch("authenticate");
      this.$router.push({ name: "SignUp" });
    }
    const result = await axios.get(
      `http://localhost:3000/restaurants/${this.$route.params.id}`
    );
    (this.name = result.data.name),
      (this.address = result.data.address),
      (this.phone = result.data.phone);
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
