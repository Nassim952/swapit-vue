<template>
  <div>
    <main>
      <Formik title="Inscription" :onSubmit="onSubmit" :validator="validator" v-slot="{ handleSubmit, errors }"
        :with_label="true" description="Créer votre compte Swapit">
        <div>
          <div>
            <Field placeholder="Nom d'utilisateur" name="login" type="text"> </Field>
            <Error v-if="errors.login" :value="errors.login" />

          </div>

          <div>
            <Field placeholder="name@example.com" name="email" type="email"> </Field>
            <Error v-if="errors.email" :value="errors.email" />

          </div>

          <div>
            <Field name="mot de passe" placeholder="Mot de passe" type="password"> </Field>
            <Error v-if="errors.password" :value="errors.password" />
          </div>

          <div>
            <Field name="confirmation de mot de passe" type="password"> </Field>
            <Error v-if="errors.password_confirm" :value="errors.password_confirm" />
          </div>
          <Error v-if="errors.password_confirm" :value="errors.password_confirm" />
        </div>

        <b-form-checkbox
          id="checkbox-1"
          v-model="status"
          name="checkbox-1"
          value="Accepté !"
          unchecked-value="Non accepté !"
          class="p-2"
        >
          <router-link to="/cgu" target='_blank' class="cgu" style="font-size: x-small;">CGU</router-link>
        </b-form-checkbox>

        <div style="font-size: xx-small; margin-bottom: 1.5rem;">Je les ai lu & les accepte : <strong>{{ status
        }}</strong></div>

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
import { User } from "../../lib/Services/User";
// import VueSimpleAlert from "vue-simple-alert/lib";

export default {
  components: {
    Formik,
    Field,
    Button,
    Error
  },
  data() {
    return {
      status: 'Non accepté !'
    }
  },
  computed: {
    validator: () => validator,
  },
  methods: {
    async onSubmit(data) {
      const provider = new User()
      provider.postUser(
        {
          username: data.login,
          email: data.email,
          password: data.password
        }
      ).then(response => {
        console.log(response)
        if (response) {
          this.$fire({
            title: 'Utilisateur créé',
            text: 'Veuillez vérifier votre boîte mail pour confirmer votre compte',
            type: 'success',
          }).then(() => {
            this.$router.push('/signin')
          })
        }
        else {
          this.$fire({
            title: 'Erreur lors de la création de l\'utilisateur',
            text: 'Le mail est peut-être déjà utilisé',
            type: 'error',
          })
        }
      }).catch(() => {
        this.$fire({
          title: 'Erreur lors de la création de l\'utilisateur',
          text: 'Une erreur est survenue, veuillez réessayer',
          type: 'error',
        })
      })
    }
  },
  name: "Register",
};
</script>

<style scoped>
.cgu{
    vertical-align: text-bottom;
    margin-left: 10px;
    color: rgb(251, 93, 25);
}
@media screen and (max-width: 991px) {
  #inscription {
    margin-bottom: 2rem;
  }
}
</style>