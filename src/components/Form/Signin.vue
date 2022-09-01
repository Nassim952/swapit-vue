<template>
  <div>
    <main>
      <Formik title="Connexion" :onSubmit="onSubmit" :validator="validator"
        v-slot="{ handleSubmit, errors, with_label }" :with_label="true"
        description="Connectez vous à votre compte Swapit">
        <div>
          <Field type="email" name="email" placeholder="name@example.com" :with_label="with_label"
            :error="errors.email" />
          <!-- <small v-if="errors.email"> {{errors.email}} </small> -->
          <Error v-if="errors.email" :value="errors.email" />
        </div>
        <div>
          <div>
            <Field type="password" name="password" :with_label="with_label" placeholder="toto"
              :error="errors.password" />
            <Error v-if="errors.password" :value="errors.password" />
            <!-- <small v-if="errors.password"> {{errors.password}} </small> -->
          </div>
        </div>
        <div class="wrapper-reset-pwd">
          <router-link class="mdpo" to="/form-request-reset-password">
            <span title="Mot de passe oublié">Mot de passe oublié ?</span>
          </router-link>
        </div>
        <div style="margin-top: 30px;">
          <Button :onClick="handleSubmit" title="Connexion" type="submit">Connexion</Button>
        </div>
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
import { Auth } from "../../lib/Services/Auth";

export default {
  components: {
    Formik,
    Field,
    Button,
    Error
  },
  created() {
  },
  computed: {
    validator: () => validator,
  },
  mounted() {
    if (localStorage.getItem('reloaded')) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem('reloaded');
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem('reloaded', '1');
      location.reload();
    }
  },
  methods: {
    async onSubmit(data) {
      var provider = new Auth()
      provider.login(
        {
          email: data.email,
          password: data.password
        }
      ).then((response) => {
        if (response == false) {
          this.$fire({
            title: "Erreur",
            text: "Identifiants incorrectes. Note: Pensez à vérifier que votre compte est activé.",
            type: "error"
          });
        } else {
          this.$router.push("/");
        }
      });
    },
  },
}

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

.mdpo{
  color: rgb(251, 93, 25);
  font-size: 10px;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>