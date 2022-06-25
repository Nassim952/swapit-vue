<template>
    <div class="container-card">
        <div class="result-card">
            <div class="info-user">
                <div class="user-img">
                    <img src="../../assets/images/user.svg" width="80" height="80">
                </div>
                <div class="pseudo">Pseudo</div>
            </div>
            <div class="info-user">
                <div class="header-card">Echanges</div>
                <div class="nbr-card">10</div>
                <div><img src="../../assets/images/swap-arrow.svg" width="30" height="30"></div>
            </div>
            <div class="info-user">
                <div class="header-card">Jeux possédés</div>
                <div class="nbr-card border-side">10</div>
                <div><img src="../../assets/images/check.svg" width="30" height="30"></div>
            </div>
            <div class="info-user">
                <div class="header-card">Jeux souhaités</div>
                <div class="nbr-card">10</div>
                <div><img src="../../assets/images/heart.svg" width="30" height="30"></div>
            </div>
        </div>
        <div class="btn-swap" ><a href="#">Swapper</a></div>
    </div>
</template>

<script>

</script>

<style>
    .result-card{
        color:rgba(41, 100, 124);
        display: flex;
        width: 400px;
        height: 140px;
        background-color: white;
        border-radius: 10px 10px 10px 0;
        box-shadow: grey 0px 0px 10px;
        justify-content: space-between;
        padding: 20px;
    }

    .info-user{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .pseudo{
        font-weight: bold;
    }
    .header-card{
        font-size: 12px;
    }
    .nbr-card{
        font-size: 60px;
        font-weight: bold;
    }
    .border-side{
        padding: 0px 20px;
        border-left: rgba(41, 100, 124) 5px solid;
        border-right: rgba(41, 100, 124) 5px solid;
    }
    .btn-swap{
        background-color: rgba(255, 93, 25, 0.8);
        color: white;
        width: fit-content;
        height: auto;
        padding: 10px;
        border-radius: 0 0 10px 10px;
    }
    .btn-swap:hover{
        background-color: rgba(255, 93, 25, 1);
        transition: background-color 0.1s ease-in;
    }
</style>