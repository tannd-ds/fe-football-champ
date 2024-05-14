<template>
  <AppCard>

  <div class="flex flex-col">

    <div class="mb-8 text-3xl font-bold">Tổng Quan các Mùa Giải</div>

    <div class="w-2/3 flex grow relative">
      <Doughnut
        class="p-4 h-full absolute -top-8 left-1/4"
        :data="data"
        :options="options"
      />
    </div>
  </div>
  </AppCard>
</template>

<script setup>
import { Doughnut } from 'vue-chartjs'

const data_fetched = await $fetch('http://localhost:8000/api/admin/season_statistics');

const data = {
  labels: [],
  datasets: [{
    label: '',
    data: [],
    backgroundColor: [
      '#71717a',
      '#22c55e',
      '#ef4444',
    ],
    borderColor: 'rgba(0, 0, 0, 0)',
    hoverOffset: 16
  }]
};

for (const data_index in data_fetched) {
  data.labels.push(data_fetched[data_index].label);
  data.datasets[0].data.push(data_fetched[data_index].data);
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 20,
  },
  plugins: {
    legend: {
      display: true,
      position: 'right',
      labels: {
        color: 'white',
        boxWidth: 40,
        boxHeight: 40,
      },
    }
  },
  cutout: '67%',
};
</script>