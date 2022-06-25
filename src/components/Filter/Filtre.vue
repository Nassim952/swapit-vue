<template>
  <div id="Filtre" class="menu-items">
    <h1>{{title}}</h1>
    <Toggle>
      <!-- <div class="filter">
        <h1>{{title}}</h1>
        <div class="link-container" @change="updateFilter">
          <li v-for="(option,key) in resource" :key="title+key">
            <input type="checkbox" :option="option.name" v-model="checkedFilters">
            <label :class="checked(option)? ' label_checked' : 'label_unchecked'">
              <h2>
                {{option.name}}
              </h2>   
            </label>
          </li>
        </div>
      </div> -->
      <li v-for="(value,key) in resource" :key="key" active-class="active" tag="button" exact class="side-btn" :ref="`${title}-${key}`">
        <div class="link-container" @change="updateFilter">
          <input type="checkbox" :id="key" name="scales" :value="value.id" v-model="checkedFilters">
          <h2>
                {{value.name}}
          </h2> 
        </div>
      </li>
    </Toggle>
  </div>
</template>

<script>
  import Toggle from "../Toggle/Toggle.vue";
  export default {
    name: "Filtre",
      components: {
      Toggle,
    },
    props:{
      title: {
        type: String,
        require: true
        },
      resource: Array, 
    },
    inject: ['updateFilters'],
    data: () => ({
      searchQuery: null,
      mobile: false,
      checkedFilters: [],
    }),
    methods: {
      updateFilter: function() {
        this.updateFilters(this.$data.checkedFilters, this.$props.title);
      },
      checked(option) {
        return this.checkedFilters.includes(option);
      }

    },
    
  };
</script>

<style scoped>
/* body */
/* title */
h1{
  color: #aa8e8d;
  text-align: center;
  font-size: 32px;
  font-weight: 400;
}
/* tasks */
.filter{
  width: 300px;
  height: 405px;
  position: absolute;
  top: 20%;
  left: 0px; 
  right: 0px;
  margin: 0px auto;
}

</style>