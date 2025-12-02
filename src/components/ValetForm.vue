<template>
  <div class="hp-wrap">
    <div class="scene">
      <div class="card" :class="{ 'is-flipped': flipped }">
        <!-- FRONT -->
        <div class="face front">
          <div class="hp-card">
            <div class="hp-fields">
<!-- Datum příjezdu -->
<div class="hp-field">
  <label class="hp-label" for="arrivalDate">
    Datum příjezdu<span class="hp-req">*</span>
  </label>
  <input id="arrivalDate"
         v-model="arrivalDate"
         class="hp-input" />
</div>

<!-- Datum odjezdu -->
<div class="hp-field">
  <label class="hp-label" for="departureDate">
    Datum odjezdu<span class="hp-req">*</span>
  </label>
  <input id="departureDate"
         v-model="departureDate"
         class="hp-input" />
</div>

<!-- Čas příjezdu -->
<div class="hp-field">
  <label class="hp-label" for="arrivalTime">
    Čas příjezdu<span class="hp-req">*</span>
  </label>
  <input id="arrivalTime"
         v-model="arrivalTime"
         class="hp-input" />
</div>

<!-- Čas odjezdu -->
<div class="hp-field">
  <label class="hp-label" for="departureTime">
    Čas odjezdu<span class="hp-req">*</span>
  </label>
  <input id="departureTime"
         v-model="departureTime"
         class="hp-input" />
</div>  

              <!-- Telefon -->
              <div class="hp-field">
                <label class="hp-label" for="phone">Telefon<span class="hp-req">*</span></label>
                <input id="phone" v-model="phone" type="tel" inputmode="tel" class="hp-input" />
              </div>

              <!-- Email -->
              <div class="hp-field">
                <label class="hp-label" for="email">Email<span class="hp-req">*</span></label>
                <input id="email" v-model="email" type="email" class="hp-input" />
              </div>

              <!-- Jméno -->
              <div class="hp-field">
                <label class="hp-label" for="fullName">Jméno a příjmení<span class="hp-req">*</span></label>
                <input id="fullName" v-model="fullName" type="text" class="hp-input" />
              </div>

              <!-- Model -->
              <div class="hp-field">
                <label class="hp-label" for="carModel">Model<span class="hp-req">*</span></label>
                <input id="carModel" v-model="carModel" type="text" class="hp-input" />
              </div>

              <!-- Počet osob -->
              <div class="hp-field hp-persons">
                <label class="hp-label" for="personCount">Počet osob</label>
                <select id="personCount" v-model="personCount" class="hp-input">
                  <option v-for="n in 8" :key="n" :value="n">{{ n }}</option>
                </select>
              </div>
            </div>

            <div class="hp-summary">
              <div class="hp-summary-box">
                <div>
                  <div class="hp-summary-title">Cena</div>
                  <div class="hp-summary-value">{{ basePrice }} Kč</div>
                </div>
                <div>
                  <div class="hp-summary-title">Dnů</div>
                  <div class="hp-summary-value">{{ days }}</div>
                </div>
              </div>
              <div class="hp-summary-action">
                <button @click="flip" type="button" class="hp-btn-outline">Další</button>
              </div>
            </div>
          </div>
        </div>

        <!-- BACK -->
        <div class="face back">
          <div class="hp-card">
            <h2 class="hp-title">Doplňkové služby</h2>
            <div class="hp-extras">
              <label v-for="opt in extras" :key="opt.id" class="hp-check">
                <input type="checkbox" v-model="selectedExtras" :value="opt.id" class="hp-checkbox" />
                <div class="hp-check-content">
                  <div class="hp-check-title">{{ opt.labelShort }}</div>
                  <div v-if="opt.desc" class="hp-check-desc">{{ opt.desc }}</div>
                </div>
                <div class="hp-check-price">{{ opt.price }} Kč</div>
              </label>

              <label class="hp-check hp-agree" for="agree">
  <input type="checkbox" v-model="agree" class="hp-checkbox" id="agree" />
  <span class="hp-vop">
    Souhlasím se zpracováním osobních údajů a
    <a href="/VOP.pdf" target="_blank" rel="noopener" class="vop-link">VOP*</a>
  </span>
