<template>

    <div>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
        <div class="text-center p-2" style="background-color: #f9d6c7; border-bottom: 3px solid #FB5D19;">
            <h4>Choisir une autre table :</h4>
            <button v-if="choice !== 'Utilisateurs'" class="userChoice" @click="updateChoice">Utilisateurs</button>
            <button v-else class="swapChoice" @click="updateChoice">Echanges</button>
        </div>
         <transition name="slide-fade">
          <modal v-if="isOpenModal" :data="modalData" :choice="choice"> 
          </modal>
        </transition>
         <transition name="slide-fade">
        <TableHead :datas="datas" :titles="titles" v-if="datas" @retrieveList="retriveList && datas" :choice="choice"
            :page="page">
<tr>           
            <th v-for="(title, key) in titles" :key="title + key" scope="col">
                <span>{{ title }}</span>

            </th>
            </tr>
        </TableHead>
        <h3 v-else-if="!isloading">Désolé , il n'y a pas de données pour cette table </h3>
         </transition>
    </div>

</template>

<script>
import { User } from '../../lib/Services/User';
import { Igdb } from '../../lib/Services/Igdb';
import { Exchange } from '../../lib/Services/Exchange';
import TableHead from "./Table.vue";
import jwt_decode from 'jwt-decode';
  import Modal from './functionalities/Modal.vue'

export default {
    name: "Admin",
    components: {
        TableHead,
        Modal
        // Input,
    },
    data() {
        return {
            modalData: {},
            datas: [],
            choice: 'Utilisateurs',
            titles: [],
            isOpenModal: false,
            showEdit: false,
            page: 1,
            isloading: false,
        }
    },
    created() {
        this.checkAccess();
    },
    provide() {
        return {
            retriveList: this.retriveList,
            closeModal: this.closeModal,
            openModal: this.openModal,
            deleteData: this.deleteData,
        }
    },
    methods: {
        async getDatas(filters = null) {
            this.isloading = true;
             const IgdbService = new Igdb();
            if (this.choice == 'Utilisateurs') {
                const provider = new User()
                provider.getUsers(null, ['id', 'username', 'email', 'ownGames', 'wishGames','numberExchangesSent','totalNumberExchanges','isMailConfirmed','roles'], filters)
                    .then((response) => {
                        if (response) {
                            response.forEach((user, index) => {
                                if (user.ownGames.length > 0) {
                                    let ownGames = user.ownGames;
                                    user.ownGames = [];
                                    IgdbService.getGames(ownGames,['id','name']).then((response) => {
                                        if(this.choice == 'Utilisateurs'){
                                           this.datas[index].ownGames = response ?? [];
                                        }
                                        })
                                }
                                if (user.wishGames.length > 0) {
                                     let wishGames = user.wishGames;
                                    user.wishGames =[];
                                    IgdbService.getGames(wishGames,['id','name'])
                                        .then((response) => {
                                            if(this.choice == 'Utilisateurs') {
                                                this.datas[index].wishGames = response ?? [];
                                            }
                                    })
                                }
                            })
                            this.datas = response;
                            this.isloading = false;
                        }
                        this.updateTitles()
                    })
                    .catch(err => {
                        console.error(err)
                    })
            } else {
                const provider = new Exchange()
                provider.getExchanges(null, null, filters)
                    .then((response) => { 
                        if (response) {
                            response.forEach((exchange, index) => {
                                if (exchange.senderGame) {
                                    let senderGame = exchange.senderGame;   
                                    exchange.senderGame = {};
                                    IgdbService.getGame(senderGame, ['id','name'])
                                        .then((response) => {          
                                        this.datas[index].senderGame = response;
                                        })
                                }
                                if (exchange.proposerGame) {
                                     let proposerGame = exchange.proposerGame;
                                    exchange.proposerGame = {};
                                    IgdbService.getGame(proposerGame, ['id','name'])
                                        .then((response) => {
                                            this.datas[index].proposerGame = response;
                                    })
                                }
                            })
                            this.datas = response;
                        }  
                        this.updateTitles()
                    })
                    .catch(err => {
                        this.$data.datas = null;
                        console.error(err)

                    })
            }
        },

        updateTitles: function () {
            if (this.$data.datas) {
                let titles = []
                for (const [key] of Object.entries(this.$data.datas[0])) {
                    if (key == 'isMailConfirmed' || key == 'confirmed') {
                        titles.push('status')
                    }
                    else{ titles.push(key)
                    }
                   
                }
                this.$data.titles = titles
            }
        },
        updateChoice: function () {
            if (this.$data.choice == 'Utilisateurs') {
                this.$data.choice = 'Echanges'
            } else {
                this.$data.choice = 'Utilisateurs'
            }
            this.closeModal();
            this.getDatas()
        },
        retriveList: function (filter = null) {
            this.$data.page = filter ?? 1
            this.getDatas({ 'page': this.$data.page })
        },
        checkAccess: function () {
            if (localStorage.getItem('token')) {
                const decoded = jwt_decode(localStorage.getItem('token'))
                if (!decoded.roles.includes("ROLE_ADMIN")) {
                    this.$fire({
                        title: "Accès refusé",
                        text: "Vous n'avez pas les droits pour accéder à cette page, veuillez vous connecter en tant qu'admin",
                        type: "error",
                    }).then(() => {
                        this.$router.push('/admin/login')
                    })
                }
                else {
                    this.getDatas()
                }
            }
            else {
                this.$fire({
                    title: "Accès refusé",
                    text: "Vous n'avez pas les droits pour accéder à cette page, veuillez vous connecter en tant qu'admin",
                    type: "error",
                }).then(() => {
                    this.$router.push('/admin/login')
                })
            }
        },
         openModal(data) {
        // this.modalData = user;
        console.log(data);
        this.modalData={...data}
        this.isOpenModal = true;
      },
      closeModal() {
        this.isOpenModal = false;
      },
      deleteData: function(id) {
      if (this.choice == 'Utilisateurs') {
          const provider = new User()
          provider.delUser(id)
          .then(() => { this.retrieveList()})
          .catch(err => {
              this.$data.datas = null;
              console.error(err)
          })
      } else {
          const provider = new Exchange()
      
          provider.delExchange(id)
          .then(() => { this.retrieveList()})
          .catch(err => {
              this.$data.datas = null;
              console.error(err)
          })
      }
    },
    },
};
</script>

<style scoped>
.userChoice {
    background-color: #4F6D7A;
    color: #fff;
    border: none;
}

.swapChoice {
    background-color: rgb(254, 104, 71);
    color: #fff;
    border: none;
}
/* tr:hover > th {
	background-color: rgba(254, 105, 71, 0.115);
} */

tr > th {
	border-bottom: 1px solid #C2C2C2;
	padding-bottom: 0;
}

tr > th:first-child {
	padding-left: 20px;
}

tr > th span {
	border-bottom: 2px solid #C2C2C2;
	display: inline-block;
	padding: 0 5px;
	padding-bottom: 5px;
	font-weight: normal;
}

tr  th  span {
	color: #344644;
}
/* tr  th   span:after {
	content: "\f0dc";
	font-family: FontAwesome;
	font-style: normal;
	font-weight: normal;
	text-decoration: inherit;
	margin-left: 5px;
	font-size: 0.75em;
} */

tr  th  a.asc span:after {
	content: "\f0dd";
}
 tr  th  a.desc span:after {
	content: "\f0de";
}
tr  th  a:hover span {
	text-decoration: none;
	color: #2bb6a3;
	border-color: #2bb6a3;
}
</style>