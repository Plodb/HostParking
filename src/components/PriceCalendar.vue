<template>
  <section class="prices" id="prices">
    <h3>Ceník parkování</h3>

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
            <th>Cena</th>
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

    <p class="price-note">Ceny v době rezervace a   včetně DPH </p>
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
  
  <style scoped>
  .prices {
    background: linear-gradient(145deg, #ffffff, #faf7ff);
    padding: 4rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .prices h3 {
    font-size: 2.2rem;
    margin-bottom: 2rem;
    color: var(--primary);
    font-weight: 800;
    letter-spacing: -0.5px;
    text-transform: uppercase;
  }
  
  .table-container {
    width: 100%;
    max-width: 650px;
    max-height: 400px; /* ограничение по высоте */
    overflow-y: auto;  /* скролл */
    border-radius: 14px;
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
    background: #fff;
    margin-bottom: 1.5rem;
  }
  
  .price-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
  }
  
  .price-table th,
  .price-table td {
    padding: 1rem 1.2rem;
    border-bottom: 1px solid #eee;
    text-align: center;
  }
  
  .price-table th {
    background: var(--primary);
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .price-table td {
    color: #333;
    font-weight: 500;
  }
  
  .price-table tr:nth-child(even) td {
    background: #fafafa;
  }
  
  .price-table tr:hover td {
    background: #f3f0ff;
    color: var(--primary);
    transition: background 0.25s ease, color 0.25s ease;
  }
  
  .month-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;

  max-width: 800px; /* ограничение ширины контейнера */
  margin: 0 auto;
}

.month-buttons button {
  flex: 1 1 120px;   /* кнопки минимум 120px */
  max-width: 160px;  /* максимум, чтобы не растягивались */
  margin: 0.2rem;
  padding: 0.6rem 1.2rem;
  border: 2px solid var(--primary);
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  transition: all 0.25s ease;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 3px 8px rgba(106, 13, 173, 0.15);
}
  .month-buttons button:hover {
    background: var(--primary);
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(106, 13, 173, 0.3);
  }
  
  .month-buttons .highlighted {
    background: var(--accent);
    color: #000;
    font-weight: bold;
    border-color: var(--accent);
    box-shadow: 0 6px 14px rgba(255, 204, 0, 0.35);
  }
  
  .price-note {
    text-align: center;
    font-size: 0.85rem;
    margin-top: 1.5rem;
    color: #777;
  }
  </style>
  