<template>
  <section class="prices" id="prices">
    <h2>Ceník parkování</h2>

    <div class="month-buttons">
      <button
        v-for="(m, i) in monthNames"
        :key="i"
        :class="{ highlighted: selectedMonth === i }"
        @click="selectMonth(i)"
      >
        {{ m }}
      </button>
    </div>

    <div class="table-container" v-if="prices[selectedMonth]">
      <table class="price-table">
        <thead>
          <tr>
            <th>Počet dní</th>
            <th>Cena (s&nbsp;DPH)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(price, idx) in visibleDurations" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ price ? price + ' Kč' : '—' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Papa from 'papaparse'

const monthNames = [
  "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
  "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
]

const selectedMonth = ref(0)
const prices = ref<number[][]>([])

async function loadPricesFromCSV() {
  return new Promise<number[][]>((resolve, reject) => {
    Papa.parse('/form1_prices.csv', {
      download: true,
      complete: (result) => {
        try {
          const rows = result.data as string[][]
          const dataRows = rows.slice(1)

          const byMonth: number[][] = Array.from({ length: 12 }, () => [])
          dataRows.forEach((row, durationIdx) => {
  const cells = row.length === 13 ? row.slice(1) : row
  cells.forEach((cell, monthIdx) => {
    const val = Number(cell)
    byMonth[monthIdx][durationIdx + 1] = isNaN(val) ? 0 : val
  })
})

          resolve(byMonth)
        } catch (err) {
          reject(err)
        }
      },
      error: (err) => reject(err)
    })
  })
}

function selectMonth(i: number) {
  selectedMonth.value = i
}

const visibleDurations = computed(() => {
  const all = prices.value[selectedMonth.value] || []
  return all.slice(1) // начиная с 1 дня
})

function getPriceForPeriod(startISO: string, endISO: string): number {
  if (!startISO || !endISO) return 0
  const a = new Date(startISO)
  let b = new Date(endISO)

  if (a.toDateString() === b.toDateString()) {
    b.setDate(b.getDate() + 1)
  }

  const duration = Math.max(1, Math.round((+b - +a) / 86400000))
  const month = a.getMonth()
  return prices.value[month]?.[duration] ?? 0
}

onMounted(async () => {
  try {
    prices.value = await loadPricesFromCSV()
  } catch (e) {
    console.error('Chyba při načítání CSV:', e)
  }
})
</script>
