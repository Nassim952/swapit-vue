<template>
<div class=" modal">
    <div class="modal-wrapper">
        <div class="relative modal-container  ">
            <button @click="closeModal" class="close-btn absolute  material-icons cursor-pointer hover:text-blue-300">
                close
            </button>
            <div class="font-bold " v-for="(value,key) in data" :key="value.id+key">
                <div>{{key}} : {{value}}</div>
            </div>
            <div class="modal-body py-5 space-y-3">
                <router-link :to="{ name: 'user.edit', params: { id: data.id }}" class="text-sm hover:bg-blue-300">EDIT</router-link>
                <button><p @click="deleteData(data.id)" class="text-sm hover:bg-blue-300 ">DELETE</p></button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'ModalMobile',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    inject: ['deleteData','closeModal'],
}
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: table;
    transition: opacity 0.3s ease;
    z-index: 999;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    background: #fff;
    width: 50rem;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    margin: 0 auto;
    padding: 20px 30px;

}

.modal-footer {
    margin-top: 15px;
}

.close-btn {
    top: 4%;
    right: 3%;
}
</style>
