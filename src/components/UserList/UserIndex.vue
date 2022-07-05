<template>
<div>
    <search-user></search-user>
    <list-user></list-user>
</div>
</template>

<script>
import ListUser from './user/ListUser.vue'
import SearchUser from './functionalities/SearchUser.vue'

export default {
    name: 'UserIndex',
    components: {
        ListUser,
        SearchUser,

    },

}
</script>

<style>

</style>
