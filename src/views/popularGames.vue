<template>
    <div v-if="home">
        <div v-if="resources">
            <PuSkeleton height="250px" :count=20>
                <GameLayer v-for="(game, key) in resources" :key="game.id + key" :game="game" :inWishList="addedWish(game)" :inOwnList="addedOwn(game)" />
            </PuSkeleton>
        </div>
    </div>
</template>

<script>
import GameLayer from "../components/Game/GameLayer.vue";
import { Igdb } from "../lib/Services/Igdb";
import { User } from "../lib/Services/User";

export default {
    components: {
        GameLayer,
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
        UserWishList: [],
        UserOwnList: [],
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
        addedWish(game) {
            return this.$data.UserWishList.some(e => e === game.id)
        },
        addedOwn(game) {
            return this.$data.UserOwnList.some(e => e === game.id)
        },
        async getUser() {
            const providerUser = new User();

            providerUser.auth.me().then(response => {
                if (response) {
                    response?.ownGames ?? []
                    var dataOwnList = response?.ownGames ?? []
                    if (Array.isArray(dataOwnList)) {
                        this.$data.UserOwnList = dataOwnList
                    }
                    response?.wishGames ?? []
                    var dataWishList = response?.wishGames ?? []
                    if (Array.isArray(dataWishList)) {
                        this.$data.UserWishList = dataWishList
                    }
                }
            }).catch(() => {
                this.$fire({
                    title: 'Erreur',
                    text: 'Une erreur est survenue',
                    type: 'error'
                })
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