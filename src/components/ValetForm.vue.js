import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { ref, computed, watch, onMounted } from 'vue';
import Papa from 'papaparse';
const arrivalDate = ref('');
const departureDate = ref('');
const arrivalTime = ref('');
const departureTime = ref('');
const phone = ref('');
const email = ref('');
const fullName = ref('');
const carModel = ref('');
const personCount = ref(1);
const flipped = ref(false);
const selectedExtras = ref([]);
const agree = ref(false);
const submitting = ref(false);
const toasts = ref([]);
let toastCounter = 0;
function showToast(message, type = 'success', timeout = 4000) {
    const id = toastCounter++;
    const toast = { id, message, type, timeout };
    toasts.value.push(toast);
    setTimeout(() => {
        toasts.value = toasts.value.filter(t => t.id !== id);
    }, timeout);
}
function todayISO(offsetDays = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
}
const minDate = todayISO(0);
const maxDate = todayISO(360);
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
];
const serverPrice = ref(null);
const basePrice = computed(() => serverPrice.value?.basePrice ?? 0);
const extrasTotal = computed(() => serverPrice.value?.additionalServicesPrice ?? 0);
const totalPrice = computed(() => serverPrice.value?.totalPrice ?? 0);
const days = computed(() => serverPrice.value?.days ?? 1);
// ====== Цены из CSV ======
const prices = ref([]); // [month][days]
async function loadPricesFromCSV() {
    return new Promise((resolve, reject) => {
        Papa.parse('/form1_prices.csv', {
            download: true,
            complete: (result) => {
                try {
                    const rows = result.data;
                    const dataRows = rows.slice(1);
                    const byMonth = Array.from({ length: 12 }, () => []);
                    dataRows.forEach((row, durationIdx) => {
                        row.forEach((cell, monthIdx) => {
                            const val = Number(cell);
                            if (!isNaN(val))
                                byMonth[monthIdx][durationIdx + 1] = val;
                        });
                    });
                    resolve(byMonth);
                }
                catch (err) {
                    reject(err);
                }
            },
            error: (err) => reject(err)
        });
    });
}
onMounted(async () => {
    try {
        prices.value = await loadPricesFromCSV();
    }
    catch (e) {
        console.error('CSV load error:', e);
    }
    flatpickr("#arrivalDate", {
        altInput: true,
        altFormat: "d.m.Y",
        dateFormat: "Y-m-d",
        altInputClass: "hp-input flatpickr-alt",
        minDate,
        maxDate,
        locale: "cs"
    });
    flatpickr("#departureDate", {
        altInput: true,
        altFormat: "d.m.Y",
        dateFormat: "Y-m-d",
        altInputClass: "hp-input flatpickr-alt",
        minDate,
        maxDate,
        locale: "cs"
    });
    flatpickr("#arrivalTime", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        minuteIncrement: 30
    });
    flatpickr("#departureTime", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        minuteIncrement: 30
    });
});
// ====== Подсчёт цены на фронте ======
async function calculateServerPrice() {
    if (!arrivalDate.value || !departureDate.value)
        return;
    const a = new Date(arrivalDate.value);
    const b = new Date(departureDate.value);
    const durationHuman = Math.max(1, Math.round((b.getTime() - a.getTime()) / 86400000) + 1);
    const month = a.getMonth();
    let base = 0;
    if (durationHuman <= 31) {
        base = prices.value[month]?.[durationHuman] ?? 0;
    }
    else {
        const base31 = prices.value[month]?.[31] ?? 0;
        base = base31 + (durationHuman - 31) * 100;
    }
    const extrasSum = extras.reduce((s, e) => (selectedExtras.value.includes(e.id) ? s + e.price : s), 0);
    const total = base + extrasSum;
    serverPrice.value = {
        basePrice: base,
        additionalServicesPrice: extrasSum,
        totalPrice: total,
        days: durationHuman
    };
}
function formatDateDMY(iso) {
    if (!iso)
        return '';
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
}
function normalizeTime(t) {
    if (!t)
        return '';
    let [h, m] = t.split(':').map(Number);
    if (isNaN(h) || isNaN(m))
        return t;
    m = m < 30 ? 0 : 30;
    if (h === 0 && m === 0) {
        h = 0;
        m = 30;
    }
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
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
            const opt = extras.find(e => e.id === id);
            return { extraText: opt?.labelShort || id };
        }),
        additionalServicesPrice: extrasTotal.value
    };
}
function validateForm() {
    const errors = [];
    if (!arrivalDate.value)
        errors.push('Datum příjezdu je povinné.');
    if (!departureDate.value)
        errors.push('Datum odjezdu je povinné.');
    if (!arrivalTime.value)
        errors.push('Čas příjezdu je povinný.');
    if (!departureTime.value)
        errors.push('Čas odjezdu je povinný.');
    // проверка на одинаковую дату — arrival < departure
    if (arrivalDate.value && departureDate.value && arrivalDate.value === departureDate.value) {
        const [ah, am] = arrivalTime.value.split(':').map(Number);
        const [dh, dm] = departureTime.value.split(':').map(Number);
        const aMinutes = ah * 60 + am;
        const dMinutes = dh * 60 + dm;
        if (aMinutes >= dMinutes) {
            errors.push('Při rezervaci v jeden den musí být čas příjezdu dříve než čas odjezdu.');
        }
    }
    if (!phone.value || phone.value.length < 8)
        errors.push('Telefon musí být platný.');
    if (!email.value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value))
        errors.push('Email není platný.');
    if (!fullName.value)
        errors.push('Jméno a příjmení je povinné.');
    if (!carModel.value)
        errors.push('Model vozu je povinný.');
    if (!agree.value)
        errors.push('Musíte souhlasit se zpracováním údajů.');
    if (totalPrice.value <= 0)
        errors.push('Cena musí být větší než 0.');
    return errors;
}
async function submit() {
    const errs = validateForm();
    if (errs.length) {
        errs.forEach(e => showToast(e, 'error'));
        return;
    }
    submitting.value = true;
    showToast('Odesílání formuláře. Čekejte prosím.', 'success');
    try {
        const formData = buildFormData();
        const resp = await fetch('https://hostparking.cz/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (!resp.ok)
            throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        console.log('Server response:', data);
        sessionStorage.setItem('reservationSubmitted', 'true');
        showToast('Formulář úspěšně odeslán!', 'success');
        if (typeof window !== 'undefined') {
            try {
                if (typeof window.gtag_report_conversion === 'function') {
                    window.gtag_report_conversion();
                }
                else if (typeof window.gtag === 'function') {
                    window.gtag('event', 'conversion', {
                        send_to: 'AW-16807113216/6-zXCOXCpPYZEIDkoM4-'
                    });
                }
            }
            catch (err) {
                console.warn('Conversion report error:', err);
            }
        }
        window.location.replace('/thank-you.html');
    }
    catch (err) {
        console.error('Error sending form data:', err);
        showToast('Chyba při odesílání formuláře.', 'error');
    }
    finally {
        submitting.value = false;
    }
}
function flip() { flipped.value = !flipped.value; }
function openPicker(e) { const i = e.target; if (i && typeof i.showPicker === 'function')
    i.showPicker(); }
watch([arrivalDate, departureDate, selectedExtras], () => { if (arrivalDate.value && departureDate.value && +new Date(departureDate.value) < +new Date(arrivalDate.value))
    departureDate.value = arrivalDate.value; calculateServerPrice(); }, { deep: true, immediate: true });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['face']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-fields']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-input']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-summary-action']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-summary-action']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-extras']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-check']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-total-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-radio']} */ ;
