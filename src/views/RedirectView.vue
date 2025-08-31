<template>
  <div
    class="font-mono w-screen h-screen bg-black flex justify-center items-center flex-col"
  >
    <img
      :src="imgAleatoria"
      width="300px"
      class="d-block overflow-hidden rounded-2xl mb-5"
    />
    <div class="loader-circle"></div>
    <p class="mt-5">Aguarde alguns instantes...</p>
  </div>
</template>

<style>
.loader-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 5px solid #555;
  border-top-color: oklch(68.5% 0.169 237.323);
  animation: loader-circle 1s linear infinite;
}

@keyframes loader-circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script setup>
import { ref } from "vue";
import router from "@/router";
import { onMounted } from "vue";
import { useUrlStore } from "../store/urlStore";

import img1 from "../assets/img/1.jpg";
import img2 from "../assets/img/2.jpg";
import img3 from "../assets/img/3.jpg";
import img4 from "../assets/img/4.jpg";
import img5 from "../assets/img/5.jpg";
import img6 from "../assets/img/6.jpg";

const urlStore = useUrlStore();

let randomInteger = Math.floor(Math.random() * 6);
const dict = {
  1: img1,
  2: img2,
  3: img3,
  4: img4,
  5: img5,
  6: img6,
};
const imgAleatoria = ref(dict[randomInteger]);

onMounted(async () => {
  const urlCompleta = window.location.href;
  const redirect = urlCompleta.split("/").reverse()[0];
  const link = await urlStore.getUrlByFakeUrl(redirect);

  if (link) {
    setTimeout(() => {
      window.location.replace(link.data.url);
    }, 1500);
  } else {
    setTimeout(() => {
      router.push({ path: "/" });
    }, 1500);
  }
});
</script>
