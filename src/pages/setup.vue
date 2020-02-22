<template>
  <v-card
    width="700px"
    height="400px"
    class="mx-auto"
    style="box-shadow: 0 10px 10px rgba(0,0,0,.1)"
  >
    <v-overlay v-if="loading">
      <v-card
        color="#fff"
        elevation="6"
        style="height: 100px;display: flex;align-items: center;padding: 10px 30px;z-index: 100;"
      >
        <v-sheet width="600px">
          <v-progress-linear background-color="#bbb" :value="uploadProgress"></v-progress-linear>
        </v-sheet>
      </v-card>
    </v-overlay>
    <v-stepper style="box-shadow:none" v-model="step">
      <v-stepper-header style="box-shadow:none" class="py-3 px-2">
        <v-stepper-step :complete="step > 1" step="1">About</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="2">Upload Profile Photo</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form class="pa-10" ref="form" @submit.prevent="nextStep">
            <h3 class="title mb-4 primary--text mt-n3">Tell us about yourself-</h3>
            <v-text-field
              color="primary"
              prepend-inner-icon="mdi-wallet-travel"
              dense
              outlined
              label
              :rules="[v => v.length === 0 && 'Field cannot be left empty']"
              placeholder="Occupation"
              v-model="userAdditionalDetails.occupation"
            ></v-text-field>
            <v-textarea
              :rules="[v => v.length === 0 && 'Field cannot be left empty']"
              color="primary"
              v-model="userAdditionalDetails.bio"
              label
              dense
              outlined
              placeholder="Bio"
            ></v-textarea>
            <v-btn color="primary" class="ml-auto" @click="nextStep">next</v-btn>
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-form class="pa-10" ref="form2" @submit.prevent>
            <h3 class="title mb-4 primary--text mt-n3">Upload a photo-</h3>
            <v-file-input
              color="primary"
              v-model="userAdditionalDetails.photo"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick a photo"
              prepend-inner-icon="mdi-camera"
              prepend-icon
            ></v-file-input>
            <v-btn
              color="primary"
              class="ml-auto"
              @click="setupUser"
              :loading="loading"
            >{{ userAdditionalDetails.photo ? 'Finish' : 'Skip' }}</v-btn>
          </v-form>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import store from "@/store/store";

@Component
export default class Setup extends Vue {
  step = 1;

  userAdditionalDetails = {
    occupation: "Dev",
    bio: "This is a test bio case",
    photo: null
  };

  @Ref("form") form!: HTMLFormElement;

  get loading() {
    return store.getters.loading;
  }

  get uploadProgress() {
    return store.getters.uploadProgress;
  }

  nextStep() {
    if (this.form.validate()) {
      this.step++;
    }
  }

  setupUser() {
    store.dispatch.setupUser({
      data: this.userAdditionalDetails,
      vm: this
    });
  }
}
</script>