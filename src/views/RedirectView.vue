<script setup lang="ts">
import { ref, onMounted } from "vue";
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
const showAds = ref(false);

const randomInteger = Math.floor(Math.random() * 6) + 1;
const dict = {
  1: img1,
  2: img2,
  3: img3,
  4: img4,
  5: img5,
  6: img6,
};
const imgAleatoria = ref(dict[randomInteger]);
const isMounting = ref(true);

onMounted(async () => {
  const urlCompleta = window.location.href;
  const redirect = urlCompleta.split("/").reverse()[0];
  const link = await urlStore.getUrlByFakeUrl(redirect);

  if (!link) {
    urlStore.setError("Link não encontrado");
    setTimeout(() => router.push({ path: "/" }), 2000);
    return;
  }

  const currentDate = new Date().toISOString().slice(0, 10);
  const expiresDate = link.expiresAt ? link.expiresAt.slice(0, 10) : null;

  if (expiresDate && expiresDate <= currentDate) {
    await urlStore.deleteUrl(link._id);
    urlStore.setError("Link expirado");
    setTimeout(() => router.push({ path: "/" }), 2000);
    return;
  }

  if (link.ads) {
    showAds.value = true;
    setTimeout(() => {
      window.location.replace(link.url);
    }, 5000);
  } else {
    setTimeout(() => {
      window.location.replace(link.url);
    }, 1500);
  }

  isMounting.value = false;
});
</script>

<template>
  <div
    v-if="isMounting"
    class="font-mono w-screen h-screen bg-black flex justify-center items-center flex-col"
  >
    <div class="loader-circle"></div>
    <p class="mt-5">Aguarde alguns instantes para ser redirecionado...</p>
  </div>
  <div
    v-else-if="showAds"
    class="font-mono w-screen h-screen bg-black flex justify-center items-center flex-col"
  >
    <div class="mb-24 text-white text-xl text-center">
      mockup de anúncio - 5s
      <br />
      <span class="text-sm text-gray-400">
        (aqui você pode colocar o seu anúncio)
      </span>
    </div>
    <div class="loader-circle"></div>
    <p class="mt-5">Aguarde alguns instantes para ser redirecionado...</p>
  </div>
  <div
    v-else-if="!urlStore.error"
    class="font-mono w-screen h-screen bg-black flex justify-center items-center flex-col"
  >
    <img
      :src="imgAleatoria"
      width="300px"
      class="d-block overflow-hidden rounded-2xl mb-5"
    />
    <div class="loader-circle"></div>
    <p class="mt-5">Aguarde alguns instantes para ser redirecionado...</p>
  </div>
  <div
    v-else
    class="font-mono w-screen h-screen bg-black flex justify-center items-center flex-col"
  >
    <p class="mt-5 text-red-500 text-xl">{{ urlStore.error }}</p>
    <router-link to="/" class="mt-5 hover:text-blue-400"
      >Voltar para a página inicial</router-link
    >
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
