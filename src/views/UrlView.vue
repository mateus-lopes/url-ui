<script setup lang="ts">
import { ref } from "vue";
import { useUrlStore } from "../store/urlStore";

// @ts-ignore
import UrlList from "../components/UrlList.vue";

const urlStore = useUrlStore();

const realUrl = ref("");
const fakeUrl = ref("");
const ads = ref(false); 
const showExpiresAt = ref(false);
const expiresAtDate = ref('');
const realUrlRef = ref(null);
const fakeUrlRef = ref(null);
const url = ref("");

const onSave = async () => {
  const urlWithHttp = realUrl.value.slice(0, 8) !== "https://";

  const expiration = showExpiresAt.value && expiresAtDate.value 
    ? new Date(expiresAtDate.value).toISOString() 
    : undefined;

  const data = await urlStore.addUrl({
    url: urlWithHttp ? "https://" + realUrl.value : realUrl.value,
    fakeUrl: "http://localhost:3001/r/" + fakeUrl.value,
    title: fakeUrl.value,
    ads: ads.value,
    disabled: false,
    expiresAt: expiration,
  });

  url.value = data ?? "Ocorreu um erro";
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(url.value);
  } catch (err) {
    console.error("Falha ao copiar texto: ", err);
  }
};
</script>

<template>
  <div
    class="font-mono w-screen h-screen bg-black flex justify-center items-center"
  >
    <div class="flex items-center gap-2 flex-col">
      <div class="flex items-center gap-2 flex-col w-96">
        <img src="../assets/img/logo.png" width="150px" />
        <h2 class="">EncurtaURL</h2>

        <div class="flex items-center gap-2 justify-center mt-1">
          <button
            @click="ads = !ads"
            class="bg-gray-800 py-2 px-4 rounded-full flex justify-center items-center gap-2 hover:bg-gray-700 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-ad"
              width="18"
              height="18"
              viewBox="0 -960 960 960"
              :class="{ 'ads': ads }"
              :fill="ads ? 'green' : 'white'"
            >
              <path xmlns="http://www.w3.org/2000/svg" d="M468-240q-96-5-162-74t-66-166q0-100 70-170t170-70q97 0 166 66t74 162l-84-25q-13-54-56-88.5T480-640q-66 0-113 47t-47 113q0 57 34.5 100t88.5 56l25 84Zm48 158q-9 2-18 2h-18q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v18q0 9-2 18l-78-24v-12q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h12l24 78Zm305 22L650-231 600-80 480-480l400 120-151 50 171 171-79 79Z"/>
            </svg>
            Ads
          </button>

          <button
            @click="showExpiresAt = !showExpiresAt"
            class="bg-gray-800 py-2 px-4 rounded-full flex justify-center items-center gap-2 hover:bg-gray-700 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-clock"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              :stroke="showExpiresAt ? 'pink' : 'white'"
              :class="{ 'ads': showExpiresAt }"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
              :stroke="showExpiresAt ? 'pink' : 'white'"
                fill="none"
              />
              <path
                d="M12 6v6l4 2"
              :stroke="showExpiresAt ? 'pink' : 'white'"
                fill="none"
              />
            </svg>
            Data de expiração
          </button>
        </div>

        <input
          v-model="realUrl"
          class="text-black py-2 px-4 rounded-2xl mt-4 w-full"
          type="text"
          placeholder="Url Real"
          ref="realUrlRef"
        />
        <input
          v-model="fakeUrl"
          placeholder="Url Personalizada"
          class="text-black py-2 px-4 rounded-2xl w-full mt-1"
          type="text"
          ref="fakeUrlRef"
        />
      </div>
      <div class="flex flex-col text-center">
        <div v-if="showExpiresAt">
          <input
            type="date"
            v-model="expiresAtDate"
            class="mt-1 mb-2 py-2 px-4 rounded-2xl w-full text-black placeholder:text-gray-600"
          />
        </div>
        <p v-if="url">
          <a
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white-50 flex-1 truncate hover:text-blue-500 transition-all"
            >{{ url }}</a
          >
          <button
            v-if="url !== 'Ocorreu um erro'"
            class="inline-block ml-2 hover:text-green-600 transition-all"
            @click="copyToClipboard()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-copy"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect
                x="9"
                y="9"
                width="13"
                height="13"
                rx="2"
                ry="2"
                stroke="currentColor"
                fill="none"
              />
              <path
                d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                stroke="currentColor"
                fill="none"
              />
            </svg>
          </button>
        </p>
        <button
          @click="onSave"
          class="bg-blue-500 w-96 mx-auto mt-1 rounded-2xl hover:bg-blue-900 transition-all"
        >
          Salvar Url
        </button>
  <footer class="text-sm mt-4 text-gray-500">
    <p>
      2025 | 
      <a href="https://github.com/mateus-lopes" target="_blank" class="hover:text-blue-500">mateus-lopes</a>
    </p>
  </footer>
      </div>
    </div>
    <url-list />
  </div>
</template>

<style scoped>
.ads {
  animation: spin 1s linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(30deg);
  }
  90% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>