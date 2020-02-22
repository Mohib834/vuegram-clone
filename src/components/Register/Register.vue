<template>
  <v-form ref="form">
    <h1 class="display-1 font-weight-bold mb-2">Get Started</h1>
    <p class="subheading-2 grey--text">Create your account and start using it for free</p>
    <v-row>
      <v-col class="pb-1">
        <v-text-field
          validate-on-blur
          :rules="rules.name"
          v-model="userData.firstName"
          label="First name"
          required
        ></v-text-field>
      </v-col>
      <v-col class="pb-1">
        <v-text-field
          validate-on-blur
          :rules="rules.name"
          v-model="userData.lastName"
          label="Last name"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pb-1">
        <v-text-field
          :rules="rules.email"
          type="email"
          v-model="userData.email"
          label="Email"
          required
          validate-on-blur
        ></v-text-field>
      </v-col>
      <v-col class="pb-1">
        <v-text-field
          validate-on-blur
          :rules="rules.phone"
          v-model="userData.phone"
          label="Phone"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pb-1">
        <v-text-field
          :rules="rules.password"
          type="password"
          v-model="userData.password"
          label="Password"
          required
          validate-on-blur
        ></v-text-field>
      </v-col>
      <v-col class="pb-1">
        <v-text-field
          :rules="rules.confirmPassword"
          type="password"
          v-model="userData.confirmPassword"
          label="Confirm Password"
          required
          validate-on-blur
        ></v-text-field>
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
          :loading="authFormLoading"
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
import { mapGetters } from "vuex";
import store from "@/store/store";

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
      },
      rules: {
        email: [
          v => v.length === 0 && "Email is required !",
          v => /.+@.+/.test(v) || "Email must be valid !"
        ],
        password: [
          v => v.length === 0 && "Password is required !",
          v => v.length >= 6 || "Minimum password length is 6 !"
        ],
        confirmPassword: [
          v => v.length === 0 && "Confirm password is required !",
          v => v === this.userData.password || "Password doesn't match !"
        ],
        name: [v => v.length === 0 && "Field must not be empty !"],
        phone: [v => v.length === 10 || "Must be 10 digits !"]
      }
    };
  },
  computed: {
    ...mapGetters(["authFormLoading"])
  },
  methods: {
    handleSignup() {
      if (this.$refs.form.validate()) {
        const payload = { ...this.userData };
        delete payload.confirmPassword;
        store.dispatch.signup({ userData: payload, vm: this });
      }
    }
  }
};
</script>

