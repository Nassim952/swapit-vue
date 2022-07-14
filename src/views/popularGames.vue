<template>
    <div v-if="home">
        <div v-if="resources">
            <GameLayer v-for="(game, key) in resources" :key="game.id + key" :game="game" :inList="added(game)" />
        </div>
    </div>
</template>

<script>
import GameLayer from "../components/Game/GameLayer.vue";
import { Igdb } from "../lib/Services/Igdb";
import { User } from "../lib/Services/User";

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
        UserList: [],
    }),
    created() {
        this.refreshRessource()
        this.getUser();
    },
    methods: {
        async refreshRessource() {
            var provider = new Igdb()
            var filters = this.$data.selectedFilters
            filters.name = this.$data.searchQuery ?? ""
            provider.getPopulars(null, null, filters).then(response => { this.$data.resources = response })
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
                return this.$data.selectedFilters?.[categorie]?.length === 0
            }
            return true
        },
        updateQuery(value) {
            this.$data.searchQuery = value
            this.refreshRessource()
        },
        added(game) {
            // this.$data.UserList = [];
            // console.log(this.$data.UserList)
            return this.$data.UserList.some(e => e === game.id)
        },
        async getUser() {
            const providerUser = new User();

            providerUser.auth.me().then(response => {
                if (response) {
                    response?.ownGames ?? [] + response?.wishGames ?? []
                    var data = response?.ownGames ?? [] + response?.wishGames ?? []
                    if (Array.isArray(data)) {
                        this.$data.UserList = data
                    }
                }
            }).catch(error => {
                console.log(error)
            })
        },
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