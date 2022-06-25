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
                        console.log(this.$data.composantOngletActuel)

        } else {
            this.$data.composantOngletActuel = "Register"
            console.log(this.$data.composantOngletActuel)

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
        // console.log("composantOngletActuel: ")
    }
  },
};
</script>

<style scoped>

</style>