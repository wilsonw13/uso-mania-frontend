<template>
  
    <section class="err">
        <h1 class="warning">
            sorry! your screen dimensions
            cannot support our website and game... <br>
            <span>please use a laptop or desktop</span>
        </h1>
    </section>

</template>

<script>
export default {

}
</script>

<style scoped>

.err {
    display: none;
}

.warning {
    font-weight: 400;
    line-height: 5rem;
    font-size: 6rem;
    padding: 15rem 1.75rem 0 1.75rem;
}

.warning span {
        text-align: center;
    font-style: italic;
    font-weight: 300;
}

@media screen and (max-width: 600px) {
    .err {
        position: fixed;
        overflow: hidden;
        display: block;
        z-index: 9999;
        width: 100vw;
        height: 200vh;
        background-image: linear-gradient(rgba(8, 12, 72, 0.6), rgba(16, 3, 50, 0.6)), url('@/assets/images/backgrounds/help-bg.jpg');
    }

}


</style>