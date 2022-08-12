<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Editer mes informations utilisateurs</h5>

          <button
            @click="closeModal"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <Formik
            title="Entrez votre nouveau username"
            :onSubmit="onSubmit"
            :validator="validator"
            v-slot="{ handleSubmit, errors }"
            :with_label="true"
            description="Editer profile"
          >
            <div>
              <div>
                <Field placeholder="Nom d'utilisateur" name="username" type="text"> </Field>
                <Error v-if="errors.username" :value="errors.username" />
              </div>
            </div>

            <Button
              :onClick="handleSubmit"
              title="Modifier"
              type="submit"
              >Modifier</Button
            >
          </Formik>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Button from "../Buttons/Button.vue";
import { EditProfileSchema as validator } from "../../lib/Validators/Edit_Profile_validator.js";
import Formik from "../../lib/Formik.vue";
import Field from "../../lib/Field.vue";
import Error from "../Errors/Error.vue";
import { User } from "../../lib/Services/User";

export default {
  name: "ModalEditUser",
  components: {
    Button,
    Formik,
    Field,
    Error,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    validator: () => validator,
  },
  methods: {
    async onSubmit(values) {
        const data = {
            username: values.username,
        };
        const provider = new User();
        provider.auth.me().then((response) => {
            provider.patchUser(response.id, data).then((response) => {
                if (response) {
                    this.$fire({
                        title: "Succès !",
                        text: "Nom d'utilisateur modifié",
                        type: "success",
                    }).then(() => {
                        window.location.reload();
                    });
                } else {
                    this.$fire({
                        title: "Erreur !",
                        text: "Une erreur est survenue, veuillez réessayer plus tard",
                        type: "error",
                    });
                }
            });
        }).catch(() => {
            this.$fire({
                title: "Erreur !",
                text: "Une erreur est survenue, veuillez réessayer plus tard",
                type: "error",
            });
        })
    },
  },
  inject: ["closeModal"],
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: table;
  transition: opacity 0.3s ease;
  z-index: 999;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  background: #fff;
  width: 50rem;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  margin: 0 auto;
  padding: 20px 30px;
}

.modal-footer {
  margin-top: 15px;
}

.close-btn {
  top: 4%;
  right: 3%;
}
</style>
