<template>
    <div class="sidebar">
        <div class=""><button class="btn-style button_slide slide_left" v-b-toggle.sidebar-1>Recherche avancée</button>  </div>
           
            <b-sidebar id="sidebar-1" title="Sidebar" shadow>
                <SearchFilter/>
            </b-sidebar>
    </div>
</template>

<script>
import SearchFilter from "./SearchFilter.vue";
  export default {
    components: {
    SearchFilter
    },
}
</script>

<style scoped>
.sidebar {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}

.btn-style{
    background: none;
	color: #FF5D19;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;;
}

.button_slide {
  border: 2px solid #FB5D19;
  padding: 15px 15px;
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

#outer {
  width: 364px;
  margin: 50px auto 0 auto;
  text-align: center;
}

</style>