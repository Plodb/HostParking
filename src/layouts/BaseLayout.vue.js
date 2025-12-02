import { ref } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
const mobileMenu = ref(false);
function toggleMenu() {
    mobileMenu.value = !mobileMenu.value;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "page" },
});
__VLS_asFunctionalElement(__VLS_elements.header, __VLS_elements.header)({
    ...{ class: "site-header" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "header-container" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "logo" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/",
    ...{ class: "logo-link" },
}));
const __VLS_2 = __VLS_1({
    to: "/",
    ...{ class: "logo-link" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "logo-primary" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "logo-accent" },
});
var __VLS_3;
__VLS_asFunctionalElement(__VLS_elements.nav, __VLS_elements.nav)({
    ...{ class: "nav-desktop" },
});
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    href: "/info.html",
    ...{ class: "nav-link" },
});
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    href: "#prices",
    ...{ class: "nav-link" },
});
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    href: "/info.html",
    ...{ class: "nav-link" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ onClick: (__VLS_ctx.toggleMenu) },
    ...{ class: "menu-toggle" },
});
// @ts-ignore
[toggleMenu,];
if (__VLS_ctx.mobileMenu) {
    // @ts-ignore
    [mobileMenu,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "nav-mobile" },
    });
    __VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
        href: "/jak-to-funguje.html",
        ...{ class: "nav-link" },
    });
    __VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
        href: "#prices",
        ...{ class: "nav-link" },
    });
    __VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
        href: "/blog.html",
        ...{ class: "nav-link" },
    });
}
__VLS_asFunctionalElement(__VLS_elements.main, __VLS_elements.main)({
    ...{ class: "main" },
});
const __VLS_5 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, ]} */ ;
// @ts-ignore
RouterView;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_asFunctionalElement(__VLS_elements.footer, __VLS_elements.footer)({
    ...{ class: "site-footer" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "footer-container" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "footer-logo" },
});
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    href: "https://hostparking.cz",
    target: "_blank",
    rel: "noopener",
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "/IMG-20241214-WA0008.webp",
    alt: "HostParking Logo",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "footer-contacts" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    href: "tel:+420704827317",
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    href: "mailto:rezervace@hostparking.cz",
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "footer-links" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    href: "/oou.html",
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
    href: "/VOP.pdf",
    download: true,
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "footer-copy" },
});
/** @type {__VLS_StyleScopedClasses['page']} */ ;
/** @type {__VLS_StyleScopedClasses['site-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-container']} */ ;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['logo-link']} */ ;
/** @type {__VLS_StyleScopedClasses['logo-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['logo-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-desktop']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-mobile']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['main']} */ ;
/** @type {__VLS_StyleScopedClasses['site-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-container']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-logo']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-contacts']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-links']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-copy']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        RouterView: RouterView,
        RouterLink: RouterLink,
        mobileMenu: mobileMenu,
        toggleMenu: toggleMenu,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
