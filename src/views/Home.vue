<template>
    <div class="row p-5 no-overflow">
        <img class="col-lg-6" src="../assets/images/swapit-landing.svg" />
        <img class="col-lg-6 " src="../assets/images/illustration-Manette.png" />
    </div>
</template>

<script>
export default {
    name: 'Landing',
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
}
}
</script>

