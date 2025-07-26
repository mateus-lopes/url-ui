<template>
  <div
    class="font-mono w-screen h-screen bg-black flex justify-center items-center"
  >
    <div class="flex items-center gap-2 flex-col min-w-80">
      <img src="./logo.png" width="150px" />
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
      <p v-if="url">
        {{ url }}
        <span class="inline-block cursor-pointer"
          ><svg
            class="inline-block"
            @click="copyToClipboard"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path
              d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"
            />
          </svg>
        </span>
      </p>
      <a v-if="url" :href="url"> ir para url </a>
      <button @click="onSave" class="bg-blue-500 w-full mt-4 rounded-2xl">
        Salvar Url
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const realUrl = ref("");
const fakeUrl = ref("");
const realUrlRef = ref(null);
const fakeUrlRef = ref(null);
const saving = ref(false);

const url = ref("");

function onSave() {
  let correctUrl;
  if (realUrl.value.slice(0, 7) !== "http://")
    correctUrl = "http://" + realUrl.value;

  const linksJSON = localStorage.getItem("links");
  const links = JSON.parse(linksJSON);
  if (!links) {
    localStorage.setItem(
      "links",
      JSON.stringify([
        {
          realLink: correctUrl,
          fakeLink: fakeUrl.value,
        },
      ])
    );
  } else {
    links.push({
      realLink: correctUrl,
      fakeLink: fakeUrl.value,
    });
    localStorage.setItem("links", JSON.stringify(links));
  }
  url.value = "http://localhost:3000/r/" + fakeUrl.value;
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(url.value);
    console.log("Texto copiado para a área de transferência", url.value);
  } catch (err) {
    console.error("Falha ao copiar texto: ", err);
  }
}
</script>
