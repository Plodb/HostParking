<template>
  <main>
    <!-- Hero -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="force-white heading header-shadow font-bold leading-snug hero-heading">
          Levné parkování u letiště Václava Havla v Praze 
        </h1>
        <p class="force-white subheading header-shadow font-bold hero-heading">
          Parkování u letiště Praha
        </p>
        <p class="force-white tagline header-shadow font-medium hero-heading">
          Rezervujte online na HostParking.cz
        </p>
        <div class="bg-white text-black p-6 rounded-2xl shadow-2xl w-full mt-6">
          <ValetForm />
        </div>
      </div>
    </section>

    <section style="padding-top: 21rem;" class="text-section">
      <div class="text-box">
        <p>Sleva pri platbe hotove </p>
      </div>
    </section>

    <!-- Jak to funguje -->
    <section class="steps" id="steps">
      <h3>Jak to funguje</h3>
      <div class="step-icons">
        <div class="step"><img src="/reservation1.webp" alt="Rezervace" /><p>Rezervace</p></div>
        <div class="step"><img src="/car1.webp" alt="Příjezd" /><p>Příjezd na parkovište</p></div>
        <div class="step"><img src="/bus1.webp" alt="Transfer" /><p>Transfer na letiště</p></div>
        <div class="step"><img src="/marker1.webp" alt="Výstup" /><p>Místo výstupu</p></div>
        <div class="step"><img src="/phone1.webp" alt="Zavolání" /><p>Zavolání po návratu</p></div>
        <div class="step"><img src="/marker1.webp" alt="Sraz" /><p>Srazové místo</p></div>
        <div class="step"><img src="/exit1.webp" alt="Odjezd" /><p>Odjezd na parkovište</p></div>
      </div>
      <div class="steps-link">
        <a href="Jak-funguje-HostParking.html" target="_blank">
          HostParking krok za krokem – vše, co potřebujete vědět.
        </a>
      </div>
    </section>

    <!-- Block price -->
    <section class="block-price">
      <div class="block-price-box">
        <p>Parkování za příznivé ceny, které potěší každého cestovatele. Říká se, že rozumná volba začíná právě tady.</p>
        <p>Čím delší pobyt, tím obvykle výhodnější cena za den. Tak trochu princip "čím víc, tím líp" – ale v dobrém slova smyslu.</p>
        <p>Ceny se přizpůsobují sezóně, ale zůstávají fér a bez přehánění. Jsme prostě takový normální parking.</p>
      </div>
    </section>

    <!-- Prices -->
<section class="prices" id="prices">
  <PriceCalendar />
</section>

    <p class="info-block">
  Podívejte se na naše aktuální fotografie přímo z parkoviště.<br><br>
  Vše je v pořádku, upravené a připravené – přesně tak, jak to má být.<br><br>
  Naše fotografie níže byly pořízeny v roce 2025 a odrážejí současný stav našeho areálu.
</p>

    <!-- Gallery -->
    <section class="gallery" id="gallery">
  <div class="slider">
    <div class="arrow left" @click="prevSlide">&#10094;</div>
    <div class="slides" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div class="slide"><img src="/img1.webp" alt="hostparking" /></div>
      <div class="slide"><img src="/img2.webp" alt="levné dlouhodobé parkování" /></div>
      <div class="slide"><img src="/img3.webp" alt="výhodné parkování letiště Praha" /></div>
      <div class="slide"><img src="/img4.webp" alt="non stop parkování letiště" /></div>
      <div class="slide"><img src="/img5.webp" alt="levné parkování letiště Praha" /></div>
      <div class="slide"><img src="/img6.webp" alt="parkoviště letiště Praha" /></div>
      <div class="slide"><img src="/img7.webp" alt="nejlevnější parkování letiště Praha" /></div>
      <div class="slide"><img src="/img8.webp" alt="parkování u letiště Praha" /></div>
      <div class="slide"><img src="/img9.webp" alt="letiště Václava Havla parking" /></div>
      <div class="slide"><img src="/img10.webp" alt="hostparking" /></div>
      <div class="slide"><img src="/img11.webp" alt="non stop parkování letiště" /></div>
      <div class="slide"><img src="/img12.webp" alt="letiště Václava Havla parking" /></div>
      <div class="slide"><img src="/img13.webp" alt="parkování letiště Praha" /></div>
      <div class="slide"><img src="/img14.webp" alt="nejlevnější parkování letiště" /></div>
      <div class="slide"><img src="/img15.webp" alt="parkování u letiště" /></div>
    </div>
    <div class="arrow right" @click="nextSlide">&#10095;</div>
  </div>
