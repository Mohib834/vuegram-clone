<template>
  <div class="align-self-center" style="width:100%">
    <v-form ref="form" style="flex: 1">
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
            @click="handleSignIn(userData)"
            color="primary"
            width="130px"
            class="text-capitalize"
            style="border-radius:0"
            :loading="authFormLoading"
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      userData: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          v => v.length === 0 && "Email is required !",
          v => /.+@.+/.test(v) || "Email must be valid"
        ],
        password: [
          v => v.length === 0 && "Password is required !",
          v => v.length >= 6 || "Minimum password length is 6 !"
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["authFormLoading"])
  },
  methods: {
    handleSignIn() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signin", { vm: this, userData: this.userData });
      }
    }
  }
};
</script>