import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  customVariables: ["~/assets/variables.scss"],
  treeShake: true,
  theme: {
    themes: {
      light: {
        primary: "#655DE2"
      }
    }
  }
});
