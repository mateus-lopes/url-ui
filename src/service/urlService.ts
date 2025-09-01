import api from '../plugins/api'
import { IUrl, CreateUrlPayload } from '../types/urlType'

class UrlService {
  handleError(error: any, action: string) {
    console.error(`Error during ${action}:`, error)
    throw new Error(error.response?.data?.message || 'Um erro inesperado ocorreu');
  }

  async addUrl (url: CreateUrlPayload) {
    try {
      const response = await api.post('/urls/', url)
      return response
    } catch (error) {
      this.handleError(error, 'add')
    }
  }

  async getUrls () {
    try {
      const response = await api.get('/urls/')
      return response
    } catch (error) {
      this.handleError(error, 'get')
    }
  }

  async getUrl (id: string) {
    try {
      const response = await api.get(`/urls/${id}/`)
      return response
    } catch (error) {
      this.handleError(error, 'get')
    }
  }

  async updateUrl (id: string, url: IUrl) {
    try {
      const response = await api.patch(`/urls/${id}/`, url)
      return response
    } catch (error) {
      this.handleError(error, 'update')
    }
  }

  async removeUrl (id: string) {
    try {
      await api.delete(`/urls/${id}/`)
    } catch (error) {
      this.handleError(error, 'delete')
    }
  }

  async getUrlByFakeUrl (fakeUrl: string) {
    try {
      const response = await api.get(`/urls/fake/${fakeUrl}/`)
      return response.data
    } catch (error) {
      this.handleError(error, 'get')
    }
  }
}

export default new UrlService()