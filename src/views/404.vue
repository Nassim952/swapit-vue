<template>
    <div class="row p-5 no-overflow justify-content-md-center">
        <div class="col col-lg-4 heading">
            <h1>404</h1>
            <h2> Oops, il n'y a pas de jeux ici.</h2>
            <p> Nous ne trouvons pas la page que vous demandez. </p>
            <router-link :to="{name: 'home'}" class="btn btn-retour">Revenir à la page d'accueil</router-link>
        </div>
        <div class="col col-lg-3">
            <img src="../assets/images/illustration-Manette.png" />
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        redirect: function () {
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
.heading{
    padding-top: 90px;
    color :#29647C;
}
.heading h1{
    font-weight: 900;
    font-size: 6rem;
    color :#FB5D18;
}
.heading p {
    font-size: 20px;
}

.btn-retour{
    background: #FB5D18;
    color : white;
    font-size: 18px;
    font-weight: 900;
}
</style>