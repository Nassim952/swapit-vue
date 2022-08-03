<template>
    <div>
        <form class="form-horizontal" action="" method="post">
            <fieldset>
                <legend class="text-center">Contacte nous</legend>
                <h6 class="text-center" style="font-size: x-small;">Nous te répondrons dans les plus brèves délais</h6>

                <div class="form-group">
                    
                    <div class="col-md-9 p-3 m-auto">
                        <input id="name" name="name" type="text" placeholder="Ton nom" class="form-control">
                    </div>
                </div>

                <div class="form-group">
                    
                    <div class="col-md-9 p-3 m-auto">
                        <input id="email" name="email" type="text" placeholder="Ton email" class="form-control">
                    </div>
                </div>

                <div class="form-group">
                    
                    <div class="col-md-9 p-3 m-auto">
                        <textarea class="form-control" id="message" name="message" placeholder="Entre ici ton message..." rows="5"></textarea>
                    </div>
                </div>

                <div class="form-group text-center">
                    <div class="col-md-12 text-right p-3">
                        <button type="submit" class="btn btn-primary btn-lg">Envoyer</button>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Contacter",
    };
</script>

<style scoped>

</style>