</section>
<section class="reviews-section" id="reviews">
  <div id="shapo-widget-cf9b24a6173a91eac73d"></div>
</section>
<p class="info-block">
  Podívejte se na náš blog – najdete tam užitečné tipy a informace pro cestující.
</p>
<!-- BLOG -->
<section class="blog-section" id="blog">
  <h3>Užitečné tipy pro vaše cesty</h3>
  <div class="blog-slider">
    <div class="blog-slides" ref="blogSlides">
      <div class="blog-card" v-for="(post, i) in posts" :key="i">
        <div class="blog-content">
          <h4>{{ post.title }}</h4>
          <p>{{ post.desc }}</p>
          <a :href="post.href" class="blog-link" target="_blank">Číst více</a>
        </div>
      </div>
    </div>
  </div>
</section>
<p class="info-block">
    Poprvé u nás? Nemůžete nás najít? Mrkněte na video, které vás navede přímo k nám.
  </p>
<!-- VIDEO -->
<section class="video-section" id="video">
    <h3>Jak se k nám dostat – podívejte se na video</h3>
    <div class="video-container">
      <div
        v-for="(video, i) in videos"
        :key="i"
        class="video-box"
      >
        <!-- Если видео не загружено — показываем превью -->
        <div v-if="!video.loaded" class="yt-lazy" @click="loadVideo(i)">
          <img :src="`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`" :alt="`Video ${i+1}`" />
          <button class="yt-play">▶</button>
          <p v-html="video.text"></p>
        </div>

        <!-- Если видео загружено — iframe -->
        <div v-else class="yt-frame">
          <iframe
            :src="`https://www.youtube.com/embed/${video.id}?autoplay=1`"
            title="YouTube video player"
            frameborder="0"
            allowfullscreen
            loading="lazy"
          ></iframe>
          <p v-html="video.text"></p>
        </div>
      </div>
    </div>
  </section>

<!-- MAP -->
<section class="map" id="contact">
  <h3>Kde nás najdete</h3>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2373.7091435743287!2d14.281165776301087!3d50.078696871523455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTDCsDA0JzQzLjMiTiAxNMKwMTcnMDEuNSJF!5e1!3m2!1sen!2scz!4v1734180611313!5m2!1sen!2scz"
    title="Mapa umístění HostParking"
    allowfullscreen
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
</section>

    <!-- Partners -->
    <section id="partners" class="partners">
      <h3>Naši partneři</h3>
      <div class="partner-logos">
        <a href="#"><img src="/fixvalet.webp" alt="Fixvalet" /></a>
        <img src="/Fixparking.webp" alt="Fixparking" />
        <img src="/prgparking.webp" alt="PRG Parking" />
        <img src="/PARKINGHUB.webp" alt="ParkingHub" />
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
/* ===== Imports ===== */
import { ref, onMounted } from 'vue'
import ValetForm from '../components/ValetForm.vue'
import PriceCalendar from '../components/PriceCalendar.vue'

/* ===== Gallery slider ===== */
const currentIndex = ref(0)
const totalSlides = 17

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % totalSlides
}
function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + totalSlides) % totalSlides
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
]

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
])

