<template>
    <div>
        <div class="navbar-ctn">
            <div class="flex-logo">
                <router-link to="/">
                    <div class="logo">
                        <img src="../../assets/images/logo.svg" width="60" height="30">
                        <img src="../../assets/images/logo-text.svg" width="60" height="30">
                    </div>
                </router-link>
                <router-link to="/games" class="nav-link">Games</router-link>
            </div>
            <div>
                <div id="SearchInput">
                    <input class="search-input" v-model="searchQuery" @input="refreshRessource">
                        <div v-if="!home">
                        <div v-show ="searchQuery" v-for="(game,key) in resultQuery" :key="game.name+key">
                            {{game.name}}
                        </div>
                    </div>
                </div>
            </div>
        
            <div class="picto-ctn">
                <router-link to="/signin">Inscription</router-link>
                <router-link to="/signup">Connexion</router-link>
                <router-link to="/owngameslist"><img class="picto-nav" src="../../assets/images/check.svg" width="25" height="20"></router-link>
                <router-link to="/wishgameslist"><img class="picto-nav" src="../../assets/images/heart.svg" width="20" height="20"></router-link>
                <router-link to="/subscription"><img class="picto-nav" src="../../assets/images/mail.svg" width="20" height="20"></router-link>
                <button class="logout" v-on:click="logout"><img class="picto-nav" src="../../assets/images/logout.svg" width="20" height="20"></button>
            </div>
        </div>
        <div class="sidebar">
            <b-button v-b-toggle.sidebar-1>Recherche avancée</b-button>    
            <b-sidebar id="sidebar-1" title="Sidebar" shadow>
                <div id="SearchFilter">
                    <div id="Filtres" class="menu-items">
                    <ul v-for="(filter,title) in filters" :key="title">  
                        <div id="Filtre" class="menu-items">
                            <slot>
                            <h1>{{title}}</h1>
                            </slot>
                            <Toggle>
                                <li v-for="(value,key) in filter" :key="key" active-class="active" tag="button" exact class="side-btn">
                                    <div class="link-container" >
                                        <input type="checkbox" :id="value.name+key" :value="value.id" :name ="title" @change="UpdateFilter">
                                        <label for="scales" class ="filter_value">{{value.name}}</label>
                                    </div>
                                </li>
                            </Toggle>
                        </div>
                    </ul>
                </div>
            </div>
            </b-sidebar>
        </div>
        
        <div v-if="home">
            <div class="scroll-overflow" v-if="resources">
                <GameLayer v-for="(game,key) in resources" :key="game.id+key" :game="game"/>
            </div>
        </div>
    </div>
</template>

