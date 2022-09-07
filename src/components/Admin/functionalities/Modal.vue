<template>
<div class="container">
    <div class="card">
        <div class="modal-header">
            <button @click="closeModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            </button>
        </div>

    <div class="card-body">
        <div class="w-100 d-flex justify-content-center">
            <h3>Aperçu</h3>
        </div>

        
        <table class="table">
            <thead>
                <tr>
                    <th>id</th>
                    <th>username</th>
                    <th>email</th>
                    <th>roles</th>
                    <th>ownGames</th>
                    <th>wishGames</th>
                    <th>status</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td v-for="(value,key) in data" :key="value+key" class="align-items-center">
                        <div v-if="key =='username'">
                            <td>
                                <a href="#" class="user-link">{{value}}</a>
                            </td>
                        </div>
                        <div v-else-if="key == 'ownGames' || key == 'wishGames' && value" class="m-0" style="max-height: 80px; overflow-y: auto">
                            <div class="tags">  
                                <transition-group name="slide-fade" appear appear-class="slide-fade-enter"  v-if="value.length > 2" style="display: grid">
                                    <span   v-for="(game) in value.slice(0,2)" :key="game.name + 'wish'"  id="genres" class="tag tag-teal">{{ game.name }}</span>
                                </transition-group>
                                <transition-group name="slide-fade" appear appear-class="slide-fade-enter" style="display: grid"  v-else>
                                    <span   v-for="(game) in value" :key="game.name + 'wish'"  id="genres" class="tag tag-teal">{{ game.name }}</span>
                                </transition-group>
                            </div>
                        </div>
                        <div v-else-if="key == 'email'" class="m-0">
                            <a>{{ value}}</a>
                        </div>
                        <div v-else-if="key == 'roles'" class="m-0">
                            <span class="label label-default">
                                <a v-if="value.includes('ROLE_ADMIN')" class="chip primary">
                                    Admin
                                </a>
                                <a v-else class="chip primary">
                                User
                                </a>
                            </span>
                        </div>
                        <div v-else-if="key == 'isMailConfirmed'">
                            <span >
                                <a v-if="value" class="chip primary">
                                    confirmé
                                </a>
                                <a v-else class="chip info">
                                    attente
                                </a>
                            </span>
                        </div>
                        <div v-else>
                            <span style="font-size: 1.50em; color: #FF5D19;">{{ value }}</span>
                        </div>
                    </td> 
                </tr>
            </tbody>
        </table>
        
        <!-- <div v-for="(value,key) in data" :key="value+key">
            <div v-if="key == 'ownGames' || key == 'wishGames'" class="m-0">
                <div class="tags" v-if="value">
                    <transition-group name="slide-fade" appear appear-class="slide-fade-enter" >
                        <span v-for="(game) in value" :key="game.name + '_edit'" id="genres" class="tag tag-teal">{{ game }}</span>
                    </transition-group>
                </div>
            </div>
            <div v-else-if="key == 'senderGame' || key == 'proposerGame' && value" class="m-0">
                <p>{{ key }}:</p>
                <span class="tag tag-teal">{{ value.name }}</span>
            </div>
            <div v-else-if="key == 'proposer' || key == 'owner' && value" class="m-0">
                <p>{{ key +': '+ value.username }}</p>
            </div>
            <div v-else-if="key == 'roles'" class="m-0">
                <span class="label label-default">
                <a v-if="value.includes('ROLE_ADMIN')">
                    <p>{{ key + ': Admin' }}</p>
                </a>
                <a v-else>
                    <p>{{ key + ': User' }}</p>
                </a>
                </span>
            </div>
            <div v-else-if="key == 'isMailConfirmed'" class="m-0">
                <span class="label label-default">
                    <a v-if="value">
                    <p>statut: confirmer</p>
                    </a>
                    <a v-else>
                        <p>statut: non confirmer</p>
                    </a>
                </span>
            </div>

            <div v-else class="m-0">
                <p>{{ key + ': ' +value}}:</p>                            
            </div>
        </div>  -->
    </div>

    <div class="modal-footer">
        <router-link :to="{ name: 'user.edit', params: { id: data.id }}" v-if="choice =='Utilisateurs'">
            <button class="picto-search bg-white">
                Modifier
            </button>
        </router-link>

        <button @click="deleteData(data.id)" class="picto-search bg-white">
            Supprimer
        </button>
    </div>
  </div>
