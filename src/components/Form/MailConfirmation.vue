<template>
    <div>

    </div>
</template>

<script>
import { UserAdmin } from "../../lib/Services/UserAdmin";

export default {
    created() {
        this.checkIfMailIsConfirmed()
    },
    methods: {
        checkIfMailIsConfirmed() {
            const provider = new UserAdmin()
            provider.getUser(this.$route.params.id).then(response => {
                if (response.isMailConfirmed == false) {
                    provider.setMailConfirmedToTrue(this.$route.params.id).then(response => {
                        if (response) {
                            this.$fire({
                                title: "Mail confirmé",
                                text: "Votre mail est confirmé, vous pouvez désormais vous connecter !",
                                type: "success",
                                timer: 3500,
                            }).then(() => {
                                this.$router.push("/signin")
                            })
                        }
                        else{
                            this.$fire({
                                title: "Erreur",
                                text: "Une erreur est survenue, veuillez réessayer plus tard",
                                type: "error"
                            })
                        }
                    })
                }
                else{
                    this.$fire({
                        title: "Mail déjà confirmé",
                        text: "Votre mail est déjà confirmer, vous pouvez vous connecter",
                        type: "info",
                        timer: 3500
                    }).then(() => {
                        this.$router.push("/signin")
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>