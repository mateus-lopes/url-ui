import { computed, reactive } from "vue";
import { defineStore } from "pinia";
import { IUrl, CreateUrlPayload } from "../types/urlType";
import UrlService from "../service/urlService";

export const useUrlStore = defineStore("urls", () => {
    const urlService = UrlService

    const state = reactive({
        urls: [] as IUrl[],
        urlSelected: null as IUrl | null,
        loading: false,
        error: null as string | null
    });

    const urls = computed(() => state.urls);
    const urlSelected = computed(() => state.urlSelected);
    const loading = computed(() => state.loading);
    const error = computed(() => state.error);

    const setLoading = (loading: boolean) => {
        state.loading = loading;
    };

    const setError = (message: string | null) => {
        state.error = message;
    };

    const getUrls = async () => {
        setLoading(true);
            try {
            const response = await urlService.getUrls();
            state.urls = response?.data ?? [];
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getUrl = async (id: string) => {
        setLoading(true);
        try {
            const response = await urlService.getUrl(id);
            state.urlSelected = response?.data ?? null;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteUrl = async (id: string) => {
        setLoading(true);
        try {
            await urlService.removeUrl(id);
            getUrls();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const addUrl = async (url: CreateUrlPayload): Promise<string | null> => {
        setLoading(true);
        try {
            await urlService.addUrl(url);
            state.urls.push(url as IUrl);
            return url.fakeUrl;
        } catch (error) {
            setError(error.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const getUrlByFakeUrl = async (fakeUrl: string) => {
        setLoading(true);
        try {
            const url = await urlService.getUrlByFakeUrl(fakeUrl);
            return url;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        state,
        urls,
        urlSelected,
        loading,
        error,

        setLoading,
        setError,
        getUrlByFakeUrl,
        addUrl,
        getUrls,
        getUrl,
        deleteUrl
    };
});