<template> 
    <tr v-if="data">
        <td v-for="(value,key) in data" :key="value+key" class="align-items-center">
            <div v-if="key =='username'">
                <td>
                    <a href="#" class="user-link">{{value}}</a>
                </td>
            </div>
            <div v-else-if="key == 'ownGames' || key == 'wishGames' && value" class="m-0">
                <div class="tags">  
                    <transition-group name="slide-fade" appear appear-class="slide-fade-enter"  v-if="value.length > 2">    
                        <span   v-for="(game) in value.slice(0,2)" :key="game.name + 'wish'"  id="genres" class="tag tag-teal">{{ game.name }}</span>
                    </transition-group>
                    <transition-group name="slide-fade" appear appear-class="slide-fade-enter"  v-else>    
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
                        confirmer
                    </a>
                    <a v-else class="chip info">
                        attente
                    </a>
                 </span>
             </div>
            <div v-else>
                <span>{{ value }}</span>
            </div>
        </td> 
        <td style="width: 20%;">
            <a href="#" class="table-link" @click="openModal(data)">
                <span class="fa-stack">
                    <i class="fa fa-square fa-stack-2x"></i>
                    <i class="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                </span>
            </a>
            
            <a href="#" class="table-link" @click="openModal(data)">
                <router-link :to="{ name: 'user.edit', params: { id: data.id }}">
                    <span class="fa-stack">
                        <i class="fa fa-square fa-stack-2x"></i>
                        <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                    </span>
                </router-link>   
            </a>
            <a href="#" class="table-link danger" @click="deleteData(data.id)">
                <span class="fa-stack">
                    <i class="fa fa-square fa-stack-2x"></i>
                    <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                </span>
            </a>
        </td>
    </tr>
</template>

<script>
// import GameCard from "./GameCard.vue";
export default {
    name:'UserCard',
    components: {
        // GameCard,
    },
    props:{
        data:{
            type: Object,
            require:true
        },
    },
    methods:{
        supp(id){
            this.$emit('delete', id)
        }
    },
    inject: ['openModal','deleteData'],
    }
</script>

<style scoped>

/* USER LIST TABLE */
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
	margin-left: 60px;
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
.table tbody > tr > td:first-child{
	padding-left: 20px;
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
</style>