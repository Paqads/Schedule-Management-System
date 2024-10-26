<template>
    <div class="schedule-view">
      <h1>Schedules</h1>
      <div class="schedule-controls mb-4">
        <Button label="Add Schedule" icon="pi pi-plus" @click="showDialog = true" />
      </div>
      
      <DataTable :value="schedules" :paginator="true" :rows="10"
                 :loading="loading" stripedRows>
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
        <Column field="hours" header="Hours" />
        <Column field="available_time_blocks" header="Available Time" />
        <Column header="Actions">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-text" @click="editSchedule(slotProps.data)" />
            <Button icon="pi pi-trash" class="p-button-text p-button-danger" @click="deleteSchedule(slotProps.data.id)" />
          </template>
        </Column>
      </DataTable>
      
      <!-- Add/Edit Dialog will go here -->
    </div>
  </template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScheduleStore } from '../stores/schedule'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

const store = useScheduleStore()
const showDialog = ref(false)
const loading = ref(false)

onMounted(async () => {
  await store.fetchSchedules()
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const formatTime = (time: string) => {
  return new Date(time).toLocaleTimeString()
}
</script>