</label>
            </div>

            <div class="hp-total">
              <div class="hp-total-grid">
                <div>
                  <div class="hp-total-title">Základ</div>
                  <div class="hp-total-value">{{ basePrice }} Kč</div>
                </div>
                <div>
                  <div class="hp-total-title">Doplňky</div>
                  <div class="hp-total-value">{{ extrasTotal }} Kč</div>
                </div>
                <div class="hp-sep"></div>
                <div class="hp-grand">Celkova cena: {{ totalPrice }} Kč</div>
              </div>
<div class="hp-field hp-payment-method">
  <label class="hp-label">Způsob platby</label>
  <div class="hp-payment-options">
    <label class="hp-radio" style="opacity: 1;">
      <input type="radio" name="fakePayment" checked disabled />
      <span>Zaplatit při příjezdu (hotově)</span>
    </label>
    <label class="hp-radio" style="opacity: 0.5;">
      <input type="radio" name="fakePayment" disabled />
      <span>Zaplatit online (GoPay) – připravujeme</span>
    </label>
  </div>
</div>

              <div class="hp-total-actions">
                <button @click="flip" class="hp-btn-outline">Zpět</button>
              </div>
              <div class="hp-summary-action">
                <button type="button" :disabled="!agree || submitting" @click="submit" class="hp-btn-primary">
                  Odeslat
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- TOASTS -->
  <div
  v-for="t in toasts"
  :key="t.id"
  class="toast"
  :class="t.type"
  :style="{ '--toast-duration': (t.timeout / 1000) + 's' }"
>
  <span class="toast-icon">
    {{ t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : '⚠️' }}
  </span>
  <span class="toast-message">{{ t.message }}</span>
  <div class="toast-progress">
    <div class="toast-progress-bar"></div>
  </div>
</div>
</template>

<script setup lang="ts">
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.css"
import { ref, computed, watch, onMounted } from 'vue'
import Papa from 'papaparse'

const arrivalDate = ref('')
const departureDate = ref('')
const arrivalTime = ref('')
const departureTime = ref('')
const phone = ref('')
const email = ref('')
const fullName = ref('')
const carModel = ref('')
const personCount = ref(1)

const flipped = ref(false)
const selectedExtras = ref<string[]>([])
const agree = ref(false)
const submitting = ref(false)

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'warn'
  timeout: number
}

const toasts = ref<Toast[]>([])
let toastCounter = 0

function showToast(message: string, type: 'success' | 'error' | 'warn' = 'success', timeout = 4000) {
  const id = toastCounter++
  const toast: Toast = { id, message, type, timeout }
  toasts.value.push(toast)
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, timeout)
}

function todayISO(offsetDays = 0) {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d.toISOString().split('T')[0]
}
const minDate = todayISO(0)
const maxDate = todayISO(360)

const extras = [ 
  { id: 'key_storage', price: 150, labelShort: 'Uložení autoklíčů v trezoru', desc: 'ZDARMA při čištění' },
  { id: 'interior_cleaning', price: 1200, labelShort: 'Balík 1200 Standard', desc: 'Vysátí a vlhké čištění interiéru' },
  { id: 'leather_seats', price: 1500, labelShort: 'Ruční čištění kožených sedadel', desc: 'Cena za 5 sedadel' },
  { id: 'ac_diag', price: 300, labelShort: 'Diagnostika chladiva autoklimatizace', desc: '' },
  { id: 'seat_cleaning', price: 1800, labelShort: 'Hloubkové čištění sedadel', desc: 'Cena za 5 sedadel' },
  { id: 'pet_surcharge', price: 1500, labelShort: 'Příplatek za čištění po zvířatech', desc: '' },
  { id: 'suv_surcharge', price: 300, labelShort: 'Příplatek za čištění SUV / velké MPV', desc: '' },
  { id: 'ac_fill', price: 2000, labelShort: 'Plnění autoklimatizace', desc: '1000 Kč + záloha 1000 Kč' },
  { id: 'ac_fill_disinfection', price: 2500, labelShort: 'Plnění a dezinfekce autoklimatizace', desc: '1500 Kč + záloha 1000 Kč' }
]

