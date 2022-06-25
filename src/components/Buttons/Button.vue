<template>
  <div class="btn-wrapper">
    <component v-bind:is="as" aria-busy="" class="btn button_slide slide_left" v-on:click="onClick">
      <span>{{ title }}</span>
    </component>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    title: String,
    as: {
      type: String,
      default: "button",
      validator: (val) => ["a", "button",].includes(val),
    },
    onClick: {
      type: Function,
      require:true
    },
  },
  methods: {
    onCtrlClick: () => console.log("Alt click detected"),
  },
};
</script>

<style scoped>

.btn-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
  text-align: center;
  cursor: pointer;
  color: #FF5D19;
  transition: background-color 0.3s ease-in-out;
  position: relative;
}

.btn:hover {
  background-color: #FF5D19;
  color: #fff;
}

.button_slide {
  border: 2px solid #FB5D19;
  padding: 10px 10px;
  border-radius: 7px;
  display: inline-block;
  font-size: 16px;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: inset 0 0 0 0 #FB5D19;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
}

.slide_left:hover {
  box-shadow: inset 0 0 0 40px #FB5D19;
  color: white;
  border-radius: 7px;
}

</style>