/** @type {__VLS_StyleScopedClasses['toast']} */ ;
/** @type {__VLS_StyleScopedClasses['toast']} */ ;
/** @type {__VLS_StyleScopedClasses['toast']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-wrap" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "scene" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "card" },
    ...{ class: ({ 'is-flipped': __VLS_ctx.flipped }) },
});
// @ts-ignore
[flipped,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "face front" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-card" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-fields" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-field" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "hp-label" },
    for: "arrivalDate",
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "hp-req" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    id: "arrivalDate",
    ...{ class: "hp-input" },
});
(__VLS_ctx.arrivalDate);
// @ts-ignore
[arrivalDate,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-field" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "hp-label" },
    for: "departureDate",
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "hp-req" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    id: "departureDate",
    ...{ class: "hp-input" },
});
(__VLS_ctx.departureDate);
// @ts-ignore
[departureDate,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-field" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "hp-label" },
    for: "arrivalTime",
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "hp-req" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    id: "arrivalTime",
    ...{ class: "hp-input" },
});
(__VLS_ctx.arrivalTime);
// @ts-ignore
[arrivalTime,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-field" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "hp-label" },
    for: "departureTime",
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "hp-req" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    id: "departureTime",
    ...{ class: "hp-input" },
});
(__VLS_ctx.departureTime);
// @ts-ignore
[departureTime,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-field" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "hp-label" },
    for: "phone",
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "hp-req" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    id: "phone",
    type: "tel",
    inputmode: "tel",
    ...{ class: "hp-input" },
});
(__VLS_ctx.phone);
// @ts-ignore
[phone,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-field" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "hp-label" },
    for: "email",
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "hp-req" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    id: "email",
    type: "email",
    ...{ class: "hp-input" },
});
(__VLS_ctx.email);
// @ts-ignore
[email,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-field" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "hp-label" },
    for: "fullName",
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "hp-req" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    id: "fullName",
    value: (__VLS_ctx.fullName),
    type: "text",
    ...{ class: "hp-input" },
});
// @ts-ignore
[fullName,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-field" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "hp-label" },
    for: "carModel",
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "hp-req" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    id: "carModel",
    value: (__VLS_ctx.carModel),
    type: "text",
    ...{ class: "hp-input" },
});
// @ts-ignore
[carModel,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-field hp-persons" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "hp-label" },
    for: "personCount",
});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    id: "personCount",
    value: (__VLS_ctx.personCount),
    ...{ class: "hp-input" },
});
// @ts-ignore
[personCount,];
for (const [n] of __VLS_getVForSourceType((8))) {
    __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
        key: (n),
        value: (n),
    });
    (n);
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-summary" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-summary-box" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-summary-title" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-summary-value" },
});
(__VLS_ctx.basePrice);
// @ts-ignore
[basePrice,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-summary-title" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-summary-value" },
});
(__VLS_ctx.days);
// @ts-ignore
[days,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-summary-action" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.flip) },
    type: "button",
    ...{ class: "hp-btn-outline" },
});
// @ts-ignore
[flip,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "face back" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-card" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
    ...{ class: "hp-title" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-extras" },
});
for (const [opt] of __VLS_getVForSourceType((__VLS_ctx.extras))) {
    // @ts-ignore
    [extras,];
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        key: (opt.id),
        ...{ class: "hp-check" },
    });
    __VLS_asFunctionalElement(__VLS_elements.input)({
        type: "checkbox",
        value: (opt.id),
        ...{ class: "hp-checkbox" },
    });
    (__VLS_ctx.selectedExtras);
    // @ts-ignore
    [selectedExtras,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "hp-check-content" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "hp-check-title" },
    });
    (opt.labelShort);
    if (opt.desc) {
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "hp-check-desc" },
        });
        (opt.desc);
    }
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "hp-check-price" },
    });
    (opt.price);
}
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "hp-check hp-agree" },
    for: "agree",
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "checkbox",
    ...{ class: "hp-checkbox" },
    id: "agree",
});
(__VLS_ctx.agree);
// @ts-ignore
[agree,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "hp-vop" },
});
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    href: "/VOP.pdf",
    target: "_blank",
    rel: "noopener",
    ...{ class: "vop-link" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-total" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-total-grid" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-total-title" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-total-value" },
});
(__VLS_ctx.basePrice);
// @ts-ignore
[basePrice,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-total-title" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-total-value" },
});
(__VLS_ctx.extrasTotal);
// @ts-ignore
[extrasTotal,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-sep" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-grand" },
});
(__VLS_ctx.totalPrice);
// @ts-ignore
[totalPrice,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-field hp-payment-method" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "hp-label" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-payment-options" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "hp-radio" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "radio",
    name: "fakePayment",
    checked: true,
    disabled: true,
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "hp-radio" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "radio",
    name: "fakePayment",
    disabled: true,
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-total-actions" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.flip) },
    ...{ class: "hp-btn-outline" },
});
// @ts-ignore
[flip,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hp-summary-action" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.submit) },
    type: "button",
    disabled: (!__VLS_ctx.agree || __VLS_ctx.submitting),
    ...{ class: "hp-btn-primary" },
});
// @ts-ignore
[agree, submit, submitting,];
for (const [t] of __VLS_getVForSourceType((__VLS_ctx.toasts))) {
    // @ts-ignore
    [toasts,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        key: (t.id),
        ...{ class: "toast" },
        ...{ class: (t.type) },
        ...{ style: ({ '--toast-duration': (t.timeout / 1000) + 's' }) },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "toast-icon" },
    });
    (t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : '⚠️');
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "toast-message" },
    });
    (t.message);
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "toast-progress" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "toast-progress-bar" },
    });
}
/** @type {__VLS_StyleScopedClasses['hp-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['scene']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['is-flipped']} */ ;
/** @type {__VLS_StyleScopedClasses['face']} */ ;
/** @type {__VLS_StyleScopedClasses['front']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-card']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-fields']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-field']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-label']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-req']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-input']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-field']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-label']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-req']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-input']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-field']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-label']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-req']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-input']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-field']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-label']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-req']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-input']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-field']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-label']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-req']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-input']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-field']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-label']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-req']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-input']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-field']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-label']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-req']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-input']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-field']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-label']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-req']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-input']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-field']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-persons']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-label']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-input']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-summary']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-summary-box']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-summary-title']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-summary-value']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-summary-title']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-summary-value']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-summary-action']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['face']} */ ;
/** @type {__VLS_StyleScopedClasses['back']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-card']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-title']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-extras']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-check']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-checkbox']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-check-content']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-check-title']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-check-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-check-price']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-check']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-agree']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-checkbox']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-vop']} */ ;
/** @type {__VLS_StyleScopedClasses['vop-link']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-total']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-total-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-total-title']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-total-value']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-total-title']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-total-value']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-sep']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-grand']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-field']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-payment-method']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-label']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-payment-options']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-radio']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-radio']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-total-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-summary-action']} */ ;
/** @type {__VLS_StyleScopedClasses['hp-btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['toast']} */ ;
/** @type {__VLS_StyleScopedClasses['toast-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['toast-message']} */ ;
/** @type {__VLS_StyleScopedClasses['toast-progress']} */ ;
/** @type {__VLS_StyleScopedClasses['toast-progress-bar']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        arrivalDate: arrivalDate,
        departureDate: departureDate,
        arrivalTime: arrivalTime,
        departureTime: departureTime,
        phone: phone,
        email: email,
        fullName: fullName,
        carModel: carModel,
        personCount: personCount,
        flipped: flipped,
        selectedExtras: selectedExtras,
        agree: agree,
        submitting: submitting,
        toasts: toasts,
        extras: extras,
        basePrice: basePrice,
        extrasTotal: extrasTotal,
        totalPrice: totalPrice,
        days: days,
        submit: submit,
        flip: flip,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