</div>
    <!-- <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                

                <div class="modal-body">
                    <table class="table table-striped table-hover m-0">
                        <tbody v-for="(value,key) in data" :key="value+key">
                            <tr>
                                <td>
                                    <p>{{ key }}</p>
                                </td>
                                <td>
                                    <div v-if="key == 'ownGames' || key == 'wishGames' && value" class="m-0">
                                        <div class="tags">
                                            <transition-group name="slide-fade" appear appear-class="slide-fade-enter" >
                                                <span v-for="(game) in value" :key="game.name + '_edit'" id="genres" class="tag tag-teal">{{ game }}</span>
                                            </transition-group>
                                        </div>
                                    </div>
                                    <div v-else-if="key == 'proposer' || key == 'owner' && value" class="m-0">
                                        <p>{{ value.username }}</p>
                                    </div>
                                    <div v-else-if="(key == 'senderGame' || key == 'proposerGame')" class="m-0">
                                        <div class="tags" v-if="value">
                                            <transition name="slide-fade" appear appear-class="slide-fade-enter" >
                                                <span id="genres" class="tag tag-teal">{{ value.name }}</span>
                                            </transition>
                                        </div>
                                    </div>
                                    <div v-else class="m-0">
                                        <p>{{ value }}</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                </div>
                

                <div class="modal-footer">
                    <router-link :to="{ name: 'user.edit', params: { id: data.id }}">
                        <button class="picto-search bg-white">
                            Modifier
                        </button>
                    </router-link>

                    <button @click="deleteData(data.id)" class="picto-search bg-white">
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    </div> -->
</template>

<script>
export default {
    name: 'ModalMobile',
    props: {
        data: {
            type: Object,
            required: true
        },
        choice: {
            type: String,
            required: true
        }
    },
    computed: {
        modaldata() {
            return this.$props.data
        },
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
    width: 100rem;
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

    .tags {
        display: flex;
        flex-wrap: wrap;
    }

    .tag {
        background: #cccccc;
        border-radius: 50px;
        font-size: 8px;
        margin: 0;
        color: #fff;
        padding: 2px 10px;
        text-transform: uppercase;
        cursor: pointer;
        margin: 0.5rem;
    }
    .tag-teal {
        background-color: rgba(255, 93, 25, 1);
    }

.slide-fade-enter-active {
  transition: all .9s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
* {
  box-sizing: border-box;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  background-color: #f7f8fc;
  font-family: "Roboto", sans-serif;
  color: #10182f;
}
.container {
  display: flex;
  width: 1040px;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.card {
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 85%;
}
.card-header img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  min-height: 250px;
}

.tag {
  background: #cccccc;
  border-radius: 50px;
  font-size: 12px;
  margin: 0;
  color: #fff;
  padding: 2px 10px;
  text-transform: uppercase;
  cursor: pointer;
}
.tag-teal {
  background-color: #47bcd4;
}
.tag-purple {
  background-color: #5e76bf;
}
.tag-pink {
  background-color: #cd5b9f;
}

.card-body p {
  font-size: 13px;
  margin: 0 0 40px;
}
.user {
  display: flex;
  margin-top: auto;
}

.user img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.user-info h5 {
  margin: 0;
}
.user-info small {
  color: #545d7a;
}




.disabled{
    pointer-events: none;
    cursor: default;
  }

/* TABLES */
.table {
    border-collapse: separate;
}

  .slide-fade-enter-active {
  transition: all .6s ease;
}
.slide-fade-leave-active {
  transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.user-list tbody td > img {
    position: relative;
	max-width: 50px;
	float: left;
	margin-right: 15px;
}
.user-link {
	display: block;
	font-size: 1.25em;
	padding-top: 3px;
	
    text-decoration: none;
}
.user-subhead {
	font-size: 0.875em;
	font-style: italic;
}
    .tags {
        display: flex;
        flex-wrap: wrap;
    }

    .tag {
        background: #cccccc;
        border-radius: 10px;
        font-size: 8px;
        margin: 0;
        color: #fff;
        padding: 2px 10px;
        text-transform: uppercase;
        cursor: pointer;
        margin: 0.5rem;
    }
    .tag-teal {
        background-color: rgba(255, 93, 25, 1);
    }

.slide-fade-enter-active {
  transition: all .9s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}


tr:hover > td {
	background-color: rgba(254, 105, 71, 0.115);
}

tr > td {
	font-size: 0.875em;
	background: #f5f5f5;
	border-top: 10px solid #fff;
	vertical-align: middle;
	padding: 12px 8px;
}

td {
	-webkit-transition: background-color 0.15s ease-in-out 0s;
	transition: background-color 0.15s ease-in-out 0s;
}
tr td .call-type {
	display: block;
	font-size: 0.75em;
	text-align: center;
}
tr td .first-line {
	line-height: 1.5;
	font-weight: 400;
	font-size: 1.125em;
}
tr td .first-line span {
	font-size: 0.875em;
	color: #969696;
	font-weight: 300;
}
tr td .second-line {
	font-size: 0.875em;
	line-height: 1.2;
}
.table-link {
	margin: 0 5px;
	font-size: 1.125em;
    color: #4F6D7A;;
}
.table-link:hover {
	text-decoration: none;
	color: #2aa493;
}
.table-link.danger {
	color: #fe635f;
}
.table-link.danger:hover {
	color: #dd504c;
}


.chip{
	padding: 8px 10px;
	border-radius: 10px;
	/* font-weight: 60; */
	font-size: 12px;
	box-shadow: 0 2px 5px rgba(0,0,0,.25);
	margin: 0 10px;
	text-decoration: none;
	cursor: pointer;
}

.chip.primary{
	background: #2F4058;
	color: whitesmoke;
}

.chip.info{
	background: #5FD6D4;
	color: whitesmoke;
}

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
