/* ==========================================================
   EDIT DATA UNDANGAN DI BAGIAN INI
   Ganti semua teks di dalam tanda kutip sesuai data acara.
   ========================================================== */
const WEDDING_DATA = {
  groomShort: "[NAMA PRIA]",
  groomFull: "[NAMA LENGKAP MEMPELAI PRIA]",
  groomChild: "[PUTRA KE-...]",
  groomFather: "[NAMA AYAH MEMPELAI PRIA]",
  groomMother: "[NAMA IBU MEMPELAI PRIA]",

  brideShort: "[NAMA WANITA]",
  brideFull: "[NAMA LENGKAP MEMPELAI WANITA]",
  brideChild: "[PUTRI KE-...]",
  brideFather: "[NAMA AYAH MEMPELAI WANITA]",
  brideMother: "[NAMA IBU MEMPELAI WANITA]",

  shortDate: "[06 • 09 • 2026]",
  fullDate: "[MINGGU, 06 SEPTEMBER 2026]",

  ceremonyDay: "[03]",
  ceremonyMonthYear: "[OKTOBER 2026]",
  ceremonyTime: "[07.00 WIB – SELESAI]",
  ceremonyVenue: "[TEMPAT AKAD NIKAH]",
  ceremonyAddress: "[ALAMAT LENGKAP AKAD NIKAH]",

  receptionDay: "[06]",
  receptionMonthYear: "[SEPTEMBER 2026]",
  receptionTime: "[17.00 WIB – SELESAI]",
  receptionVenue: "[NAMA GEDUNG / TEMPAT RESEPSI]",
  receptionAddress: "[ALAMAT LENGKAP RESEPSI]",

  /* Format waktu: YYYY-MM-DDTHH:mm:ss+07:00 (WIB) */
  eventDate: "2026-09-06T17:00:00+07:00",

  /* Ganti dengan link Google Maps lokasi acara */
  mapUrl: "https://maps.google.com/",

  bankName: "[NAMA BANK]",
  accountNumber: "[NOMOR REKENING]",
  accountName: "[NAMA PEMILIK REKENING]",
};

const bindWeddingData = () => {
  document.querySelectorAll("[data-bind]").forEach((element) => {
    const key = element.dataset.bind;
    if (Object.prototype.hasOwnProperty.call(WEDDING_DATA, key)) {
      element.textContent = WEDDING_DATA[key];
    }
  });

  document.querySelectorAll(".map-link").forEach((link) => {
    link.href = WEDDING_DATA.mapUrl;
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

const setupCopyAccount = () => {
  const copyButton = document.getElementById("copyAccount");
  const status = document.getElementById("copyStatus");

  copyButton.addEventListener("click", async () => {
    const account = WEDDING_DATA.accountNumber;

    try {
      await navigator.clipboard.writeText(account);
      status.textContent = "Nomor rekening berhasil disalin.";
    } catch (error) {
      status.textContent = `Silakan salin manual: ${account}`;
    }

    window.setTimeout(() => {
      status.textContent = "";
    }, 3000);
  });
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
  setupCopyAccount();
  setupRevealAnimation();
  setupActiveNavigation();

  document.getElementById("currentYear").textContent = new Date().getFullYear();
  updateCountdown();
  window.setInterval(updateCountdown, 1000);
});
