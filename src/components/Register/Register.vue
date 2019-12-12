<template>
  <v-form @submit.prevent="handleSignup(userData)">
    <h1 class="display-1 font-weight-bold mb-2">Get Started</h1>
    <p class="subheading-2 grey--text">Create your account and start using it for free</p>
    <v-row>
      <v-col class="pb-1">
        <v-text-field v-model="userData.firstName" label="First name" required></v-text-field>
      </v-col>
      <v-col class="pb-1">
        <v-text-field v-model="userData.lastName" label="Last name" required></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pb-1">
        <v-text-field v-model="userData.email" label="Email" required></v-text-field>
      </v-col>
      <v-col class="pb-1">
        <v-text-field v-model="userData.phone" label="Phone" required></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pb-1">
        <v-text-field v-model="userData.password" label="Password" required></v-text-field>
      </v-col>
      <v-col class="pb-1">
        <v-text-field v-model="userData.confirmPassword" label="Confirm Password" required></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pb-1">
        <v-btn
          @click.prevent="handleSignup(userData)"
          color="primary"
          width="130px"
          class="text-capitalize"
          style="border-radius:0"
        >Sign up</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pb-1">
        <p class="subtitle-3">
          Already have an account ?
          <router-link :to="{name: 'signin'}" class="primary--text vuegram-link">Login</router-link>
        </p>
      </v-col>
    </v-row>
  </v-form>
</template>


<script>
export default {
  data() {
    return {
      userData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    handleSignup() {
      this.$store.dispatch("signup", { userData: this.userData, vm: this });
    }
  }
};
</script>

