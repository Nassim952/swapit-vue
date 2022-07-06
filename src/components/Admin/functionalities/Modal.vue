<template>
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button @click="closeModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>

                <div class="modal-body">
                    <table class="table table-striped table-hover m-0">
                        <tbody v-for="(value,key) in data" :key="value.id+key">
                            <tr>
                                <td>
                                    {{key}} : {{value}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="modal-footer">
                    <button :to="{ name: 'user.edit', params: { id: data.id }}" class="picto-search bg-white">
                        Modifier
                    </button>

                    <button @click="deleteData(data.id)" class="picto-search bg-white">
                        Supprimer
                    </button>
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
