<template> 
    <tr>
        <td v-for="(value,key) in data" :key="value.id+key" class="align-items-center">
            {{value}} 
        </td> 

        <td>
            <button @click="openModal(data)" class="picto-search">
                <img src="../../assets/icones/edit-user.png">
            </button>
        </td>

        <td>
            <button @click="deleteData(data.id)" class="picto-search">
                <img src="../../assets/icones/delete-user.png">
            </button>
        </td>
    </tr>
</template>

<script>

export default {
    name:'Card',
    props:{
        data:{
            type: Object,
            require:true
        },
    },
    methods:{
        supp(id){
            console.log('del ',id);
            this.$emit('delete', id)
        }
    },
    inject: ['openModal','deleteData'],
    }
</script>

<style scoped>
    
</style>