interface PriceResponse { basePrice: number; additionalServicesPrice: number; totalPrice: number; days?: number }
const serverPrice = ref<PriceResponse | null>(null)
const basePrice = computed(() => serverPrice.value?.basePrice ?? 0)
const extrasTotal = computed(() => serverPrice.value?.additionalServicesPrice ?? 0)
const totalPrice = computed(() => serverPrice.value?.totalPrice ?? 0)
const days = computed(() => serverPrice.value?.days ?? 1)

// ====== Цены из CSV ======
const prices = ref<number[][]>([]) // [month][days]

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
            row.forEach((cell, monthIdx) => {
              const val = Number(cell)
              if (!isNaN(val)) byMonth[monthIdx][durationIdx + 1] = val
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

onMounted(async () => {
  try {
    prices.value = await loadPricesFromCSV()
  } catch (e) {
    console.error('CSV load error:', e)
  }
  flatpickr("#arrivalDate", {
  altInput: true,
  altFormat: "d.m.Y",
  dateFormat: "Y-m-d",
  altInputClass: "hp-input flatpickr-alt",
  minDate,
  maxDate,
  locale: "cs"
})

flatpickr("#departureDate", {
  altInput: true,
  altFormat: "d.m.Y",
  dateFormat: "Y-m-d",
  altInputClass: "hp-input flatpickr-alt",
  minDate,
  maxDate,
  locale: "cs"
})

  flatpickr("#arrivalTime", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    minuteIncrement: 30
  })
  flatpickr("#departureTime", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    minuteIncrement: 30
  })
})

// ====== Подсчёт цены на фронте ======
async function calculateServerPrice() {
  if (!arrivalDate.value || !departureDate.value) return

  const a = new Date(arrivalDate.value)
  const b = new Date(departureDate.value)

  const durationHuman = Math.max(1, Math.round((b.getTime() - a.getTime()) / 86400000) + 1)
  const month = a.getMonth()

  let base = 0
  if (durationHuman <= 31) {
    base = prices.value[month]?.[durationHuman] ?? 0
  } else {
    const base31 = prices.value[month]?.[31] ?? 0
    base = base31 + (durationHuman - 31) * 100
  }

  const extrasSum = extras.reduce(
    (s, e) => (selectedExtras.value.includes(e.id) ? s + e.price : s),
    0
  )
  const total = base + extrasSum

  serverPrice.value = {
    basePrice: base,
    additionalServicesPrice: extrasSum,
    totalPrice: total,
    days: durationHuman
  }
}


