<script setup>
import { ref } from 'vue'
import Button from './Button.vue'


const transactions = ref([
  { id: 'P0013', name: 'Nikki',  status: 'Paid', total: 'Rp18.000' },
  { id: 'P0012', name: 'Zoe', status: 'Paid', total: 'Rp18.000' },
  { id: 'P0011', name: 'Rozak',status: 'Pending', total: 'Rp18.000' },
  { id: 'P0010', name: 'Radit',status: 'Paid', total: 'Rp18.000' },
])

const handleAction = (id) => {
  console.log('Tombol aksi diklik untuk transaksi:', id)
}
</script>
<template>

  <div class="transaction-container">

    <div class="table-responsive">

      <table class="transaction-table">
        <thead>

          <tr>
            <th class="col-action">#</th>
            <th>Kode Transaksi</th>
            <th>Nama Customer</th>
            <th>Status</th>
            <th>Total Harga</th>
          </tr>

        </thead>
        <tbody>

          <tr v-for="trx in transactions" :key="trx.id">

            <td class="button-table">
              <Button variant="primary" @click="handleAction(trx.id)">
             
              </Button>
            </td>
            <td class="font-medium">{{ trx.id }}</td>
            <td>{{ trx.name }}</td>
            <td>
              
              <span :class="['badge', trx.status === 'Paid' ? 'badge-paid' : 'badge-pending']">
                {{ trx.status }}

              </span>
            </td>

            <td class="font-medium">{{ trx.total }}</td>

          </tr>
          

        </tbody>
      </table>
    </div>
  </div>
</template>



<style scoped>
.button-table{
  
}
.transaction-container {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.transaction-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}


.transaction-table {

  width: 100%;
  border-collapse: collapse;

  text-align: left;
  white-space: nowrap;
}

.transaction-table th {

  padding: 16px 24px;
  font-size: 0.875rem;

  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  border-bottom: 1px solid #e5e7eb;
}

.transaction-table .col-action {

  width: 60px;
}

.transaction-table td {

  padding: 16px 24px;
  font-size: 0.875rem;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}

.transaction-table tr:hover {

  background-color: #f9fafb;
  transition: background-color 0.2s ease;
}

.font-medium {

  font-weight: 500;
  color: #1f2937;
}

.text-muted {

  color: #6b7280;
}

.text-center {

  text-align: center;
}

.empty-state {

  padding: 32px;
  color: #6b7280;
}

</style>