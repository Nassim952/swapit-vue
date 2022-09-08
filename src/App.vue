<template>
    <div id="app">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@500&display=swap" rel="stylesheet">
      <Navbar/>
      <router-view />
      <div>
        <Foot/>
      </div>
    </div> 
    
</template>


<script>
import Navbar from "./components/Navbar/Navbarold.vue";
import Foot from "./components/Navbar/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar, Foot
  },
  created(){
  },
  provide() {
    return {
      router: this.$router,
    };
  }
};
</script>

<style>
#app{
  background: white;

}
a{
  text-decoration: none;
}
body{
  font-family: 'Montserrat Alternates', sans-serif !important; 
}
</style>