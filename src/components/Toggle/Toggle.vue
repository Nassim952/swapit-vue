<template>
  <div class="toggle">
    <transition name="fade-toggle">
      <div v-show="showSection" class="body" id="toggle">
          <slot></slot>
      </div>
    </transition>
   
    <div class="icon-wrapper">
      <a v-if="showSection" @click="toggle" title="arrow icons" class="my-icon">
        <img class="icon"
        src="../../assets/icones/arrow-up.png"
        alt="Grapefruit slice atop a pile of other slices">
      </a>
      <a v-else @click="toggle" title="arrow icons" class="my-icon">
        <img class="icon"
        src="../../assets/icones/arrow-down.png"
        alt="Grapefruit slice atop a pile of other slices">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toggle",
  data() {
    return {
      showSection: false, 
      toggleIcon: "../../assets/icones/arrow-up.png",
    }
  },
  methods: {
    toggle() {
     this.showSection = !this.showSection
    }
    },
};
</script>

<style scoped>

.toggle {
transition: all .3s linear 0s;
}

.icon-wrapper {
  margin: auto;
  width: 100px; 
}

.icon {
    width: 2rem;
    height: 2rem;
}

.fade-toggle-enter-active {
  transition: all .2s ease;
}

.fade-toggle-leave-active {
  transition: all .2s ease;
}

.fade-toggle-enter, .fade-toggle-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

</style>