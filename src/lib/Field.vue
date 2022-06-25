<template>
  <component v-bind:is="as" :type="type" :name="name" :value="value" v-model="value" :id="name">
      <slot></slot>
  </component>
</template>

<script>
  import Input from "../components/Inputs/Input.vue" 
  export default {
    components:{
      Input
      },
    name: "Field",
    props: {
      name: {
          type: String,
          required: true,
      },
      as: {
          type: String,
          default: "Input",
      },
      type: {
          type: String,
          default: "text",
      },  
      error:{
        type: String,
        default:'',
      },
    },
    inject: ['values'],
    created: function () {
      this.$data.value = this.values?.[this.$data.name] ?? '';
    },
    computed: {
      value: {
        get() {
            return this.$data.value;
        },
        set(field) {
            // updateFieldValue({
            //   name: this.$props.name,
            //   value: field.value
            // })
          this.$emit('input', {
            name: this.$props.name,
            value: field.value
            });
        },
      },
    },
    methods: {
      handleChange: function (field) {
        // var value = field.value;
        this.$data.value = field.value;
        console.log("value: "+ field.value)
        
      },
    },
  };
</script>

<style scoped>
</style>