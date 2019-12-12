<template>
  <div class="align-self-center" style="width:100%">
    <v-form @submit.prevent="handleSignIn(userData)" style="flex: 1">
      <h1 class="display-1 font-weight-bold mb-2">Login To Dashboard</h1>
      <!-- <p class="subheading-2 grey--text">Create your account and start using it for free</p> -->
      <v-row>
        <v-col class="pb-0 mb-n1">
          <v-text-field v-model="userData.email" label="Email" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pb-1">
          <v-text-field v-model="userData.password" label="Password" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pb-1">
          <v-btn
            @click.prevent="handleSignIn(userData)"
            color="primary"
            width="130px"
            class="text-capitalize"
            style="border-radius:0"
          >Login</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pb-1">
          <p class="subtitle-3">
            Don't have account ?
            <router-link :to="{name: 'registration'}" class="primary--text vuegram-link">Register</router-link>
          </p>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    handleSignIn() {
      this.$store.dispatch("signin", { vm: this, userData: this.userData });
    }
  }
};
</script>