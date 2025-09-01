<template>
  <div class="font-mono w-screen h-screen bg-black flex justify-center items-center flex-col" v-if="urlStore.error">
    <p class="mt-5 text-red-500 text-xl">{{ urlStore.error }}</p>
    <router-link to="/" class="mt-5 hover:text-blue-400">Voltar para a página inicial</router-link>
  </div>
  <div
    v-else
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

<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUrlStore } from "../store/urlStore";

// @ts-ignore
import img1 from "../assets/img/1.jpg";
// @ts-ignore
import img2 from "../assets/img/2.jpg";
// @ts-ignore
import img3 from "../assets/img/3.jpg";
// @ts-ignore
import img4 from "../assets/img/4.jpg";
// @ts-ignore
import img5 from "../assets/img/5.jpg";
// @ts-ignore
import img6 from "../assets/img/6.jpg";

const urlStore = useUrlStore();
const router = useRouter();

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

  const currentDate = new Date().toISOString().slice(0, 10);
  const expiresDate = link.expiresAt ? link.expiresAt.slice(0, 10) : null;

  if (expiresDate === currentDate) {
    urlStore.deleteUrl(link._id);
    urlStore.setError("Link expirado");
    setTimeout(() => {
      router.push({ path: "/" });
    }, 2000);
  } else if (link) {
    setTimeout(() => {
      window.location.replace(link.url);
    }, 1500);
  } else {
    setTimeout(() => {
      router.push({ path: "/" });
    }, 1500);
  }
});
</script>
