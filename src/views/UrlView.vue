<template>
  <div
    class="font-mono w-screen h-screen bg-black flex justify-center items-center"
  >
    <div class="flex items-center gap-2 flex-col">
      <div class="flex items-center gap-2 flex-col w-96">
        <img src="../assets/img/logo.png" width="150px" />
        <h2 class="">EncurtaURL</h2>
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
          class="text-black py-2 px-4 rounded-2xl w-full"
          type="text"
          ref="fakeUrlRef"
        />
      </div>
      <div class="flex flex-col text-center">
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
          class="bg-blue-500 w-96 mx-auto mt-4 rounded-2xl hover:bg-blue-900 transition-all"
        >
          Salvar Url
        </button>
      </div>
    </div>
    <url-list />
  </div>
</template>

<script setup lang="ts">
import UrlList from "../components/UrlList.vue";
import { ref } from "vue";
import { useUrlStore } from "../store/urlStore";

const urlStore = useUrlStore();

const realUrl = ref("");
const fakeUrl = ref("");
const realUrlRef = ref(null);
const fakeUrlRef = ref(null);

const url = ref("");

// function onSave() {
//   let correctUrl;
//   if (realUrl.value.slice(0, 7) !== "http://")
//     correctUrl = "http://" + realUrl.value;

//   const linksJSON = localStorage.getItem("links");
//   const links = JSON.parse(linksJSON);
//   if (!links) {
//     localStorage.setItem(
//       "links",
//       JSON.stringify([
//         {
//           realLink: correctUrl,
//           fakeLink: fakeUrl.value,
//         },
//       ])
//     );
//   } else {
//     links.push({
//       realLink: correctUrl,
//       fakeLink: fakeUrl.value,
//     });
//     localStorage.setItem("links", JSON.stringify(links));
//   }
//   url.value = "http://localhost:3000/r/" + fakeUrl.value;
// }
const onSave = async () => {
  const urlWithHttp = realUrl.value.slice(0, 8) !== "https://";

  const data = await urlStore.addUrl({
    url: urlWithHttp ? "https://" + realUrl.value : realUrl.value,
    fakeUrl: "http://localhost:3001/r/" + fakeUrl.value,
    title: fakeUrl.value,
    ads: false,
    disabled: false,
    expiresAt: undefined,
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
