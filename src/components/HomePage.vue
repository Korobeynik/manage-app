<template>
  <div>
    <h1 class="user" v-if="user">
      Hello <span>{{ userData.name }}</span
      >, Welcome on Home page!
    </h1>
    <div class="list" v-if="list">
      <v-row>
        <v-col
          v-for="(item, i) in list"
          :key="i"
          cols="12"
          sm="12"
          md="6"
          class="my-4"
        >
          <v-card width="400">
            <v-img height="200" :src="myImage" cover class="text-white">
              <v-toolbar color="rgba(0, 0, 0, 0.5)" theme="dark">
                <v-toolbar-title style="font-weight: bold">{{
                  item.name
                }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn icon>
                      <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                      :to="'/update/' + item.id"
                      @click="updateRestaurant(item)"
                      >Update Restaurant</v-list-item
                    >
                    <v-list-item @click="deleteRestaurant(item)"
                      >Delete Restaurant</v-list-item
                    >
                    <v-list-item @click="addFavorite(item)"
                      >Add To Favorite</v-list-item
                    >
                  </v-list>
                </v-menu>
              </v-toolbar>
            </v-img>

            <v-card-text>
              <div class="content">
                <p><span>Phone:</span> {{ item.phone }}</p>
                <p><span>Address:</span> {{ item.address }}</p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      list: null,
      myImage: require("@/assets/bg.jpeg"),
    };
  },
  computed: {
    ...mapGetters(["user"]),
    userData() {
      console.log(this.user);
      return this.user;
    },
  },
  methods: {
    async deleteRestaurant(item) {
      console.log(item);
      try {
        const response = await axios.delete(
          `http://localhost:3000/restaurants/` + item.id
        );
        this.list = this.list.filter((i) => i.id !== item.id);

        if (!response.data.length) {
          this.$toast.success(`Restaurant successfully removed`, {
            timeout: 4000,
          });
        }
        console.log(response);
        if (response.data.length) {
          this.list = response.data;
        }
      } catch (error) {
        console.error("Error creating account:", error);
      }
    },
    addFavorite(item) {
      console.log(item);
    },
    updateRestaurant(item) {
      console.log(item);
    },
    async getRestaurants() {
      try {
        const response = await axios.get(`http://localhost:3000/restaurants`);
        if (!response.data.length) {
          this.$toast.error(`Something was wrong!`, {
            timeout: 4000,
          });
        }
        console.log(response);
        if (response.data.length) {
          this.list = response.data;
        }
      } catch (error) {
        console.error("Error creating account:", error);
      }
    },
  },
  mounted() {
    this.getRestaurants();
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
}
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  span {
    font-weight: bold;
  }
  p {
    width: 100%;
    font-size: 18px;
  }
}
.list {
  max-width: 900px;
  margin: auto;
  padding-top: 30px;
}
.user {
  span {
    color: #ff8000;
    font-weight: bold;
    font-size: 40px;
  }
}
</style>
