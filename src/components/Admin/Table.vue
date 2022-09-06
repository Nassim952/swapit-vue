<template>
  <div class="container">
    <div class="row">
        <!-- <transition name="slide-fade">
          <modal v-if="isOpenModal" :data="modalData" :choice="choice"> 
          </modal>
        </transition> -->
        <p class="h3 m-0 text-center">{{datas.length}} {{choice}}</p> 
          <div class="col-lg-12">
            <div class="main-box clearfix">
              <div class="table-responsive">
                <table class="table user-list">


              <thead>
               
                  <slot></slot>
                
              </thead>
                <transition v-if="choice == 'Utilisateurs'" name="slide-fade" appear appear-class="slide-fade-enter" >
                  <tbody v-if="datas">
                      <UserCard v-for="(value,key) in datas" :key="value.id+key" :data='value' @click="openModal(value)" />
                  </tbody>
                  </transition>
                  <transition v-else name="slide-fade" appear appear-class="slide-fade-enter" >
                  <tbody v-if="datas" >
                      <ExchangeCard v-for="(value,key) in datas" :key="value.id+key" :data='value' @click="openModal(value)" />
                  </tbody>
                </transition>
              
            </table>
          

            <div class="p-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between">
              <div class="d-flex justify-content-between">
                <a @click="retrieveList(page-1)" class="btn btn-outline-dark prev" role="button">
                  <span :class="{'disabled':page ==1}" class="transition duration-200 ease-in-out material-icons text-base">
                    précédent
                  </span>
                </a>
                
                <a @click="retrieveList(page+1)" class="btn btn-outline-dark next" role="button">
                    <span :class="{'disabled':entries < 10}" class="transition duration-200 ease-in-out material-icons text-base font-bold">
                      suivant
                    </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

// <script>
//   import { User } from '../../lib/Services/User';
//   import { Exchange } from '../../lib/Services/Exchange';
  import UserCard from "./UserCard.vue";
   import ExchangeCard from "./ExchangeCard.vue";
  // import Modal from './functionalities/Modal.vue'

  export default {
    name: "TableHead",
    components: {
      UserCard,
      ExchangeCard,
      // Modal
    },
    props: {
      datas: {
        type: Array,
      },
      choice: {
        type: String,
      },
      page: {
        type: Number,
      },
      close
    },
    data() {
      return {
        isOpenModal: false,
        modalData: {},
        usersdata: [],
        totalEntries: 0,
        total_pages: 0,
        pages: [],
        isFilter: false,
        filter: {
          name: "",
          email: "",
          role: "",
        },
      };
    },
    methods: {
      retrieveList(page) {
        this.$emit("retrieveList", page);
      },  
    },
    computed: {
      titles: function () {
        let titles = []
        for (const [ key] of Object.entries(this.$props.datas[0])) {
            titles.push(key)
        }
        return titles
      },
      entries:function(){
        return (this.page - 1) * 10 + this.datas.length;
      },
    },
    provide() {
      return {
        // openModal: this.openModal,
        // closeModal: this.closeModal,
        deleteData: this.deleteData,
      };
    },
    inject: ["openModal", "closeModal"],
  };
</script>
<style scoped>
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
.prev{
  left: 0;
}
.next{
  right: 0;
}

</style>