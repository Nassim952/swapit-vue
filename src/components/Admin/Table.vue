<template>
  <div>
    <transition name="modal">
        <modal v-if="isOpenModal" :data="modalData"> 
        </modal>
    </transition>

    <div>
      <div>
        <div>
          <div class="p-4">
            <p class="h3 m-0 text-center">UTILISATEURS 
            </p>
            <p class="m-0 text-center">{{datas.length}} {{choice}}</p>            
          </div>

          <table class="table table-striped table-hover m-0">
            <thead>
              <tr>
                <slot></slot>
              </tr>
            </thead>

            <tbody>
              <Card v-for="(value,key) in datas" :key="value.id+key" :data='value' @click="openModal(user)" />
            </tbody>
          </table>
        

          <div class="p-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between">
            <div class="d-flex justify-content-between">
              <a v-if="page > 0" @click="retrieveList(page-1)" class="btn btn-outline-dark" role="button">
                <span class="transition duration-200 ease-in-out material-icons text-base">
                  précédent
                </span>
              </a>
              
              <a @click="retrieveList(page+1)" class="btn btn-outline-dark" role="button">
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
</template>

<script>
  import { User } from '../../lib/Services/User';
  import { Exchange } from '../../lib/Services/Exchange';
  import Card from "./Card.vue";
  import Modal from './functionalities/Modal.vue'

  export default {
    name: "TableHead",
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
    closeEdit: function() {
        this.$data.showEdit = false
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
        openModal: this.openModal,
        closeModal: this.closeModal,
        deleteData: this.deleteData,
      };
    },
  };
</script>
<style scoped>
  .disabled{
    pointer-events: none;
    cursor: default;
  }

</style>