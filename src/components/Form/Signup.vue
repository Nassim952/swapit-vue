<template>
  <div>
    <main>
      <Formik title="Inscription" :onSubmit="onSubmit" :validator="validator" v-slot="{handleSubmit, errors}" :with_label="true" description="Créer votre compte Swapit">
        <!-- <h1 class="h3 mb-3 fw-normal">Inscription</h1> -->

        <div >
          <Field placeholder="Nom d'utilisateur" name="login" type="text"> </Field>
          <Error  v-if="errors.login" :value="errors.login"/>

        </div>

        <div>
          <Field placeholder="name@example.com" name="email" type="email"> </Field>
          <Error  v-if="errors.email" :value="errors.email"/>

        </div>

        <div>
          <Field name="password" placeholder="Mot de passe" type="password"> </Field>
          <Error  v-if="errors.password" :value="errors.password"/>
        </div>

        <div>
          <Field name="password_confirm" type="password"> </Field>
          <Error  v-if="errors.password_confirm" :value="errors.password_confirm"/>
        </div>

        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"> Se souvenir de moi
          </label>
        </div>
        <Button :onClick='handleSubmit' title="Inscription" type="submit">Inscription</Button>
      </Formik>
    </main>
  </div>
</template>

<script>
  import Button from "../Buttons/Button.vue";
  import { SignupSchema as validator } from "../../lib/Validators/Signup_validator.js";
  import Formik from "../../lib/Formik.vue";
  import Field from "../../lib/Field.vue";
  import Error from "../Errors/Error.vue";
  import {User} from "../../lib/Services/User";

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
      onSubmit:(data)=> {
        var provider = new User()
        provider.postUser(
          {
            username: data.login,
            email: data.email,
            password: data.password
          }
        ).then(() => { 
          window.location.href = '/signin'
        })
      }
    },
    name: "Register",
  };
</script>

<style scoped>
</style>