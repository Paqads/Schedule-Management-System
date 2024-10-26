mport { defineStore } from 'pinia'
import axios from 'axios'

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    schedules: [],
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchSchedules() {
      this.loading = true
      try {
        const response = await axios.get('http://localhost:8000/api/v1/schedules')
        this.schedules = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    
    async createSchedule(scheduleData) {
      try {
        const response = await axios.post('http://localhost:8000/api/v1/schedules', scheduleData)
        this.schedules.push(response.data)
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      }
    }
  }
})

