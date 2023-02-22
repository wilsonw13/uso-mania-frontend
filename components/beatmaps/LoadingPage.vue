<template>
  <div class="spinner-container">
    <div class="circles">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
window.onload = () => {
  setTimeout(() => {
    document.querySelector("body").classList.add("display");
  }, 10000);
};
</script>

<style scoped>
.spinner-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: url(@/assets/images/backgrounds/landing-page-background-inazuma.jpg)
    no-repeat center center fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s;
  z-index: 300;
  overflow: hidden !important;
}

.display .spinner-container {
  opacity: 0;
  visibility: hidden;
}

.circles {
  width: 8rem;
  height: 8rem;
  position: relative;
  opacity: 0;
  visibility: hidden;
  animation: displayCircles 10s;
}

@keyframes displayCircles {
  0% {
    opacity: 0;
    visibility: hidden;
  }
  25% {
    opacity: 1;
    visibility: visible;
  }
  90% {
    opacity: 1;
    visibility: visible;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}

.circles div {
  animation: circles 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 4rem 4rem;
}

.circles div::after {
  content: "";
  position: absolute;
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 50%;
  background-color: #d7b8fa;
  margin: -0.5rem 0 0 -0.5rem;
}

.circles div:nth-child(1) {
  animation-delay: -0.036s;
}

.circles div:nth-child(1)::after {
  top: 6.3rem;
  left: 6.3rem;
}

.circles div:nth-child(2) {
  animation-delay: -0.072s;
}

.circles div:nth-child(2)::after {
  top: 6.8rem;
  left: 5.6rem;
}

.circles div:nth-child(3) {
  animation-delay: -0.108s;
}

.circles div:nth-child(3)::after {
  top: 7.1rem;
  left: 4.8rem;
}

.circles div:nth-child(4) {
  animation-delay: -0.144s;
}

.circles div:nth-child(4)::after {
  top: 7.2rem;
  left: 4rem;
}

.circles div:nth-child(5) {
  animation-delay: -0.18s;
}

.circles div:nth-child(5)::after {
  top: 7.1rem;
  left: 3.2rem;
}

.circles div:nth-child(6) {
  animation-delay: -0.216s;
}

.circles div:nth-child(6)::after {
  top: 6.8rem;
  left: 2.4rem;
}

.circles div:nth-child(7) {
  animation-delay: -0.252s;
}

.circles div:nth-child(7)::after {
  top: 6.3rem;
  left: 1.7rem;
}

.circles div:nth-child(8) {
  animation-delay: -0.288s;
}

.circles div:nth-child(8)::after {
  top: 5.6rem;
  left: 1.2rem;
}

@keyframes circles {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