function loadVideo(index: number) {
  videos.value[index].loaded = true
}


/* ===== Blog slider ===== */
const blogSlides = ref<HTMLElement | null>(null)

onMounted(() => {
  // подключение внешнего виджета (shapo)
  const script = document.createElement('script')
  script.id = 'shapo-embed-js'
  script.src = 'https://cdn.shapo.io/js/embed.js'
  script.defer = true
  document.body.appendChild(script)

  // автопрокрутка блога
  let blogIndex = 0
  const cards = blogSlides.value?.querySelectorAll('.blog-card') ?? []
  const total = cards.length

  function updateBlogSlide() {
    if (blogSlides.value && cards.length) {
      const offset = (cards[0] as HTMLElement).offsetWidth + 32
      blogSlides.value.style.transform = `translateX(-${blogIndex * offset}px)`
    }
  }

  function nextBlogSlide() {
    blogIndex = (blogIndex + 1) % total
    updateBlogSlide()
  }

  setInterval(nextBlogSlide, 10000)
})
</script>


<style scoped>
:root {
  --primary: #6a0dad;
  --accent: #ffcc00;
}

/* ================= HERO ================= */
.hero {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-image: url('/bg-airport.webp');
  background-size: cover;
  background-position: center;
  text-align: center;
  color: white;
}
.hero::after {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 0;
}
.hero-content {
  position: relative;
  z-index: 1;
  padding: 1rem;
  max-width: 1200px;
}
.force-white { color: white !important; }
.heading {
  font-size: clamp(1.466rem, 3.33vw, 2.333rem);
}

.subheading {
  font-size: clamp(1.333rem, 2.66vw, 2rem);
}

.tagline {
  font-size: clamp(0.933rem, 2vw, 1.466rem);
}
.header-shadow { text-shadow: 0 1px 3px rgba(0,0,0,.7); }

/* ================= INFO BLOCK ================= */
.info-block {
  background: linear-gradient(145deg, #ffffff, #f3f0ff);
  border: 2px solid var(--primary);
  color: var(--primary);
  padding: 1.5rem;
  border-radius: 16px;
  width: fit-content;
  font-size: 1.1rem;
  max-width: 95%;
  margin: 3rem auto;
  text-align: center;
  box-shadow: 0 10px 30px rgba(106, 13, 173, 0.1);
}

/* ================= TEXT SECTION ================= */
.text-section { background: white; padding: 3rem 1rem; }
.text-box {
  border: 3px solid var(--primary);
  color: var(--primary);
  text-align: center;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 900px;
  margin: 0 auto;
}

/* ================= STEPS ================= */
.steps {
  background: white;
  padding: 4rem 1rem;
  text-align: center;
}
.steps h3 {
  color: var(--primary);
  font-size: 2rem;
  margin-bottom: 2rem;
}
.step-icons { display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; }
.step { flex: 0 1 120px; text-align: center; }
.step img { max-width: 80px; margin: 0 auto 0.5rem; }
.step p { color: var(--primary); font-weight: bold; }
.steps-link a {
  display: inline-block;
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: var(--accent);
  color: var(--primary);
  font-weight: bold;
  border-radius: 8px;
  text-decoration: none;
}

/* ================= BLOCK PRICE ================= */
.block-price {
  position: relative;
  padding: 4rem 2rem;
  text-align: center;
  background-image: url('/block-price.webp');
  background-size: cover;
  background-position: center;
}
.block-price-box {
  background: rgba(255,255,255,0.9);
  border: 3px solid var(--primary);
  border-radius: 1rem;
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  color: var(--primary);
}

/* ================= PRICES ================= */
.prices {
  background: white;
  padding: 4rem 2rem;
  text-align: center;
}
.price-table {
  max-width: 600px;
  margin: 0 auto;
  border-collapse: collapse;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  border-radius: 12px;
  overflow: hidden;
}
.price-table th,
.price-table td {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}
.price-table th {
  background: var(--accent);
  color: #000;
}

/* ================= GALLERY ================= */
.gallery {
  position: relative;
  padding: 4rem 2rem;
  text-align: center;
  background-image: url('/gallery-back.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}
.gallery::after {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: hsla(298, 26%, 48%, 0.1);
  backdrop-filter: blur(3px);
  z-index: 0;
}
.gallery h3 {
  font-size: 2rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}
.slider {
  background-color: rgba(255, 255, 255, 0.85);
  padding: 2rem;
  border-radius: 16px;
  max-width: 1300px;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  position: relative;
  z-index: 1;
  overflow: hidden;
}
.slides { display: flex; transition: transform 0.6s ease-in-out; will-change: transform; }
.slide { flex-shrink: 0; width: 100%; padding: 1rem; }
.slide img {
  width: 100%;
  max-width: 900px;
  margin: auto;
  display: block;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  object-fit: cover;
}
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2.5rem;
  color: white;
  background: rgba(0,0,0,0.5);
  padding: 0.5rem 1rem;
  cursor: pointer;
  z-index: 10;
  border-radius: 8px;
  user-select: none;
}
.arrow.left { left: 10px; }
.arrow.right { right: 10px; }

/* ================= BLOG ================= */
.blog-section {
  background: white;
  padding: 4rem 2rem;
  text-align: center;
}
.blog-section h3 {
  font-size: 2rem;
  color: var(--primary);
  margin-bottom: 2rem;
}
.blog-slider {
  overflow: hidden;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}
.blog-slides { display: flex; transition: transform 0.6s ease-in-out; }
.blog-card {
  background: #f9f9ff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  flex-shrink: 0;
  width: 100%;
  max-width: 300px;
  margin: 0 1rem;
  overflow: hidden;
  transition: transform 0.3s ease;
}
.blog-content { padding: 1rem; text-align: left; }
.blog-content h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--primary);
}
.blog-content p {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  color: #555;
}
.blog-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: bold;
}
.blog-link:hover { text-decoration: underline; }

