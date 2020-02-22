<template>
  <v-form lazy-validation ref="form" @submit.prevent="handleSignup">
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
          @click="handleSignup"
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


<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import store from "@/store/store";

@Component
export default class Register extends Vue {
  @Ref("form") form!: HTMLFormElement;

  userData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  };

  rules = {
    email: [
      (v: string) => v.length === 0 && "Email is required !",
      (v: string) => /.+@.+/.test(v) || "Email must be valid !"
    ],
    password: [
      (v: string) => v.length === 0 && "Password is required !",
      (v: string) => v.length >= 6 || "Minimum password length is 6 !"
    ],
    confirmPassword: [
      (v: string) => v.length === 0 && "Confirm password is required !",
      (v: string) => v === this.userData.password || "Password doesn't match !"
    ],
    name: [(v: string) => v.length === 0 && "Field must not be empty !"],
    phone: [(v: string) => v.length === 10 || "Must be 10 digits !"]
  };

  get authFormLoading() {
    return store.getters.authFormLoading;
  }

  handleSignup() {
    if (this.form.validate()) {
      const payload = { ...this.userData };
      delete payload.confirmPassword;
      store.dispatch.signup({ userData: payload, vm: this });
    }
  }
}

//   computed: {
//     ...mapGetters(["authFormLoading"])
//   },
//   methods: {

//   }
// };
</script>

