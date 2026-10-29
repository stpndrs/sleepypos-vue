<script setup>
import InputDate from '@/components/InputDate.vue';
import Chart from '@/components/Chart.vue';
import TableComponent from '@/components/TableComponent.vue';
import SearchInput  from '@/components/SearchInput.vue';


</script>

<template>
  <section class="page-header">

    <header class="header-body">

      <h1 class="title">Dashboard</h1>
      <p class="subtitle">Cari data berdasarkan bulan</p>
      
      <div class="filter-month">

        <InputDate placeholder="Bulan awal" />
        <span>—</span>
        <InputDate placeholder="Bulan akhir" />

      </div>
    </header>
  </section>

  <section class="page-body">
    <div class="chart-grid">

      <div class="chart-card">

        <h2 class="chart-title">Data Penjualan</h2>
        <Chart id="Chart1" type="line" />

      </div>

      <div class="chart-card">

        <h2 class="chart-title">Data Pembelian</h2>
        <Chart id="Chart2" type="line" />

      </div>
    </div>
    <div class="table-grid">
      <div class="header-table">

        <h2 class="table-title">transaksi terbaru</h2>
        <SearchInput></SearchInput>
      </div>

      <div class="table-section">

        <TableComponent />
      </div>
    </div>
  </section>


  
</template>

<style scoped>
.page-body{
  display: flex;

}
.header-table{
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.table-grid{
  
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