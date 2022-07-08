<template>
  <div class="">
    <main class="form-signin">
      <Formik title="Connexion à l'Admin" :onSubmit="onSubmit" :validator="validator"
        v-slot="{ handleSubmit, errors, with_label }" :with_label="true"
        description="Connecter vous à votre compte Swapit">
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
import { User } from "../../lib/Services/User";
export default {
  components: {
    Formik,
    Field,
    Button,
    Error
  },
  computed: {
    validator: () => validator,
  },
  methods: {
    onSubmit: async (data) => {
      var provider = new User()
      provider.auth.login(
        {
          email: data.email,
          password: data.password
        }
      )
        .then(function () {
          provider.auth.me().then(function (response) {
            if (response?.roles?.includes('ROLE_ADMIN')) {
              window.location.href = '/admin/'
            } else {
              alert('Vous n\'avez pas les droits pour accéder à cette page')
              window.location.href = '/'
            }
          })
        }).catch(function (error) {
          console.log(error);
        });
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