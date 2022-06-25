<template>
    <div class="error">
       <small> {{value}} </small>
    </div>
</template>

<script>
    export default {
        name: "Error",
        props:{
            variant: {
            type: String,
            default: 'white',
            validator: (val) => ["white", "black",].includes(val),
            },
            value:{
            type: String,
            default:' ',
            },
        },
    };
</script>

<style scoped>;
 .error {
	position:relative;
	margin-bottom:25px;
    color: #FE5F55;
}
</style>