<template>
  <div class="">
    <main class="form-signin">
      <Formik title="Connexion" :onSubmit="onSubmit" :validator="validator" v-slot="{handleSubmit, errors, with_label}" :with_label="true" description="Connecter vous à votre compte Swapit">
        <div>
          <Field type="email" name="email"  placeholder="name@example.com" :with_label="with_label" :error="errors.email"/>
          <!-- <small v-if="errors.email"> {{errors.email}} </small> -->
          <Error v-if="errors.email" :value="errors.email"/>
        </div>
        <div>
          <div>
            <Field type="password" name="password"  :with_label="with_label" placeholder="toto" :error="errors.password"/>
            <Error  v-if="errors.password" :value="errors.password"/>
            <!-- <small v-if="errors.password"> {{errors.password}} </small> -->
          </div>
        </div>
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"> Se souvenir de moi
          </label>
        </div>
        <Button :onClick='handleSubmit' title="Connexion" type="submit">Connexion</Button>
      </Formik>
    </main>
  </div>
</template>

<script>

  import Button from "../Buttons/Button.vue";
  import { SigninSchema as validator } from "../../lib/Validators/Signin_validator.js";
  import Formik from "../../lib/Formik.vue";
  import Field from "../../lib/Field.vue";
  import Error from "../Errors/Error.vue";
  import {Auth} from "../../lib/Services/Auth";
  export default {
    components: {
      Formik,
      Field,
      Button,
      Error
    },
    computed:{
      validator:()=>validator,
    },
    methods: {
      onSubmit: async (data) => {
      var provider = new Auth()
      provider.login(
        {
          email: data.email,
          password: data.password
        }
      )
      .then(function (response) {
          console.log(data.email);
          for (var i=0; i<=response.data['hydra:member'].length ; i++) {
            if(data.email == response.data['hydra:member'][i]['email'] && data.password == response.data['hydra:member'][i]['password']){
              localStorage.setItem('username', response.data['hydra:member'][i]['username']);
              localStorage.setItem('id', response.data['hydra:member'][i]['id']);
              this.$router.push('/games');
            }
            else{
              // this.$data.connexion_failed = true
            }
          }     
      })





        // axios.get('http://localhost:81/users')
        // .then(function (response) {
        //   console.log(data.email);
        //   for (var i=0; i<=response.data['hydra:member'].length ; i++) {
        //     if(data.email == response.data['hydra:member'][i]['email'] && data.password == response.data['hydra:member'][i]['password']){
        //       localStorage.setItem('username', response.data['hydra:member'][i]['username']);
        //       localStorage.setItem('id', response.data['hydra:member'][i]['id']);
        //       this.$router.push('/games');
        //     }
        //     else{
        //       // this.$data.connexion_failed = true
        //     }
        //   }
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
      }
    },
    name: "Signin",
  };
</script>


<style scoped>
  .body-container {
    margin-top: 30px;
  }
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }
</style>