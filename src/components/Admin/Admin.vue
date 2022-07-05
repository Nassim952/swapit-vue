<template>
    <div>
        <div>
            <Table :datas="datas" :titles="titles" v-if="datas" @retrieveList="retriveList" :choice="choice" :page="page">
                <tr>
                    <th v-for="(title, key) in titles" :key="title+key">
                    {{title}}
                    </th>
                </tr>
            </Table>
            <h3 v-else>Désolé , il n'y a pas de données pour cette table </h3>
            <h4>Choisir une autre table :</h4>
            <button v-if="choice !== 'users'" class="userChoice" @click="updateChoice">Utilisateurs</button>
            <button v-else class="swapChoice" @click="updateChoice">Echanges</button>
        </div>
    </div>
</template>
<script>
    import { User } from '../../lib/Services/User';
    import { Exchange } from '../../lib/Services/Exchange';
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
                page: 1,
            }
        },
        created() {
            this.getDatas()
        },
        provide (){
            return {
                retriveList : this.retriveList
            }
        },
        methods: {
            getDatas: function (filters = null) {
                if (this.choice == 'users') {
                    const provider = new User()
                    provider.getUsers(null,['id','username','email','ownGames','wishGames'], filters)
                    .then(response => {
                        this.datas = response
                        
                        this.updateTitles()})
                    .catch(err => {
                        this.$data.datas = null;
                        console.error(err)
                    })
                } else {
                    const provider = new Exchange()
                    provider.getExchanges(null,null, filters)
                    .then(response => {this.datas = response})
                    .catch(err => {
                        this.$data.datas = null;
                        console.error(err)

                    })
                }
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
            }, retriveList: function (filter = null) {
                this.$data.page = filter ?? 1
                this.getDatas({'page': this.$data.page})
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