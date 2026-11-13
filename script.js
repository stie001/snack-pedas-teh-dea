document.addEventListener("DOMContentLoaded", () => {
  // 1. Efek Bayangan pada Navbar saat Halaman Di-scroll
  const navbar = document.getElementById("mainNavbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 2. NAVBAR BERGERAK SESUAI HALAMAN / POSISI SCROLL (Scroll Spy)
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  function changeNavOnScroll() {
    let scrollPos = window.scrollY + 120; // Offset biar pas deteksi posisinya

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", changeNavOnScroll);

  // 3. Animasi Muncul Halus (Scroll Reveal)
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // 4. Animasi Angka Naik Otomatis (6 Jenis, 10 Mitra, 100+ Terjual)
  const counters = document.querySelectorAll(".counter");
  let counterStarted = false;

  const statsSection = document.querySelector(".stats-container");
  if (statsSection) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !counterStarted) {
          counterStarted = true;
          counters.forEach((counter) => {
  const target = +counter.getAttribute("data-target");
  counter.textContent = 0;   // <- tambahkan baris ini
            const duration = 1200;
            const stepTime = Math.max(Math.floor(duration / target), 25);
            let current = 0;

            const timer = setInterval(() => {
              current += 1;
              counter.textContent = current;
              if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
              }
            }, stepTime);
          });
        }
      },
      { threshold: 0.4 }
    );

    

    counterObserver.observe(statsSection);
  }

  // 5. Menutup Menu Navbar Otomatis di HP setelah Menu Diklik
  const navbarCollapse = document.getElementById("navbarNav");
  const allNavItems = document.querySelectorAll(".navbar-nav .nav-link, .btn-kontak-nav");
  allNavItems.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
});