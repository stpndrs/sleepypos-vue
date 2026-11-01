<script setup>
import { ref } from 'vue';
import InputDate from '@/components/InputDate.vue';
import Chart from '@/components/Chart.vue';
import TableComponent from '@/components/TableComponent.vue';
import SearchInput  from '@/components/SearchInput.vue';
import DateRangeInput from '@/components/DateRangeInput.vue';

</script>

<template>
  <div class="page-container">

  <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Dashboard</h1>

            </div>
        </section>
   <section class="page-body">
    <section class="filters">
                <DateRangeInput v-model:startDate="startDate" v-model:endDate="endDate" label="cari data berdasarkan bulan"/>
                
            </section>

    <section class="chart-grid">

      <div class="chart-card">

        <h2 class="chart-title">Data Penjualan</h2>
        <Chart id="Chart1" type="line" />

      </div>

      <div class="chart-card">

        <h2 class="chart-title">Data Pembelian</h2>
        <Chart id="Chart2" type="line" />

      </div>
    </section>

    <section class="table-grid">
      <div class="header-table">

        <h2 class="table-title">transaksi terbaru</h2>
        <SearchInput></SearchInput>
      </div>

      <div class="table-section">
        <TableComponent />
      </div>

    </section>
  </section>
</div>


  
</template>
<style scoped>
.page-container {
  background-color: #ffffff;
  min-height: 100px;
  box-sizing: border-box;
}

.page-body {
  display: flex;
  flex-direction: column; 
  gap: 24px; 
  padding: 0 24px 24px 24px;
}

.header-table {

  font-family: 'poppins', sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px; 
}

.table-grid {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
}

.header-body {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
}

.page-header {
  display: flex;
}

.title {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.filter-month {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chart-grid {
  font-family: 'poppins', sans-serif;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.chart-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
}
</style>