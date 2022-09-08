<template>
    <footer class="footer-page bg-light p-1">
        <div class="container d-flex justify-content-between">
            <span class="text-muted">© Swapit 2022</span>
            <div>
                <span>
                    <router-link to="/cgu" class="link-nav p-3" style="font-size: small;">CGU</router-link>
                </span>
                <span>
                    <router-link to="/contact" class="link-nav p-3" style="font-size: small;">Nous contacter
                    </router-link>
                </span>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style scoped>
.link-nav {
    text-decoration: none;
    color: rgba(41, 100, 124);
}

.link-nav:hover {
    color: #FB5D19;
    transition: color 0.2s;
}

.footer-page {
    left: 0;
    width: 100%;
    z-index: 300;
    position: fixed;
    bottom: 0;
}
</style>