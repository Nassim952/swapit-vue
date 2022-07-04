<template>
  <div id="Filtre" class="filter-items">
    <span class="cat-filter">{{title}}</span>
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
      <li v-for="(value,key) in resource" :key="key" active-class="active" tag="button" exact class="side-btn list-filters" :ref="`${title}-${key}`">
        <div class="link-container" @change="updateFilter">
          <input class="check-filter" type="checkbox" :value="value.id" v-model="selectedFilters">
          <span class="filter-name">
                {{value.name}}
          </span> 
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
      selectedFilters: [],
    }),
    methods: {
      updateFilter: function() {
        this.updateFilters(this.$data.selectedFilters, this.$props.title);
      },
      checked(option) {
        return this.selectedFilters.includes(option);
      }

    },
    
  };
</script>

<style scoped>
/* body */
/* title */
.cat-filter{
  color: #fb5d19;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 20px;
  border-bottom: 2px solid;
  padding-bottom: 10px;

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

.link-container{
  display: flex;
}

.list-filters{
  list-style: none;
}

.filter-name{
  font-size: 12px;
  margin-left: 10px;
}

.filter-items {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 10px;
  background-color: #ffffff;
  margin-bottom: 30px;
  box-shadow: 0 10px 15px rgb(0 0 0 / 10%);
}
</style>