<template>
    <div>
        <div>
            <Table :datas="datas" :titles="titles" v-if="datas"  @delete='deleteData' @edit="showEditModal"/>
            <h3 v-else>Désolé , il n'y a pas de données pour cette table </h3>
            <h4>Choisir une autre table :</h4>
            <button class="userChoice" @click="updateChoice">Utilisateurs</button>
            <button class="swapChoice" @click="updateChoice">Echanges</button>
        </div>
        <div v-if="showEdit">
            <div v-if="enableEdit">
                <input v-for="(value,key) in datas" :key="data.id+key" type="text" v-model="data.id" placeholder="id" />
            </div>
            <div v-else>
                <p v-for="(value,key) in datas" :key="data.id+key" type="text" placeholder="id"> {{key}} : {{value}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import { User } from '../../lib/Services/User';
    import { Exchange } from '../../lib/Services/Exchange';
    // import Input from '../Inputs/Input.vue';
    import Table from "./Table.vue";

    export default {
        name: "Admin",
        components: {
            Table,
                // Input,
        },
        data() {
            return {
                datas: [],
                choice: 'users',
                titles: [],
                enableEdit: false,
                dataEdit: {},
                showEdit: false,
            }
        },
        created() {
            this.getDatas()
        },
        provide (){
            return {
                deleteData : this.deleteData
            }
        },
        methods: {
            getDatas: function () {
                if (this.choice == 'users') {
                    const provider = new User()
                
                    provider.getUsers()
                    .then(response => {this.datas = response})
                    .catch(err => {
                        this.$data.datas = null;
                        console.error(err)
                    })
                } else {
                    const provider = new Exchange()
                
                    provider.getExchanges()
                    .then(response => {this.datas = response})
                    .catch(err => {
                        this.$data.datas = null;
                        console.error(err)

                    })
                }
            },
            deleteData: function(id) {
               if (this.choice == 'users') {
                    const provider = new User()
                
                    provider.delUser(id)
                    .then(response => {this.datas = response})
                    .catch(err => {
                        this.$data.datas = null;
                        console.error(err)
                    })
                } else {
                    const provider = new Exchange()
                
                    provider.delExchange(id)
                    .then(response => {this.datas = response})
                    .catch(err => {
                        this.$data.datas = null;
                        console.error(err)
                    })
                }
            },
            showEditModal: function(data) {
                this.$data.dataEdit = data
                this.$data.showEdit = true
            },
            closeEdit: function() {
                this.$data.showEdit = false
            },
            updateTitles: function () {
                if (this.$data.datas) {
                    let titles = []
                for (const [ key] of Object.entries(this.$data.datas[0])) {
                    titles.push(key)
                }
                this.$data.titles = titles
            }
            },
            updateChoice: function () {
                if (this.$data.choice == 'users'){
                    this.$data.choice = 'exchanges'
                } else {
                    this.$data.choice = 'users'
                }
                this.getDatas()
            }
        },
        
    };
</script>

<style scoped>

.userChoice{
    background-color: #4F6D7A;
    color: #fff;
    margin-right: 5px;
    border: none;
}
.swapChoice{
    background-color: #FE6847;
    color: #fff;
    border: none;
}
h3{
    text-align: center;
}
</style>