<template>
    <div v-if="home">
        <div v-if="resources">
            <GameLayer v-for="(game, key) in resources" :key="game.id + key" :game="game" />
        </div>
    </div>
</template>

<script>
import GameLayer from "../components/Game/GameLayer.vue";
import {Igdb} from "../lib/Services/Igdb";

export default {
    components: {
        GameLayer
    },
    props: {
        home: {
            type: Boolean,
            default: true
        },
    },
    data: () => ({
        searchQuery: null,
        resources: [],
        selectedFilters: {},
        actifSearch: false,
    }),
    created() {
        if (this.$props.home) {
            this.refreshRessource()
        }
    },
    methods: {
        async refreshRessource() {
            var provider = new Igdb()
            // console.log(this.$data.selectedFilters)
            var filters = this.$data.selectedFilters
            // var filters = this.$data.selectedFilters

            // console.log('filters: '+ filters)

            // "Steep" 19554 
            // "Mass Effect: Andromeda" 7349
            filters.name = this.$data.searchQuery ?? ""

            // console.log(filters)
            provider.getPopulars(null, null, filters).then(response => { this.$data.resources = response })
            //   console.log( this.$data.resources)
            // provider.getPopulars(null, this.$data.selectedFilters).
            // provider.getPopulars()
            // if (this.$data.searchQuery) {
            //     fetch(`https://localhost/api/games.json?page=1&name=${this.searchQuery}&${this.formatedFilters()}`)
            //     .then(response => response.json())
            //     .then(data => {
            //         this.$data.resources = data;
            //     })
            //     .catch(err => {
            //         console.error(err)
            //     })
            // } else {
            //     console.log('toto1')
            //     fetch(`https://localhost/api/games.json?popular${this.formatedFilters()}`)
            //     .then(response => response.json())
            //     .then(data => {
            //         this.$data.resources = data;
            //     }).catch(err => {
            //         console.error(err)
            //     })          
            // }
        },
        formatedFilters() {
            var filters = filters = this.checkEmptySelectedFilter() ? '&' : '';
            console.log('filter : ' + filters)
            if (filters) {
                if (!this.checkEmptySelectedFilter('genres')) {
                    filters = this.$data.selectedFilters.genres ? (filters != '' ? filters + "&" : filters) + `${(
                            this.$data.selectedFilters.genres.map((genre, key) => `genres[${key}]=${genre}`)
                        )
                            .join('&')}` : filters
                    console.log(filters)
                }
                if (!this.checkEmptySelectedFilter('platforms')) {
                    filters = this.$data.selectedFilters.platforms ? (filters != '' ? filters + "&" : filters) + `${(
                            this.$data.selectedFilters.platforms.map((platform, key) => `platforms[${key}]=${platform}`)
                        ).join('&')}` : filters
                    console.log(filters)
                }
                if (!this.checkEmptySelectedFilter('modes')) {
                    filters = this.$data.selectedFilters.modes ? (filters != '' ? filters + "&" : filters) + `${(this.$data.selectedFilters.modes.map((mode, key) => `modes[${key}]=${mode}`)
                        ).join('&')}` : filters
                    console.log(filters)
                }
                console.log(filters)
            }
            console.log(filters)
            return filters
        },
        updateFilters(filters, categorie) {
            this.$data.selectedFilters[categorie] = filters;
            if (this.checkEmptySelectedFilter(categorie)) {
                delete this.$data.selectedFilters[categorie]
            }
            this.refreshRessource()
            console.log(this.$data.selectedFilters)
        },
        checkEmptySelectedFilter(categorie = null) {

            if (categorie) {
                console.log(this.$data.selectedFilters?.[categorie])
                console.log(this.$data.selectedFilters?.[categorie]?.length)
                // if(this.$data.selectedFilters?.[categorie]){
                return this.$data.selectedFilters?.[categorie]?.length === 0
                // }

            } else if (!this.$data.selectedFilters) {
                return true
            }

        },
        updateQuery(value) {
            this.$data.searchQuery = value
            this.refreshRessource()
        }
    },
    provide() {
        return {
            updateFilters: this.updateFilters,
        }
    },
}
</script>

<style>
</style>