<script>
    import GameLayer from "../Game/GameLayer.vue";
    import Toggle from "../Toggle/Toggle.vue";

    // import SearchFilter from "../Filter/SearchFilter.vue";
    export default {
        components: {
            // SearchFilter,
            GameLayer,
            Toggle
        },
        props: {
            home: {
                type: Boolean,
                default: true,
            },
        },
    data: () => ({
        selectedFilters: {
        genres: [],
        platforms: [],
        modes: [],
        },
        searchQuery: null,
        resources: [],
        filters: {
        genres: [],
        platforms: [],
        modes: [],
    }
    }),
    async created() {
        this.generateCategories()
        this.refreshRessource()
    },
    methods:{
        ressourceFormater(resources) {
        if(resources.length >10) {
            return resources.slice(0,10)
            } else {
                return resources
            }
        },
        logout:() => {
            localStorage.clear();
        },
        refreshRessource() {
            var filters =''
            filters = this.$data.selectedFilters.genres ? filters +`${(this.$data.selectedFilters.genres.map((genre, key) => {
                return `&genres[${key}]=${genre}` 
            })).join('')}` : ''
            filters = this.$data.selectedFilters.platforms ? filters +`${(this.$data.selectedFilters.platforms.map((platform, key) => {
                return `&genres[${key}]=${platform}` 
            })).join('')}` : ''
            filters = this.$data.selectedFilters.modes ? filters +`${(this.$data.selectedFilters.modes.map((mode, key) => {
                return `&genres[${key}]=${mode}` 
            })).join('')}` : '' 
            console.log(filters)
            if (this.$data.searchQuery) {

            fetch(`https://localhost/api/games.json?page=1${filters}&name=${this.searchQuery}`).then(response => response.json()).then(data => {
            this.$data.resources = data;
            
            }).catch(err => {
                console.error(err)
            })
        } else {
            console.log('toto1')
            fetch(`https://localhost/api/games.json?popular${filters}`).then(response => response.json()).then(data => {
            this.$data.resources = data;
        
            }).catch(err => {
                console.error(err)
            })          
        }
      },
      generateCategories() {
          fetch("https://localhost/api/genres.json?properties%5B%5D=name&properties%5B%5D=id").then(response => response.json()).then(data => {
            // console.info(data.members)
         this.$data.filters.genres = data;

          
        }).catch(err => {
          console.error(err)
        })
        fetch("https://localhost/api/platforms.json?properties%5B%5D=name&properties%5B%5D=id").then(response => response.json()).then(data => {
            console.info(data)
            
          this.$data.filters.platforms= data;
          
        }).catch(err => {
          console.error(err)
        })
          fetch("https://localhost/api/modes.json?properties%5B%5D=name&properties%5B%5D=id").then(response => response.json()).then(data => {
            console.info(data)
            this.$data.filters.modes = data;
    
        }).catch(err => {
          console.error(err)
        }) 
      },
          UpdateFilter(e){
           
       if (e.target.name == "genres") {  
          this.updateSelectedGenres(e.target.value)

          
        } else if (e.target.name == "platforms") {
            this.updateSelectedPlatforms(e.target.value)
        } else if (e.target.name == "modes") {
            this.updateSelectedModes(e.target.value)
        }
        this.refreshRessource()
      },
      updateSelectedGenres(genre_id) {
          if (this.$data.selectedFilters.genres.includes(genre_id)){
             this.$data.selectedFilters.genres = this.$data.selectedFilters.genres.filter(e => e !== genre_id)
          }
          else {
              this.$data.selectedFilters.genres.push(genre_id)
          }
      },
      updateSelectedPlatforms(platform_id) {
           if (this.$data.selectedFilters.platforms.includes(platform_id)){
             this.$data.selectedFilters.platforms = this.$data.selectedFilters.platforms.filter(e => e !== platform_id)
          }
          else {
              this.$data.selectedFilters.platform.push(platform_id)
          }
      },
      updateSelectedModes(mode_id) {
           if (this.$data.selectedFilters.modes.includes(mode_id)){
             this.$data.selectedFilters.modes = this.$data.selectedFilters.modes.filter(e => e !== mode_id)
          }
          else {
              this.$data.selectedFilters.modes.push(mode_id)
          }
      },
    },
 
    }
</script>

<style>
.scroll-overflow{
    display: flex;
    overflow: auto;
    margin-bottom: 50px;
}
.flex-logo{
    display: flex;
    width: 200px;
    justify-content: space-around;
    align-items: center;
}
.sidebar {
    margin-top: 10px;
}
.navbar-ctn{
    display: flex;
    height: auto;
    background-color: white;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    flex-wrap: wrap;
}
.picto-ctn{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.picto-nav{
    margin-left: 10px;
}

.search-input{
    background-color: rgba(41, 100, 124, 0.2);
    color: rgba(41, 100, 124);
    border-radius: 5px;
    border: none;
    width: 300px;
    height: 15px;
    padding: 5px;
}
.search-input:focus{
    outline: rgba(41, 100, 124) 2px solid;
}





.title {
    color: white;
    font-size: 24px;
    margin-top: 10px;
}

.filter_value {
    color: black;
    font-size: 10px;
    margin-top: 5px;
}

.menu-items {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    margin-left: 6px;
}

.menu-items > * {
    margin-top: 60px;
}

.side-btn {
    border: none;
    padding: 16px 0px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: white;
    background-color: transparent;
}

.side-btn:focus {
    outline: none;
}

.side-btn.active {
    position: relative;
    background-color: white;
    color: teal;
    font-weight: 600;
    margin-left: 10px;
    border-radius: 30px 0 0 30px;
}

.side-btn.active::before {
    top: -30px;
}

.side-btn.active::after {
    bottom: -30px;
}

.side-btn.active::before, .side-btn.active::after {
    position: absolute;
    content: "";
    right: 0;
    height: 30px;
    width: 30px;
    background-color: white;
}

.side-btn.active .link-container::before {
    top: -60px;
}

.side-btn.active .link-container::after {
    bottom: -60px;
    z-index: 99;
}

.side-btn.active .link-container::before, .side-btn.active .link-container::after {
    position: absolute;
    content: "";
    right: 0px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: teal;
}
.logout{
    border: none;
    background-color: transparent;;
}
.logo{
    display: flex;
    margin-right: 2rem;
    margin-left: 1rem;
}
</style>