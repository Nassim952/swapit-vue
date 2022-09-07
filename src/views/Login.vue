<template>
    <div id="bg" class="position-relative">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-10 mt-5 mb-5">
                    <div class="row justify-content-center" style="background-color: white; border-radius: 25px;">
                        <div class="col-md-10 col-lg-6 col-xl-6 order-1 order-lg-1 p-5">
                            <keep-alive>
                                <component v-bind:is="composantOngletActuel"></component>
                            </keep-alive>
                        </div>

                        <div class="col-md-10 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center order-2 order-lg-2">
                            <img style="width: 20rem" src="../assets/images/illustration-Manette.png" class="img-fluid" alt="Sample image">
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
      composantOngletActuel:"Login",
      otherForm: "Inscription",
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
        if (val =="Login") {
            this.$data.otherForm = "Inscription"

        } else {
             this.$data.otherForm = "Connexion"
        }
    }
  },
};
</script>

<style scoped>
#bg {
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,93,25,1) 0%, rgba(121,209,194,1) 100%);
    min-height: 800px;
}

.fill {
    height: calc(100vh - 58px);
}

@media screen and (max-width: 991px) {
  #bg {
    background: white;
  }
}
</style>