function formatDateDMY(iso: string) {
  if (!iso) return ''
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2,'0')
  const mm = String(d.getMonth()+1).padStart(2,'0')
  const yyyy = d.getFullYear()
  return `${dd}.${mm}.${yyyy}`
}
function normalizeTime(t: string) {
  if (!t) return ''
  let [h,m] = t.split(':').map(Number)
  if (isNaN(h) || isNaN(m)) return t
  m = m < 30 ? 0 : 30
  if (h === 0 && m === 0) { h = 0; m = 30 }
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`
}

function buildFormData() {
  return {
    startDate: formatDateDMY(arrivalDate.value),
    endDate: formatDateDMY(departureDate.value),
    arriveTime: normalizeTime(arrivalTime.value),
    DepartureTime: normalizeTime(departureTime.value),
    finalPrice: totalPrice.value,
    email: email.value,
    name: fullName.value,
    days: days.value,
    phone: phone.value,
    model: carModel.value,
    pasCount: personCount.value,
    formIdentifier: 'valetForm',
    checkedOptions: selectedExtras.value.map(id => {
      const opt = extras.find(e => e.id === id)
      return { extraText: opt?.labelShort || id }
    }),
    additionalServicesPrice: extrasTotal.value
  }
}

function validateForm(): string[] {
  const errors:string[]=[]
  if(!arrivalDate.value) errors.push('Datum příjezdu je povinné.')
  if(!departureDate.value) errors.push('Datum odjezdu je povinné.')
  if(!arrivalTime.value) errors.push('Čas příjezdu je povinný.')
  if(!departureTime.value) errors.push('Čas odjezdu je povinný.')

  // проверка на одинаковую дату — arrival < departure
  if(arrivalDate.value && departureDate.value && arrivalDate.value === departureDate.value) {
    const [ah,am] = arrivalTime.value.split(':').map(Number)
    const [dh,dm] = departureTime.value.split(':').map(Number)
    const aMinutes = ah*60+am
    const dMinutes = dh*60+dm
    if(aMinutes >= dMinutes) {
      errors.push('Při rezervaci v jeden den musí být čas příjezdu dříve než čas odjezdu.')
    }
  }

  if(!phone.value||phone.value.length<8) errors.push('Telefon musí být platný.')
  if(!email.value||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) errors.push('Email není platný.')
  if(!fullName.value) errors.push('Jméno a příjmení je povinné.')
  if(!carModel.value) errors.push('Model vozu je povinný.')
  if(!agree.value) errors.push('Musíte souhlasit se zpracováním údajů.')
  if(totalPrice.value<=0) errors.push('Cena musí být větší než 0.')
  return errors
}

async function submit() {
  const errs = validateForm()
  if (errs.length) {
    errs.forEach(e => showToast(e, 'error'))
    return
  }

  submitting.value = true
  showToast('Odesílání formuláře. Čekejte prosím.', 'success')

  try {
    const formData = buildFormData()
    const resp = await fetch('https://hostparking.cz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    const data = await resp.json()
    console.log('Server response:', data)
    sessionStorage.setItem('reservationSubmitted', 'true')
    showToast('Formulář úspěšně odeslán!', 'success')

    if (typeof window !== 'undefined') {
      try {
        if (typeof (window as any).gtag_report_conversion === 'function') {
          (window as any).gtag_report_conversion()
        } else if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'conversion', {
            send_to: 'AW-16807113216/6-zXCOXCpPYZEIDkoM4-'
          })
        }
      } catch (err) {
        console.warn('Conversion report error:', err)
      }
    }
    window.location.replace('/thank-you.html')
  } catch (err) {
    console.error('Error sending form data:', err)
    showToast('Chyba při odesílání formuláře.', 'error')
  } finally {
    submitting.value = false
  }
}

function flip(){flipped.value=!flipped.value}
function openPicker(e:Event){const i=e.target as HTMLInputElement;if(i&&typeof(i as any).showPicker==='function')(i as any).showPicker()}

watch([arrivalDate,departureDate,selectedExtras],()=>{if(arrivalDate.value&&departureDate.value&&+new Date(departureDate.value)<+new Date(arrivalDate.value))departureDate.value=arrivalDate.value;calculateServerPrice()},{deep:true,immediate:true})
</script>




<style scoped>
* { box-sizing: border-box; }
.hp-wrap { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
.scene { perspective: 1500px; }
.card { position: relative; transform-style: preserve-3d; transition: transform .6s; min-height: 100%; }
.card.is-flipped { transform: rotateY(180deg); }
.face { position: relative; backface-visibility: hidden; min-height: 100%; }
.face.back { position: absolute; inset: 0; transform: rotateY(180deg); }

.hp-card { background:#fff; border-radius:16px; padding:24px; box-shadow:0 10px 30px rgba(0,0,0,.15); display:flex; flex-direction:column; min-height: 100%; }

.hp-fields { display:grid; gap:16px; grid-template-columns:1fr 1fr; width:100%; }
@media (max-width: 700px){ .hp-fields{ grid-template-columns:1fr; } }

.hp-field { display:flex; flex-direction:column; gap:6px; }
.hp-label { color:#1a1a1a; font-weight:700; font-size:14px; }
.hp-req { color:#e11; margin-left:4px; }
.hp-input { width:100%; border:1px solid #ccc; border-radius:8px; padding:.6rem .8rem; font-size:16px; background:#fff; color:#1a1a1a; box-shadow:0 1px 0 rgba(0,0,0,.02) inset; outline:none; transition: box-shadow .2s, border-color .2s; }
.hp-input:focus { border-color:#6a0dad; box-shadow:0 0 0 3px rgba(106,13,173,.15); }

.hp-persons { grid-column: 1 / -1; }

.hp-btn-primary { background:#6a0dad; color:#fff; font-weight:800; padding:.6rem 2rem; border-radius:999px; border:none; cursor:pointer; transition: transform .08s ease, filter .2s; }
.hp-btn-primary:active { transform: translateY(1px) scale(.995); }
.hp-btn-primary:disabled { opacity:.6; cursor:not-allowed; }

.hp-btn-outline { background:#fff; border:1px solid #d1d5db; border-radius:999px; padding:.6rem 1.5rem; cursor:pointer; }

.hp-summary { margin-top:16px; display:flex; flex-direction:column; align-items:center; gap:12px; }
.hp-summary-box { display:grid; grid-template-columns:1fr 1fr; gap:12px; width:100%; background: rgba(255,204,0,.25); color:#000; border-radius:12px; padding:16px; font-weight:800; }
.hp-summary-title { font-size:12px; font-weight:700; color:#333; opacity:1; }
.hp-summary-value { font-size:20px; font-weight:800; color:#111; }
.hp-summary-action { width:100%; display:flex; justify-content:center; }
.hp-summary-action .hp-btn-outline, .hp-summary-action .hp-btn-primary { width:100%; margin-top:8px; padding:.8rem 2rem; font-weight:800; text-align:center; }

.hp-title { color:#6a0dad; font-size:22px; font-weight:800; margin-bottom:16px; }
.hp-extras { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:16px; }
@media (max-width: 700px){ .hp-extras{ grid-template-columns:1fr; } }

.hp-check { display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border:1px solid #e5e5e5; border-radius:12px; background:#fafafa; transition:.2s; }
.hp-check:hover { border-color:#6a0dad; background:#fdfcff; }
.hp-check-content { flex:1; margin-left:10px; }
.hp-check-title { font-weight:700; color:#1a1a1a; }
.hp-check-desc { font-size:13px; color:#555; }
.hp-check-price { font-weight:800; color:#6a0dad; margin-left:12px; white-space:nowrap; }
.hp-checkbox { width:20px; height:20px; accent-color:#6a0dad; }

.hp-agree { grid-column:1 / -1; justify-content:flex-start; }
.hp-vop { color:#e11; margin-left:8px; }

.hp-total { display:flex; flex-direction:column; gap:16px; margin-top:auto; }
.hp-total-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; background: rgba(255,204,0,.25); border-radius:12px; padding:16px; }
.hp-total-title { font-size:12px; font-weight:700; color:#333; }
.hp-total-value { font-size:20px; font-weight:800; color:#111; }
.hp-sep { grid-column:1 / -1; height:1px; background:#0002; }
.hp-grand { grid-column:1 / -1; color:#000; font-size:22px; font-weight:900; }

.hp-total-actions { display:flex; justify-content:flex-start; gap:12px; flex-wrap:wrap; }
.hp-total-actions .hp-btn-outline { flex:1; }

/* --- Toasts --- */
.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
}
.hp-payment-method {
  grid-column: 1 / -1;
  margin-top: 12px;
}

.hp-payment-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 6px;
}

.hp-radio {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.hp-radio input[type="radio"] {
  width: 18px;
  height: 18px;
  accent-color: #6a0dad;
  cursor: default;
}

.hp-radio-disabled {
  opacity: 0.6;
  font-weight: 500;
}

.toast {
  --toast-duration: 4s; /* можно динамически менять через inline-style */
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 260px;
  max-width: 360px;
  padding: 14px 18px;
  border-radius: 10px;
  font-weight: 600;
  color: #fff;
  box-shadow: 0 4px 14px rgba(0,0,0,0.25);
  animation: slideIn .35s ease, fadeOut .4s ease forwards;
  animation-delay: 0s, calc(var(--toast-duration) - .4s);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.toast.success { background: linear-gradient(135deg, #16a34a, #22c55e); }
.toast.error   { background: linear-gradient(135deg, #dc2626, #ef4444); }
.toast.info    { background: linear-gradient(135deg, #2563eb, #3b82f6); }

.toast-icon { font-size: 20px; }
.toast-message { flex: 1; line-height: 1.4; }

.toast-progress {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  background: rgba(255,255,255,0.25);
  width: 100%;
}
.toast-progress-bar {
  height: 100%;
  background: #fff;
  animation: progressShrink var(--toast-duration) linear forwards;
}

@keyframes slideIn {
  from { transform: translateX(120%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}
@keyframes fadeOut {
  to { transform: translateX(120%); opacity: 0; }
}
@keyframes progressShrink {
  from { width: 100%; }
  to   { width: 0%; }
}
</style>

