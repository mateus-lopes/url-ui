<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUrlStore } from "../store/urlStore";

const urlStore = useUrlStore();

const modal = ref(false);

const expand = () => {
  modal.value = true;
};

const collapse = () => {
  modal.value = false;
};

const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
}

onMounted(async () => {
  await urlStore.getUrls();
});
</script>

<template>
  <div class="list" @mouseenter="expand" @mouseleave="collapse">
    <p class="font-bold text-white">
      URLs recentes:
    </p>
    <div class="flex justify-center">
      <button class="animate-pulse " :class="{'w-0 h-0 hidden': modal}">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-up" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 4v16" />
          <path d="M8 8l4 -4l4 4" />
        </svg>
      </button>
    </div>
    <ul class="bg pl-4 py-5" :class="{'w-0 h-0 hidden': !modal}">
      <li v-for="url in urlStore.urls" :key="url._id" class="flex items-center justify-between w-full mb-2 pl-3">
        <router-link :to="`/r/${url.title}`" target="_blank" rel="noopener noreferrer" class="flex-1 truncate hover:text-blue-500 transition-all">{{ url.fakeUrl }}</router-link>
        <div class="flex ml-2 p-0 gap-0">
            <button class="hover:text-green-600 transition-all flex justify-center items-center" @click="copyToClipboard(url.fakeUrl)">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" fill="none"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" fill="none"/>
                </svg>
            </button>
            <button @click="urlStore.deleteUrl(url._id ?? '')" class="hover:text-red-600 transition-all flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4 7h16" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M4 7v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2V7" />
                </svg>
            </button>
        </div>
      </li>
      <li v-if="urlStore.urls.length === 0" class="pr-4">Adicione uma url e ela aparecerá aqui.</li>
    </ul>
  </div>
</template>

<style scoped>
.list {
  position: absolute;
  top: 2em;
  left: 2em;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.bg {
    background: rgba(255, 255, 255, 0.14);
    color: rgba(255, 255, 255, 0.6);
    margin: 1em 0;
    border-radius: 8px;
    max-height: 300px;
    overflow-y: auto;
    transition: all 0.3s ease-in-out;
    animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.hidden {
    animation: fadeOut 1s ease-in-out forwards !important;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>