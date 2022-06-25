<template>
    <div class="profile-container">
        <div class="profile-bloc user-info">
            <div class="profile-img"><img src="../assets/images/user.svg" alt="profile"></div>
            <div class="profile-name">Profile</div>
            <div class="profile-note">3</div>
            <div class="profile-nbr-swap"><span>5</span><img src="../assets/images/swap.png" alt="swap"></div>
        </div>
        <div class="profile-bloc user-ownlist">
            <h3>Liste de jeux possédés</h3>
            <div class="profile-list-container">
                <div>Jeux 1</div>
            </div>
        </div>
        <div class="profile-bloc user-wishlist">
            <h3>Liste de jeux souhaités</h3>
            <div class="profile-list-container">
                <div>Jeux 1</div>
            </div>
        </div>
    </div>
</template>

<script>
    /* import GameExchange from "../components/Exchange/Game_Exchange.vue";
 */
    export default {
        components: {
            /* GameExchange */
        },
    }
</script>

<style>
    .profile-container{
        display: flex;
        padding: 20px;
        background-color: rgb(240, 240, 240);
        justify-content: space-between;
        height: 800px;
    }

    .profile-bloc{
        background-color: rgb(255, 255, 255);
        border-radius: 15px;
        padding: 30px;
        overflow: hidden;
    }

    .user-info{
        width: 18%;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 100px 0px;
    }

    .profile-img img{
        width: 150px;
    }

    .profile-name{
        color: rgb(255, 94, 0);
        font-size: 32px;
    }

    .profile-nbr-swap img{
        width: 50px;
        height: 50px;
    }

    .profile-nbr-swap{
        display: flex;
        align-self: center;
        align-items: center;
        width: 50%;
        justify-content: space-around;
        font-size: 70px;
        color: rgb(255, 94, 0);
    }

    .user-ownlist{
        width: 38%;
        background-image: url('../assets/images/check.svg');
        background-size: 100px;
        background-repeat: no-repeat;
        background-position: 90% 2%;
    }

    .user-wishlist{
        width: 38%;
        background-image: url('../assets/images/heart.svg');
        background-size: 80px;
        background-repeat: no-repeat;
        background-position: 90% 2%;
    }

    .profile-bloc > h3{
        color: rgba(41, 100, 124);
    }

    .profile-list-container{
        background-color: rgb(248, 248, 248);
        padding: 30px;
        margin-top: 40px;
        overflow: scroll;
    }
</style>