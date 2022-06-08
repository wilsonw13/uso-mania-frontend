<template>
  <div class="news-card">
    <h2 class="news-header">
      {{ newsHeader }}
    </h2>
    <p v-for="news in newsContent" :key="news - content">{{ news.text }}</p>
  </div>
</template>

<script>
export default {
  name: 'NewsCard',
  data() {
    return {
      newsHeader: 'we welcome you to !uso mania~',
      newsContent: [
        // {
        //   text: "Hello everyone. I'm Scott, President of Domino's Pizza. Have you heard of Hatsune Miku? Today I'd like to announce a new collaborative project featuring Hatsune Miku: Domino's App, featuring Hatsune Miku. Hatsune Miku exists in a software called Vocaloid. Vocaloid enables you to produce songs. A character called Hatsune Miku sings the songs you create. A great feature is you can create songs as you like. I knew our talented Domino's Pizza crew could work together and create great Vocaloid songs. Bokuro P, Eshi, Chiyo Kiyoshi, Furitsu Keshi, everyone! Amazing Vocaloid songs have been created with the fantastic imagination of the crews all over Japan. The challenge was successfully carried out and this new collaborative app was produced.",
        // },
        // {
        //   text: "Based on Miku's image, the Domino's App changes its appearance. A lot of music and illustrations produced by Domino's crew are here. From the menu to the order, it looks very cute, just like Miku. Once your pizza's delivered, have some fun with Miku! It comes with a social camera function and you can take various poses, pictures of Miku, very cool. And last, but not least, the live performance! Start the pizza stage live and point the camera towards the pizza box, and the pizza box will turn into a live dancing venue. A live performance of Luv4Night produced by Domino's crew! Here we go!",
        // },
        {
          text: '"we do not give a starving man a fish. we teach him how to fish and make him independent" - yukino yukinoshita',
        },
        {
          text: '...',
        },
        {
          text: '!uso mania is an ambitious full stack web application developed over the course of six months. this project fully involves the application of numerous real world industry skills, from the fundamentals of web development like html, css, and javascript, to the utilization of vue, vuex, nuxt, auth0, and several libraries. led by captain wilson wuchen and with team members harvey, kenny, ethan, and ryan, the execution of a complex rhythm game went from dream to reality.',
        },
        {
          text: 'and of course...',
        },
        {
          text: '...thank you to the great mr. whalen himself, thank you for all your support and never ever going easy on us~',
        },
      ],
    };
  },
};
</script>

<style scoped>

.news-card {
  width: 100%;
  padding: 3.5rem;
  /* margin: 3rem 0; */
  background-color: #5b719fbb;
  border-radius: 1.5rem;
}

.news-header {
  line-height: 3rem;
  margin-bottom: 1.75rem;
  font-size: 5.5rem;
  font-style: italic;
}

</style>
