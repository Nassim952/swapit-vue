<template>
  <div>
        <transition name="modal">
            <modal v-if="isOpenModal" :data="modalData"> 
            </modal>
        </transition>
        <div>
            <div class="container  mx-auto pb-6 px-4  sm:px-8 ">
                <div class="py-8 md:py-4">
                    <div class="my-2 flex sm:flex-row flex-col">
                    </div>
                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-6 overflow-x-auto ">
                    <div class="flex  justify-between ">
                        <div >
                            <p class="text-3xl font-bold">USERS 
                                <span class="material-icons">
                                        people
                                </span>
                            </p>
                            <p class="text-gray-400 mt-2 mb-5">{{datas.length}} {{choice}}</p>            
                        </div>
                    </div>
                    <div class="inline-block min-w-full shadow md:shadow-xl md:pl-4 pt-6 rounded-lg overflow-hidden ">      
                    <slot></slot>
                        <tbody>
                          <transition-group name='list' >
                            <Card  v-show="!isFilter" v-for="(value,key) in datas" :key="value.id+key" :data='value' @click="openModal(user)" />
                          </transition-group>
                        </tbody> 
                        <div class="px-5 py-5 bg-white  flex flex-col xs:flex-row items-center xs:justify-between">
                            <div class="flex items-center space-x-5">
                                    <a v-if="page > 0" @click="retrieveList(page-1)"  class="flex items-center px-4 py-2 text-gray-800 cursor-pointer  rounded-md">
                                      <span class="transition duration-200 ease-in-out material-icons text-base">
                                        back
                                      </span>
                                    </a>
                                    <!-- <a v-for="(singlePage,index) of pages" :key="index" @click="retrieveList(singlePage)" :class="{'border-t-2 border-blue-500':singlePage==1}" class="transition duration-500 ease-in-out border-t-2 hover:border-blue-300 px-4 py-2 text-gray-700  cursor-pointer "> 
                                        {{singlePage}}
                                    </a> -->
                                    <a @click="retrieveList(page+1)" class="px-4 py-2 font-bold  cursor-pointer rounded-3xl "  >
                                        <span :class="{'disabled':entries < 10}" class="transition duration-200 ease-in-out material-icons text-base font-bold">
                                            forward
                                        </span>
                                    </a>
                                  </div>
                                  <span class="text-sm font-md mt-5 font-bold xs:text-sm text-gray-400">
                                      Showing {{entries == 0 ? 1 : entries}} to  of {{totalEntries}} 
                                  </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import { User } from '../../lib/Services/User';
  import { Exchange } from '../../lib/Services/Exchange';
  import Card from "./Card.vue";
  import Modal from './functionalities/Modal.vue'

  export default {
    name: "Table",
    components: {
      Card,
      Modal,
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
      openModal(data) {
        // this.modalData = user;
        this.modalData={...data}
        this.isOpenModal = true;
      },
      retrieveList(page) {
        this.$emit("retrieveList", page);
      },
      closeModal() {
        this.isOpenModal = false;
      },
      deleteData: function(id) {
      if (this.choice == 'users') {
          const provider = new User()
          provider.delUser(id)
          .then(response => { console.log(response); this.retrieveList()})
          .catch(err => {
              this.$data.datas = null;
              console.error(err)
          })
      } else {
          const provider = new Exchange()
      
          provider.delExchange(id)
          .then(response => {console.log(response); this.retrieveList()})
          .catch(err => {
              this.$data.datas = null;
              console.error(err)
          })
      }
    },
    closeEdit: function() {
        this.$data.showEdit = false
    },
    },
    computed: {
      titles: function () {
        let titles = []
        console.log(this.$props.datas[0])
        for (const [ key] of Object.entries(this.$props.datas[0])) {
            titles.push(key)
        }
        console.log(Object.entries(this.$props.datas[0]))
        return titles
      },
      entries:function(){
        return (this.page - 1) * 10 + this.datas.length;
      },
    },
    provide() {
      return {
        openModal: this.openModal,
        closeModal: this.closeModal,
        deleteData: this.deleteData,
      };
    },
  };
</script>
<style scoped>
  th{
          width: 8%;
    };

  .disabled{
    pointer-events: none;
    cursor: default;
  }
  /* .buttonEdit {
    background-color: #FFBF00;
    color: #fff;
    border: none;

    margin-right: 5px;
    padding: 3px;
  }

  .buttonDelete {
    background-color: #D8214E;
    color: #fff;
    border: none;


    padding: 3px;
  }

  th {
    background-color: #6C809A;
    color: #fff;
  } */
</style>