<template>
    <div>
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-10" >

                            <div class="row justify-content-center" style="background-color: white; border-radius: 25px;">
                                <div class="col-md-10 col-lg-6 col-xl-6 order-1 order-lg-1 p-4">
                                    <Contacter/>
                                </div>

                                <div class="col-md-10 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center order-2 order-lg-2">
                                    <img style="width: 20rem" src="../assets/images/illustration-Manette.png" class="img-fluid" alt="Sample image">
                                </div>
                            </div>
                        
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Contacter from "../components/Form/Contacter.vue";

    export default {
        components: {
            Contacter
        }
    }
</script>

<style scoped>

</style>