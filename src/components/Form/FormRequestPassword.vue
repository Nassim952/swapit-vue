<template>
    <div>
        <main class="form-request-password">
            <Formik title="Réinitialiser votre mot de passe" :onSubmit="onSubmit" :validator="validator"
                v-slot="{ handleSubmit, errors, with_label }" :with_label="true" description="Entrez votre adresse mail">
                <div>
                    <Field type="email" name="email" placeholder="name@example.com" :with_label="with_label" :error="errors.email" />
                    <Error v-if="errors.email" :value="errors.email" />
                </div>
                <Button :onClick="handleSubmit" title="Continuer" type="submit">Continuer</Button>
            </Formik>
        </main>
    </div>
</template>

<script>

import Button from "../Buttons/Button.vue";
import { RequestPasswordSchema as validator } from "../../lib/Validators/Request_Password_Validator.js";
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
        onSubmit: async (data) => {
            var provider = new UserAdmin()
            provider.checkEmailIfExist(data.email)
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
.form-request-password {
    margin-top: 100px;
}
@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
}
</style>