<template>
<div>
    <keep-alive>
        <component v-bind:is="composantOngletActuel"></component>
    </keep-alive>
    <Button :title="otherForm" :onClick="UpdateForm"/>
</div>
</template>

<script>

import Register from "../components/Form/Signup.vue";
import Login from "../components/Form/Signin.vue";
import Button from "../components/Buttons/Button.vue";
export default {
    components: {
        Register,
        Login,
        Button
    },
    data: function () {  
    return {
      composantOngletActuel:"Register",
      otherForm: "Connexion",
      }
  },
  methods: {
    UpdateForm: function () {
        if (this.$data.composantOngletActuel=="Register") {
            this.$data.composantOngletActuel="Login"
        } else {
            this.$data.composantOngletActuel = "Register"
        }
    },
  },
  watch: {
    composantOngletActuel: function (val) {
        if (val =="Register") {
            this.$data.otherForm = "Connexion"

        } else {
            this.$data.otherForm = "Inscription"
        }
    }
  },
};
</script>

<style scoped>

</style>