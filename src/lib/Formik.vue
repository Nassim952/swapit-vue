<template>
    <div @submit.prevent="handleSubmit" @keydown.enter.prevent="handleSubmit" class="form" @input="updateFieldValue">
      <div class="form_description">
        <h1 class="h3 mb-3 fw-normal"><span> {{title}}</span></h1>
        <small> {{description}}</small>
      </div>
      
      <slot v-bind="{handleSubmit, errors, with_label, values}" :values="values" ></slot>
    <PulseLoader :loading="isLoading" v-if="isLoading">
      
    </PulseLoader>
    </div>
</template>

<script>

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  name: "Formik",
  components: {
     PulseLoader
    },
  props: {
    initialValues: {Object, default: () => ({})},
    title: {
      type: String, 
      default: ''
    },
    description:{
      type: String, 
      default: ''
    },
    onSubmit: {
      type: Function,
      require: true,
    },
    validator: {
      type: Object,
      require: true,
    },
     with_label: {
       type: Boolean,
       default: false
      },
  },
  data: function () {  
    return {
      values: this.$props.initialValues,
      errors:[],
      isLoading: false,
      }
  },
  provide() {
    return {
      values: this.$data.values ?? [],
    }
  },
  methods: {
    handleSubmit: function () {
      this.$data.isLoading = true;
      const data = this.$data.values;
      this.$props.validator
      .validate(data, {abortEarly: false})
      .then(() => {
        this.$data.errors = {};
        this.$props.onSubmit(data); 
        this.$data.isLoading = false;
      })
      .catch(err => {
        this.$data.errors = {};
        if(err.inner){
          err.inner.forEach(error => {
            this.$data.errors[error.path] = error.message;
          });
        }
        this.$data.isLoading = false;
      });
      // this.$data.isLoading = false;
    },
    updateFieldValue({target}) {
      const {name, value} = target;
      this.$data.values[name] = value;
      console.log(this.$data.values)
    }
  },
};
</script>

<style scoped>
.form_description{
  margin-bottom: 3rem;
  text-align: center;

}
.form_description h1 span+ .form_description h2{
  margin-left: auto;
  margin-right: auto;
}
.form {
  width: 50%;
  margin: auto auto;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  background-color: none;
}

.form > input:focus {
outline: none;
}
</style>