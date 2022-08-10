<template>
  <div>
    <main class="form-contact">
      <Formik title="Un problème ? Contacte nous !" :onSubmit="onSubmit" :validator="validator"
        v-slot="{ handleSubmit, errors }" :with_label="true" description="Renseignez ce formulaire de contact">
        <div>
          <Field type="text" name="objet" placeholder="Besoin d'aide..."
            :error="errors.objet" />
          <Error v-if="errors.objet" :value="errors.objet" />
        </div>
        <div>
          <textarea class="textarea-wrapper" name="description" placeholder="Bonjour j'ai besion de..."
            :error="errors.description" />
          <Error v-if="errors.description" :value="errors.description" />
        </div>
        <Button class="contact-wrap" :onClick="handleSubmit" title="Contacter" type="submit">Contacter</Button>
      </Formik>
    </main>
  </div>
</template>

<script>
import Button from "../Buttons/Button.vue";
import Formik from "../../lib/Formik.vue";
import Field from "../../lib/Field.vue";
import Error from "../Errors/Error.vue";
import { RequestContact as validator } from "../../lib/Validators/Request_Contact_Validator.js";
import { User } from "../../lib/Services/User";

export default {
  components: {
    Formik,
    Field,
    Button,
    Error
  },
  data: function() {
    return {
      user: {}
    };
  },
  created: function() {
    this.getUserCurrent();
  },
  computed: {
    validator: () => validator,
  },
  methods: {
    async onSubmit(data) {
      console.log(data);
      const provider = new User()
      provider.sendMailContact(this.$data.user.id).then(() => {
        this.$fire({
          title: "Succès !",
          text: "Merci pour votre message !",
          type: "success"
        }).then(() => {
          this.$router.push("/");
        });
      }).catch(() => {
        this.$fire({
          title: "Erreur !",
          text: "Une erreur est survenue, veuillez réessayer plus tard.",
          type: "error"
        });
      })
    },
    async getUserCurrent() {
      const provider = new User()
      provider.auth.me().then(response => {
        this.$data.user = response;
      }).catch(() => {
        this.$fire({
          title: "Erreur",
          message: "Une erreur est survenue, veuillez réessayer plus tard.",
          type: "error"
        })
      })
    }
  },
  name: "Contact",
};
</script>

<style scoped>
.contact-wrap {
  margin-top: 25px;
}

.textarea-wrapper {
  width: 250px;
  margin-top: 20px;
}
</style>