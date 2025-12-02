import { ref, onMounted, computed } from 'vue';
import Papa from 'papaparse';
const monthNames = [
    "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
    "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
];
const selectedMonth = ref(0);
const prices = ref([]);
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
                        const cells = row.length === 13 ? row.slice(1) : row;
                        cells.forEach((cell, monthIdx) => {
                            const val = Number(cell);
                            byMonth[monthIdx][durationIdx + 1] = isNaN(val) ? 0 : val;
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
function selectMonth(i) {
    selectedMonth.value = i;
}
const visibleDurations = computed(() => {
    const all = prices.value[selectedMonth.value] || [];
    return all.slice(1); // начиная с 1 дня
});
function getPriceForPeriod(startISO, endISO) {
    if (!startISO || !endISO)
        return 0;
    const a = new Date(startISO);
    let b = new Date(endISO);
    if (a.toDateString() === b.toDateString()) {
        b.setDate(b.getDate() + 1);
    }
    const duration = Math.max(1, Math.round((+b - +a) / 86400000));
    const month = a.getMonth();
    return prices.value[month]?.[duration] ?? 0;
}
onMounted(async () => {
    try {
        prices.value = await loadPricesFromCSV();
    }
    catch (e) {
        console.error('Chyba při načítání CSV:', e);
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['prices']} */ ;
/** @type {__VLS_StyleScopedClasses['price-table']} */ ;
/** @type {__VLS_StyleScopedClasses['price-table']} */ ;
/** @type {__VLS_StyleScopedClasses['price-table']} */ ;
/** @type {__VLS_StyleScopedClasses['price-table']} */ ;
/** @type {__VLS_StyleScopedClasses['price-table']} */ ;
/** @type {__VLS_StyleScopedClasses['price-table']} */ ;
/** @type {__VLS_StyleScopedClasses['month-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['month-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['month-buttons']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "prices" },
    id: "prices",
});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "month-buttons" },
});
for (const [m, i] of __VLS_getVForSourceType((__VLS_ctx.monthNames))) {
    // @ts-ignore
    [monthNames,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selectMonth(i);
                // @ts-ignore
                [selectMonth,];
            } },
        key: (i),
        ...{ class: ({ highlighted: __VLS_ctx.selectedMonth === i }) },
    });
    // @ts-ignore
    [selectedMonth,];
    (m);
}
if (__VLS_ctx.prices[__VLS_ctx.selectedMonth]) {
    // @ts-ignore
    [selectedMonth, prices,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "table-container" },
    });
    __VLS_asFunctionalElement(__VLS_elements.table, __VLS_elements.table)({
        ...{ class: "price-table" },
    });
    __VLS_asFunctionalElement(__VLS_elements.thead, __VLS_elements.thead)({});
    __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({});
    __VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
    __VLS_asFunctionalElement(__VLS_elements.th, __VLS_elements.th)({});
    __VLS_asFunctionalElement(__VLS_elements.tbody, __VLS_elements.tbody)({});
    for (const [price, idx] of __VLS_getVForSourceType((__VLS_ctx.visibleDurations))) {
        // @ts-ignore
        [visibleDurations,];
        __VLS_asFunctionalElement(__VLS_elements.tr, __VLS_elements.tr)({
            key: (idx),
        });
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        (idx + 1);
        __VLS_asFunctionalElement(__VLS_elements.td, __VLS_elements.td)({});
        (price ? price + ' Kč' : '—');
    }
}
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "price-note" },
});
/** @type {__VLS_StyleScopedClasses['prices']} */ ;
/** @type {__VLS_StyleScopedClasses['month-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['highlighted']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
/** @type {__VLS_StyleScopedClasses['price-table']} */ ;
/** @type {__VLS_StyleScopedClasses['price-note']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        monthNames: monthNames,
        selectedMonth: selectedMonth,
        prices: prices,
        selectMonth: selectMonth,
        visibleDurations: visibleDurations,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
