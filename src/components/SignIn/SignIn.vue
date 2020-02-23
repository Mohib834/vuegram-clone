<template>
  <div class="align-self-center" style="width:100%">
    <v-form ref="form" lazy-validation @submit.prevent style="flex: 1">
      <h1 class="display-1 font-weight-bold mb-2">Login To Dashboard</h1>
      <!-- <p class="subheading-2 grey--text">Create your account and start using it for free</p> -->
      <v-row>
        <v-col class="pb-0 mb-n1">
          <v-text-field
            :rules="rules.email"
            type="email"
            v-model="userData.email"
            label="Email"
            required
            validate-on-blur
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
            validate-on-blur
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pb-1">
          <v-btn
            @click="handleSignIn()"
            color="primary"
            width="130px"
            class="text-capitalize"
            style="border-radius:0"
            :loading="isLoading"
            type="submit"
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

<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import store from "@/store/store";
import { Route } from "vue-router";
import firebase from "firebase";

@Component({
  beforeRouteEnter(to: Route, from: Route, next: Function) {
    next((vm: Vue) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next("/myblogs");
        } else next();
      });
    });
  }
})
export default class Signin extends Vue {
  @Ref("form") form!: HTMLFormElement;

  userData = {
    email: "",
    password: ""
  };

  isLoading = false;

  rules = {
    email: [
      (v: string) => v.length === 0 && "Email is required !",
      (v: string) => /.+@.+/.test(v) || "Email must be valid"
    ],
    password: [
      (v: string) => v.length === 0 && "Password is required !",
      (v: string) => v.length >= 6 || "Minimum password length is 6 !"
    ]
  };

  handleSignIn() {
    if (this.form.validate()) {
      this.isLoading = true;
      store.dispatch.signin({ vm: this, userData: this.userData }).then(() => {
        this.isLoading = false;
        this.$router.push({ name: "blogs" });
      });
    }
  }
}
</script>