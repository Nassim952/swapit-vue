<template>
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Editer mes informations utilisateurs</h5>

                    <button @click="closeModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>

                <div class="modal-body">
                    <table class="table table-striped table-hover m-0">
                        <tbody>
                            <tr>
                                <td>
                                    Nom d'utilisateur :
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="modal-footer">
                    
                    <button class="picto-search bg-white">
                        Modifier
                    </button>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalEditUser',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    inject: ['closeModal'],
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
