<template>
  <div class="input-container">
    <label class="noActive"  :class="[{ active: isActive }]">
      <span>{{name}}</span>
    </label>
    <input :type="type" :name="name" class="form__input" v-model="value" :id="name" required :placeholder="placeholder" autocomplete="off" @focus="changeActive" @blur="changeActive"/>
  </div>
</template>

<script>
export default {
  name: "Input",
  props:{
    name: {
          type: String,
          required: true,
    },
    type: {
          type: String,
          default: "text",
    },
    variant: {
      type: String,
      default: 'white',
      validator: (val) => ["white", "black",].includes(val),
    },
    placeholder:{
      type: String,
      default:'',
    },
    initValue:{
      type: String,
      default:' ',
    },
  },
  data() {
    return {
      isActive: false,
      value: '',
    }
  },
  // created() {
  //   this.$data.value = this.$props.value
  // },
  methods: {
      handleChange: function () {
        // this.$emit('input', event.target);
        // console.info(event.target)
      },
      changeActive() {
        console.log(this.$data.value)
        if(this.$data.value) {
          this.$data.isActive = true
        } else {
          this.$data.isActive = !this.$data.isActive
        }

      },
    },
  };
</script>

<style scoped>;
 .input-container {
	position:relative;
	margin-bottom:25px;
}
.noActive {
	position:absolute;
	top:0px;
	left:0px;
  /* padding: 20px; */
	font-size:16px;
	color:rgb(95, 94, 93);	
	transition: all 0.5s ease-in-out;
}

.active {
  top: -10px;
  font-size: 12px;
  color: #FF5D19;
}

.input-container input { 
  border:0;
  border-bottom:1px solid #555;  
  background:transparent;
  width:100%;
  padding:8px 0 5px 0;
  font-size:16px;
  color:#C9C9C9;
}
.input-container input:focus { 
 border:none;	
 outline:none;
 border-bottom:1px solid #FF5D19;
 top: -60px;

}

/* .input-container input:focus {
} */
</style>