<template>
    <div class="">
        <main class="form-reset-password">
            <Formik title="Réinitialisation du mot de passe" :onSubmit="onSubmit" :validator="validator"
                v-slot="{ handleSubmit, errors }" :with_label="true" description="Tapez votre nouveau mot de passe">
                <div>
                    <Field name="password" placeholder="Nouveau mot de passe" type="password"> </Field>
                    <Error v-if="errors.password" :value="errors.password" />
                </div>

                <div>
                    <Field name="password_confirm" type="password"> </Field>
                    <Error v-if="errors.password_confirm" :value="errors.password_confirm" />
                </div>
                <Button :onClick="handleSubmit" title="Continuer" type="submit">Continuer</Button>
            </Formik>
        </main>
    </div>
</template>

<script>

import Button from "../Buttons/Button.vue";
import { ResetPasswordSchema as validator } from "../../lib/Validators/Reset_Password_Validator.js";
import Formik from "../../lib/Formik.vue";
import Field from "../../lib/Field.vue";
import Error from "../Errors/Error.vue";
import { UserAdmin } from "../../lib/Services/UserAdmin";

export default {
    components: {
        Formik,
        Field,
        Button,
        Error
    },
    data() {
        return {
            user: {}
        }
    },
    created() {
        this.getUserByToken(this.$route.params.token)
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
            const form = {
                password: data.password
            }
            var provider = new UserAdmin()
            provider.patchUser(this.$data.user.id, form).then(() => {
                this.$fire({
                    title: "Succès !",
                    text: "Votre mot de passe a été modifié, vous pouvez maintenant vous connecter",
                    type: "success",
                    timer: 3000
                }).then(() => {
                    provider.setTokenResetPasswordToNull(this.$data.user.id).then(() => {
                        this.$router.push('/signin')
                    })
                });
            }).catch(() => {
                this.$fire({
                    title: "Erreur",
                    text: "Votre mot de passe n'a pas pu être modifié",
                    type: "error"
                });
            });
        },
        async getUserByToken(token) {
            if (token) {
                var provider = new UserAdmin()
                await provider.getUsers(null, null, { 'resetTokenPassword': token }).then(response => {
                    response = response.shift()
                    if (response) {
                        this.$data.user = response
                    }
                    else {
                        this.$fire({
                            title: 'Erreur',
                            text: 'Vous ne pouvez pas accéder à cette page !',
                            type: 'error'
                        }).then(() => {
                            this.$router.push('/')
                        })
                    }
                })
            }
            else {
                this.$fire({
                    title: 'Erreur',
                    text: 'Vous ne pouvez pas accéder à cette page !',
                    type: 'error'
                }).then(() => {
                    this.$router.push('/')
                })
            }
        }
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

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
}
</style>