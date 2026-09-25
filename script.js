/* ==========================================================
   EDIT DATA UNDANGAN DI BAGIAN INI
   Ganti semua teks di dalam tanda kutip sesuai data acara.
   ========================================================== */
const WEDDING_DATA = {
  groomShort: "Rizky",
  groomFull: "Rizky Pratama",
  groomChild: "Anak Tunggal",
  groomFather: "Sapto Ardiono",
  groomMother: "Dariati",

  brideShort: "Dini",
  brideFull: "Dini Murjiani",
  brideChild: "Anak Pertama",
  brideFather: "Hari Murioko",
  brideMother: "Elis Suhartini",

  shortDate: "06 • 10 • 2026",
  fullDate: "MINGGU, 06 Oktober 2026",

  ceremonyWeekday: "SABTU",
  ceremonyDay: "03",
  ceremonyMonthYear: "OKTOBER 2026",
  ceremonyTime: "07.00 WIB – SELESAI",
  ceremonyVenue: "Di Rumah Mempelai Wanita",
  ceremonyAddress: "",

  receptionWeekday: "MINGGU",
  receptionDay: "06",
  receptionMonthYear: "SEPTEMBER 2026",
  receptionTime: "17.00 WIB – 21.00 WIB",
  receptionVenue: "Gedung Ex. Lap. App Lambau",
  receptionAddress: "Jl. Lambau, Bareng, Kec. Klojen, Kota Malang",

  /* Target countdown: Akad Nikah, 3 Oktober 2026 pukul 07.00 WIB */
  /* Format waktu: YYYY-MM-DDTHH:mm:ss+07:00 (WIB) */
  eventDate: "2026-10-03T07:00:00+07:00",

  /* Isi alamat Maps akad jika alamat rumah sudah diketahui. */
  ceremonyMapUrl: "",
  receptionMapUrl:
    "https://www.google.com/maps/search/?api=1&query=Gedung%20Ex.%20Lap.%20App%20Lambau%20Jl.%20Lambau%20Bareng%20Klojen%20Kota%20Malang",

};

const bindWeddingData = () => {
  document.querySelectorAll("[data-bind]").forEach((element) => {
    const key = element.dataset.bind;
    if (Object.prototype.hasOwnProperty.call(WEDDING_DATA, key)) {
      element.textContent = WEDDING_DATA[key];
    }
  });

  document.querySelectorAll(".map-link").forEach((link) => {
    const mapKey = `${link.dataset.map}MapUrl`;
    const mapUrl = WEDDING_DATA[mapKey];

    if (mapUrl) {
      link.href = mapUrl;
    } else {
      link.hidden = true;
    }
  });
};

const setGuestName = () => {
  const params = new URLSearchParams(window.location.search);
  const guest = params.get("to")?.trim();
  document.getElementById("guestName").textContent = guest || "Tamu Undangan";
};

const setupInvitationCover = () => {
  const cover = document.getElementById("invitationCover");
  const button = document.getElementById("openInvitation");

  button.addEventListener("click", () => {
    cover.classList.add("is-open");
    document.body.classList.remove("is-locked");

    window.setTimeout(() => cover.setAttribute("aria-hidden", "true"), 800);
  });
};

const updateCountdown = () => {
  const target = new Date(WEDDING_DATA.eventDate).getTime();
  const distance = target - Date.now();
  const safeDistance = Math.max(distance, 0);

  const days = Math.floor(safeDistance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safeDistance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((safeDistance / (1000 * 60)) % 60);
  const seconds = Math.floor((safeDistance / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
};

const setupRevealAnimation = () => {
  const elements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  elements.forEach((element) => observer.observe(element));
};

const setupActiveNavigation = () => {
  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".bottom-nav a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        links.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", isActive);
        });
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
};

document.addEventListener("DOMContentLoaded", () => {
  bindWeddingData();
  setGuestName();
  setupInvitationCover();
  setupRevealAnimation();
  setupActiveNavigation();

  document.getElementById("currentYear").textContent = new Date().getFullYear();
  updateCountdown();
  window.setInterval(updateCountdown, 1000);
});
