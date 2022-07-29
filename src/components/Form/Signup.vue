<template>
  <div>
    <main>
      <Formik title="Inscription" :onSubmit="onSubmit" :validator="validator" v-slot="{handleSubmit, errors}" :with_label="true" description="Créer votre compte Swapit">
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

        <b-form-checkbox
          id="checkbox-1"
          v-model="status"
          name="checkbox-1"
          value="Accepté !"
          unchecked-value="Non accepté !"
          class="p-2"
        >
          <router-link to="/cgu" target='_blank' style="font-size: x-small;">Conditions Générales d'Utilisations</router-link>
        </b-form-checkbox>

        <div style="font-size: xx-small; margin-bottom: 1.5rem;">Je les ai lu & les accepte : <strong>{{ status }}</strong></div>

        <Button id="inscription" :onClick='handleSubmit' title="Inscription" type="submit">Inscription</Button>
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
    data() {
      return {
        status: 'Non accepté !'
      }
    }
  };
</script>

<style scoped>
  @media screen and (max-width: 991px) {
  #inscription {
    margin-bottom: 2rem;
  }
}
</style>