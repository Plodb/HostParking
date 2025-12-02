import { ref, onMounted } from 'vue';
import ValetForm from '../components/ValetForm.vue';
import PriceCalendar from '../components/PriceCalendar.vue';
/* ===== Gallery slider ===== */
const currentIndex = ref(0);
const totalSlides = 17;
function nextSlide() {
    currentIndex.value = (currentIndex.value + 1) % totalSlides;
}
function prevSlide() {
    currentIndex.value = (currentIndex.value - 1 + totalSlides) % totalSlides;
}
/* ===== Blog posts ===== */
const posts = [
    { title: 'Jak velký kufr do letadla (2025)', desc: 'Aktuální informace o požadavcích na velikost a hmotnost zavazadel.', href: '/Jak_velký_kufr_do_letadla_aktuální_informace_o_požadavcích_(2025).html' },
    { title: 'Parkování u letiště: Placené vs. Zdarma', desc: 'Porovnání možností parkování a tipy, jak si vybrat to nejlepší.', href: '/Parkování_u_letiště_Praha_placené_nebo_zdarma_Rozumný_přístup.html' },
    { title: 'HostParking krok za krokem', desc: 'Jednoduchý návod pro zákazníky, jak probíhá parkování u nás.', href: '/Jak-funguje-HostParking.html' },
    { title: 'Srovnání cen parkování (Duben 2025)', desc: 'Kde zaparkovat u Letiště Václava Havla nejvýhodněji?', href: '/Srovnání-cen-parkování-u-Letiště-Václava-Havla-Kde-zaparkovat-v-dubnu-2025-nejvýhodněji.html' },
    { title: 'Letištní průvodce 2025', desc: 'Odbavení na letišti Václava Havla i online krok za krokem.', href: '/Letištní průvodce 2025.html' },
    { title: 'Kam k moři v květnu 2025', desc: '10 nejlepších destinací s teplem, sluncem a klidem mimo sezónu.', href: '/Kam k moři v květnu 2025 10 nejlepších destinací s teplem, sluncem a klidem mimo sezónu.html' },
    { title: 'Letiště Praha 2025: Služby a doprava', desc: 'Kompletní přehled služeb a nejpohodlnější způsoby dopravy.', href: '/Letiště Praha 2025 Kompletní přehled služeb a nejpohodlnější způsoby dopravy na letiště (2).html' },
    { title: 'Dovolená u moře v létě 2025', desc: 'Nejlepší destinace, teploty a tipy na cestu z letiště Praha.', href: '/Dovolená u moře v létě 2025 Nejlepší destinace, teploty a tipy na cestu z letiště Praha.html' },
    { title: 'Turecko z Prahy v září 2025', desc: 'Moře, trhy a dovolená bez víza – tipy a zkušenosti.', href: '/Turecko-z-Prahy-v-září-2025–moře-trhy-a-dovolená-bez-víza.html' },
    { title: 'Zrušený let: Co dělat?', desc: 'Jak postupovat, jaká máte práva a jak se vyhnout chybám.', href: '/Zrušený_let_Co_dělat_a_jak_se_vyhnout_chybám.html' },
];
const videos = ref([
    {
        id: 'Peo-2O-C6tk',
        text: `<a href="https://hostparking.cz">HOSTPARKING</a><br>
           Podívejte se na návod, jak se snadno dostat na naše parkoviště.`,
        loaded: false
    },
    {
        id: '9I-d9C0IFxM',
        text: `<a href="https://hostparking.cz">HOSTPARKING</a><br>
           Navštivte náš YouTube kanál a sledujte další užitečná videa.`,
        loaded: false
    }
]);
function loadVideo(index) {
    videos.value[index].loaded = true;
}
/* ===== Blog slider ===== */
const blogSlides = ref(null);
onMounted(() => {
    // подключение внешнего виджета (shapo)
    const script = document.createElement('script');
    script.id = 'shapo-embed-js';
    script.src = 'https://cdn.shapo.io/js/embed.js';
    script.defer = true;
    document.body.appendChild(script);
    // автопрокрутка блога
    let blogIndex = 0;
    const cards = blogSlides.value?.querySelectorAll('.blog-card') ?? [];
    const total = cards.length;
    function updateBlogSlide() {
        if (blogSlides.value && cards.length) {
            const offset = cards[0].offsetWidth + 32;
            blogSlides.value.style.transform = `translateX(-${blogIndex * offset}px)`;
        }
    }
    function nextBlogSlide() {
        blogIndex = (blogIndex + 1) % total;
        updateBlogSlide();
    }
    setInterval(nextBlogSlide, 10000);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['hero']} */ ;
/** @type {__VLS_StyleScopedClasses['steps']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['price-table']} */ ;
/** @type {__VLS_StyleScopedClasses['price-table']} */ ;
/** @type {__VLS_StyleScopedClasses['price-table']} */ ;
/** @type {__VLS_StyleScopedClasses['gallery']} */ ;
/** @type {__VLS_StyleScopedClasses['gallery']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['blog-section']} */ ;
/** @type {__VLS_StyleScopedClasses['blog-content']} */ ;
/** @type {__VLS_StyleScopedClasses['blog-content']} */ ;
/** @type {__VLS_StyleScopedClasses['blog-link']} */ ;
/** @type {__VLS_StyleScopedClasses['video-section']} */ ;
/** @type {__VLS_StyleScopedClasses['video-box']} */ ;
/** @type {__VLS_StyleScopedClasses['video-box']} */ ;
/** @type {__VLS_StyleScopedClasses['video-box']} */ ;
/** @type {__VLS_StyleScopedClasses['map']} */ ;
/** @type {__VLS_StyleScopedClasses['partners']} */ ;
/** @type {__VLS_StyleScopedClasses['partner-logos']} */ ;
/** @type {__VLS_StyleScopedClasses['video-container']} */ ;
/** @type {__VLS_StyleScopedClasses['video-box']} */ ;
/** @type {__VLS_StyleScopedClasses['yt-lazy']} */ ;
/** @type {__VLS_StyleScopedClasses['yt-play']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.main, __VLS_elements.main)({});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "hero" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "hero-content" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "force-white heading header-shadow font-bold leading-snug hero-heading" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "force-white subheading header-shadow font-bold hero-heading" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "force-white tagline header-shadow font-medium hero-heading" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "bg-white text-black p-6 rounded-2xl shadow-2xl w-full mt-6" },
});
/** @type {[typeof ValetForm, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(ValetForm, new ValetForm({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ style: {} },
    ...{ class: "text-section" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "text-box" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "steps" },
    id: "steps",
});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "step-icons" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "step" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/reservation1.webp",
    alt: "Rezervace",
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "step" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/car1.webp",
    alt: "Příjezd",
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "step" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/bus1.webp",
    alt: "Transfer",
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "step" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/marker1.webp",
    alt: "Výstup",
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "step" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/phone1.webp",
    alt: "Zavolání",
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "step" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/marker1.webp",
    alt: "Sraz",
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "step" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/exit1.webp",
    alt: "Odjezd",
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "steps-link" },
});
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    href: "Jak-funguje-HostParking.html",
    target: "_blank",
});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "block-price" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "block-price-box" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "prices" },
    id: "prices",
});
/** @type {[typeof PriceCalendar, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(PriceCalendar, new PriceCalendar({}));
const __VLS_5 = __VLS_4({}, ...__VLS_functionalComponentArgsRest(__VLS_4));
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "info-block" },
});
__VLS_asFunctionalElement(__VLS_elements.br)({});
__VLS_asFunctionalElement(__VLS_elements.br)({});
__VLS_asFunctionalElement(__VLS_elements.br)({});
__VLS_asFunctionalElement(__VLS_elements.br)({});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "gallery" },
    id: "gallery",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "slider" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ onClick: (__VLS_ctx.prevSlide) },
    ...{ class: "arrow left" },
});
// @ts-ignore
[prevSlide,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "slides" },
    ...{ style: ({ transform: `translateX(-${__VLS_ctx.currentIndex * 100}%)` }) },
});
// @ts-ignore
[currentIndex,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "slide" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/img1.webp",
    alt: "hostparking",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "slide" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/img2.webp",
    alt: "levné dlouhodobé parkování",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "slide" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/img3.webp",
    alt: "výhodné parkování letiště Praha",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "slide" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/img4.webp",
    alt: "non stop parkování letiště",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "slide" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/img5.webp",
    alt: "levné parkování letiště Praha",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "slide" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/img6.webp",
    alt: "parkoviště letiště Praha",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "slide" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/img7.webp",
    alt: "nejlevnější parkování letiště Praha",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "slide" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/img8.webp",
    alt: "parkování u letiště Praha",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "slide" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/img9.webp",
    alt: "letiště Václava Havla parking",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "slide" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/img10.webp",
    alt: "hostparking",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "slide" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/img11.webp",
    alt: "non stop parkování letiště",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "slide" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/img12.webp",
    alt: "letiště Václava Havla parking",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "slide" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/img13.webp",
    alt: "parkování letiště Praha",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "slide" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/img14.webp",
    alt: "nejlevnější parkování letiště",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "slide" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/img15.webp",
    alt: "parkování u letiště",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ onClick: (__VLS_ctx.nextSlide) },
    ...{ class: "arrow right" },
});
// @ts-ignore
[nextSlide,];
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "reviews-section" },
    id: "reviews",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    id: "shapo-widget-cf9b24a6173a91eac73d",
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "info-block" },
});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "blog-section" },
    id: "blog",
});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "blog-slider" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "blog-slides" },
    ref: "blogSlides",
});
/** @type {typeof __VLS_ctx.blogSlides} */ ;
// @ts-ignore
[blogSlides,];
for (const [post, i] of __VLS_getVForSourceType((__VLS_ctx.posts))) {
    // @ts-ignore
    [posts,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "blog-card" },
        key: (i),
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "blog-content" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({});
    (post.title);
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
    (post.desc);
    __VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
        href: (post.href),
        ...{ class: "blog-link" },
        target: "_blank",
    });
}
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "info-block" },
});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "video-section" },
    id: "video",
});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "video-container" },
});
for (const [video, i] of __VLS_getVForSourceType((__VLS_ctx.videos))) {
    // @ts-ignore
    [videos,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        key: (i),
        ...{ class: "video-box" },
    });
    if (!video.loaded) {
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ onClick: (...[$event]) => {
                    if (!(!video.loaded))
                        return;
                    __VLS_ctx.loadVideo(i);
                    // @ts-ignore
                    [loadVideo,];
                } },
            ...{ class: "yt-lazy" },
        });
        __VLS_asFunctionalElement(__VLS_elements.img)({
            src: (`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`),
            alt: (`Video ${i + 1}`),
        });
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ class: "yt-play" },
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
        __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (video.text) }, null, null);
        // @ts-ignore
        [vHtml,];
    }
    else {
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "yt-frame" },
        });
        __VLS_asFunctionalElement(__VLS_elements.iframe, __VLS_elements.iframe)({
            src: (`https://www.youtube.com/embed/${video.id}?autoplay=1`),
            title: "YouTube video player",
            frameborder: "0",
            allowfullscreen: true,
            loading: "lazy",
        });
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
        __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (video.text) }, null, null);
        // @ts-ignore
        [vHtml,];
    }
}
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "map" },
    id: "contact",
});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
__VLS_asFunctionalElement(__VLS_elements.iframe, __VLS_elements.iframe)({
    src: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2373.7091435743287!2d14.281165776301087!3d50.078696871523455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTDCsDA0JzQzLjMiTiAxNMKwMTcnMDEuNSJF!5e1!3m2!1sen!2scz!4v1734180611313!5m2!1sen!2scz",
    title: "Mapa umístění HostParking",
    allowfullscreen: true,
    loading: "lazy",
    referrerpolicy: "no-referrer-when-downgrade",
});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    id: "partners",
    ...{ class: "partners" },
});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "partner-logos" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/fixvalet.webp",
    alt: "Fixvalet",
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/Fixparking.webp",
    alt: "Fixparking",
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/prgparking.webp",
    alt: "PRG Parking",
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/PARKINGHUB.webp",
    alt: "ParkingHub",
});
/** @type {__VLS_StyleScopedClasses['hero']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
/** @type {__VLS_StyleScopedClasses['force-white']} */ ;
/** @type {__VLS_StyleScopedClasses['heading']} */ ;
/** @type {__VLS_StyleScopedClasses['header-shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-snug']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['force-white']} */ ;
/** @type {__VLS_StyleScopedClasses['subheading']} */ ;
/** @type {__VLS_StyleScopedClasses['header-shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['force-white']} */ ;
/** @type {__VLS_StyleScopedClasses['tagline']} */ ;
/** @type {__VLS_StyleScopedClasses['header-shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-black']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-section']} */ ;
/** @type {__VLS_StyleScopedClasses['text-box']} */ ;
/** @type {__VLS_StyleScopedClasses['steps']} */ ;
/** @type {__VLS_StyleScopedClasses['step-icons']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['step']} */ ;
/** @type {__VLS_StyleScopedClasses['steps-link']} */ ;
/** @type {__VLS_StyleScopedClasses['block-price']} */ ;
/** @type {__VLS_StyleScopedClasses['block-price-box']} */ ;
/** @type {__VLS_StyleScopedClasses['prices']} */ ;
/** @type {__VLS_StyleScopedClasses['info-block']} */ ;
/** @type {__VLS_StyleScopedClasses['gallery']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['left']} */ ;
/** @type {__VLS_StyleScopedClasses['slides']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['right']} */ ;
/** @type {__VLS_StyleScopedClasses['reviews-section']} */ ;
/** @type {__VLS_StyleScopedClasses['info-block']} */ ;
/** @type {__VLS_StyleScopedClasses['blog-section']} */ ;
/** @type {__VLS_StyleScopedClasses['blog-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['blog-slides']} */ ;
/** @type {__VLS_StyleScopedClasses['blog-card']} */ ;
/** @type {__VLS_StyleScopedClasses['blog-content']} */ ;
/** @type {__VLS_StyleScopedClasses['blog-link']} */ ;
/** @type {__VLS_StyleScopedClasses['info-block']} */ ;
/** @type {__VLS_StyleScopedClasses['video-section']} */ ;
/** @type {__VLS_StyleScopedClasses['video-container']} */ ;
/** @type {__VLS_StyleScopedClasses['video-box']} */ ;
/** @type {__VLS_StyleScopedClasses['yt-lazy']} */ ;
/** @type {__VLS_StyleScopedClasses['yt-play']} */ ;
/** @type {__VLS_StyleScopedClasses['yt-frame']} */ ;
/** @type {__VLS_StyleScopedClasses['map']} */ ;
/** @type {__VLS_StyleScopedClasses['partners']} */ ;
/** @type {__VLS_StyleScopedClasses['partner-logos']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        ValetForm: ValetForm,
        PriceCalendar: PriceCalendar,
        currentIndex: currentIndex,
        nextSlide: nextSlide,
        prevSlide: prevSlide,
        posts: posts,
        videos: videos,
        loadVideo: loadVideo,
        blogSlides: blogSlides,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
