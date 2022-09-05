<template> 
    <tr>
        <td v-for="(value,key) in data" :key="value+key" class="align-items-center">

            <div v-if="key == 'ownGames' || key == 'wishGames' && value" class="m-0">
                <div class="tags">  
                    <transition-group name="slide-fade" appear appear-class="slide-fade-enter" >    
                        <span   v-for="(game) in value" :key="game.name + 'wish'"  id="genres" class="tag tag-teal">{{ game.name }}</span>
                    </transition-group>
                </div>
             </div>
              <div v-else-if="key == 'proposer' || key == 'owner' && value" class="m-0">
                <span>{{ value.username }}</span>
             </div>
            <div v-else-if="(key == 'senderGame' || key == 'proposerGame')" class="m-0">
                <div class="tags" v-if="value">  
                     <transition name="slide-fade" appear appear-class="slide-fade-enter" >    
                        <span id="genres" class="tag tag-teal">{{ value.name }}</span>
                    </transition>        
                </div>
             </div>
                <div v-else class="m-0">
                    <span>{{ value }}</span>
                </div>
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
// import GameCard from "./GameCard.vue";
export default {
    name:'Card',
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
</style>