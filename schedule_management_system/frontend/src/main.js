import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Calendar from 'primevue/calendar'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const app = createApp(App)

app.use(PrimeVue)
app.component('Calendar', Calendar)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Button', Button)
app.component('InputText', InputText)

app.mount('#app')

<!-- frontend/src/App.vue -->
<template>
  <div class="schedule-app">
    <header>
      <h1>Schedule Management System</h1>
    </header>
    
    <main>
      <div class="schedule-controls">
        <Button label="Add Schedule" @click="showAddDialog = true" />
      </div>

      <DataTable :value="schedules" :paginator="true" :rows="10">
        <Column field="date" header="Date">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.date) }}
          </template>
        </Column>
        <Column field="start_time" header="Start Time">
          <template #body="slotProps">
            {{ formatTime(slotProps.data.start_time) }}
          </template>
        </Column>
        <Column field="end_time" header="End Time">
          <template #body="slotProps">
            {{ formatTime(slotProps.data.end_time) }}
          </template>
        </Column>
        <Column field="location" header="Location" />
        <Column field="hours" header="Hours" />
      </DataTable>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const schedules = ref([])
    const showAddDialog = ref(false)

    const fetchSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:8000/schedules/')
        schedules.value = response.data
      } catch (error) {
        console.error('Error fetching schedules:', error)
      }
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString()
    }

    const formatTime = (time) => {
      return new Date(time).toLocaleTimeString()
    }

    onMounted(() => {
      fetchSchedules()
    })

    return {
      schedules,
      showAddDialog,
      formatDate,
      formatTime
    }
  }
}
</script>

<style>
.schedule-app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  margin-bottom: 30px;
}

.schedule-controls {
  margin-bottom: 20px;
}
</style>