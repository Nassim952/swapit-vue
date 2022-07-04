<template> 
<table>
    <slot></slot>
    <tr>
        <td class="px-5 py-5  border-gray-200 bg-white text-sm cursor-pointer ">
            <div class="flex items-center ">
                <div class="flex-shrink-0 w-10 h-10">
                    <img class="w-full h-full rounded-full"
                        :src="data.id"
                        alt="" />
                </div>
              
            </div>
        </td>
        <td class="xl:table-cell py-5 px-5 bg-white text-sm" v-for="(value,key) in data" :key="value.id+key">
              <div class="ml-2 text-sm    ">
                    <p class="md:text-base text-gray-900 whitespace-pre">
                        {{value}}
                    </p>
                </div>
            
        </td> 
        <td class=" md:table-cell text-center md:pl-1 md:py-5  bg-white text-sm">
            <div class="ml-2 text-sm">
                <button @click="openModal(data)" class="text-gray-500 cursor-pointer ml-2">
                    <i class="transition duration-200 ease-in-out material-icons-round text-gray-500 hover:text-blue-500 md:text-md"> edit</i>
                </button>
            </div>
            <div class="ml-2 text-sm">      	
                <button @click="deleteData(data.id)" class="text-gray-500 cursor-pointer ml-2">
                    <i class="transition duration-200 ease-in-out material-icons-round text-gray-500 hover:text-blue-500 md:text-md"> delete</i>
                </button>
            </div>	
        </td> 
        <td>    
   
        </td>
       
    </tr>
</table>
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
    td{
        width: 8%;
    };
</style>