/* ================= VIDEO ================= */
.video-section {
  background: linear-gradient(to bottom, #f5f5ff 0%, #ffffff 100%);
  padding: 4rem 2rem;
  text-align: center;
}
.video-section h3 {
  font-size: 2rem;
  color: var(--primary);
  margin-bottom: 2rem;
}
.video-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}
.video-box {
  flex: 1 1 400px;
  max-width: 480px;
  background: #f5f5ff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}
.video-box:hover {
  box-shadow: 0 10px 30px rgba(106, 13, 173, 0.3);
  transform: scale(1.02);
}
.video-box iframe {
  width: 100%;
  height: 270px;
  border-radius: 8px;
}
.video-box p {
  margin-top: 1rem;
  color: #444;
  font-size: 1rem;
}

/* ================= MAP ================= */
.map {
  padding: 2rem;
  text-align: center;
}
.map iframe {
  width: 100%;
  max-width: 1000px;
  height: 400px;
  border: none;
  border-radius: 8px;
}

/* ================= PARTNERS ================= */
.partners {
  background: var(--primary);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}
.partners h3 {
  color: var(--accent);
  margin-bottom: 2rem;
}
.partner-logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}
.partner-logos img { max-height: 70px; }
.video-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}
.video-box {
  flex: 1 1 400px;
  max-width: 480px;
}
.yt-lazy {
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}
.yt-lazy img {
  width: 100%;
  display: block;
}
.yt-play {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  font-size: 3rem;
  border: none;
  background: rgba(0,0,0,0.6);
  color: #fff;
  border-radius: 50%;
  width: 64px; height: 64px;
  cursor: pointer;
  transition: background 0.3s;
}
.yt-play:hover { background: rgba(0,0,0,0.8); }

.yt-frame iframe {
  width: 100%;
  height: 270px;
  border-radius: 12px;
}
</style>

