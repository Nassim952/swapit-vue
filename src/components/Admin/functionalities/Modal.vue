<template>
<div class="container">
  <div class="card">
    <div class="modal-header">
                        <button @click="closeModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
    <div class="card-body">
    <div v-for="(value,key) in data" :key="value+key">
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
                                        <!-- <p>{{ value }}:</p> -->
                                    </div>
      <!-- <h4>
        Why is the Tesla Cybertruck designed the way it
        is?
      </h4>
      <p>
        An exploration into the truck's polarising design
      </p>
      <div class="user">
        <img src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo" alt="user" />
        <div class="user-info">
          <h5>July Dec</h5>
          <small>2h ago</small>
        </div>
      </div> -->
    </div> 
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
  width: 80%;
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
</style>
