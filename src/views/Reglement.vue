<template>
    <div id="bg" class="position-relative fill">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-10" >
                    
                        
                            <div class="row justify-content-center" style="background-color: white; border-radius: 25px;">
                                <div class="col-md-10 col-lg-6 col-xl-6 order-1 order-lg-1 p-4">
                                    <Cgu/>
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
    import Cgu from "../components/Form/Cgu.vue";

    export default {
        components: {
            Cgu
        }
    }
</script>

<style scoped>
#bg {
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,93,25,1) 0%, rgba(121,209,194,1) 100%);
}

.fill {
    height: calc(100vh - 58px);
}

@media screen and (max-width: 991px) {
  #bg {
    background: white;
  }
}
</style>