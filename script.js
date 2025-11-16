function showPage(pageId) {
  // Sembunyikan semua page
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    page.classList.remove("active");
  });

  // Tampilkan page terpilih
  document.getElementById(pageId).classList.add("active");

  // Update active state untuk navbar
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Beri class active pada tombol yang diklik
  const activeLink = [...navLinks].find((link) =>
    link.getAttribute("onclick").includes(pageId)
  );
  if (activeLink) activeLink.classList.add("active");
}

function startMatching() {
  // tampilkan loading overlay
  document.getElementById("loading-overlay").style.display = "flex";

  // simulasi proses pencarian (2–3 detik)
  setTimeout(() => {
    document.getElementById("loading-overlay").style.display = "none";
    showPage("matching"); // pindah halaman
  }, 2500);
}

// Animate gauge fill on profile open
function animateProfileGauges() {
  // gauge main
  const gauge = document.querySelector(".gauge-fill");
  if (gauge) {
    const target = parseInt(gauge.getAttribute("data-target") || "88", 10);
    // animate to target %
    setTimeout(() => (gauge.style.width = target + "%"), 200);
  }

  // strength bars
  const strengthBars = document.querySelectorAll(".strength-bar > div");
  const widths = [85, 92, 78, 88]; // example values
  strengthBars.forEach((el, i) => {
    setTimeout(() => {
      el.style.width = (widths[i] || 70) + "%";
    }, 350 + i * 150);
  });
}

// Call animate when profile page shown
// If you use the showPage(pageId) function, call animateProfileGauges there when pageId === 'profile'.
// If not, we can detect via MutationObserver or simple interval:

const originalShowPage = window.showPage;
window.showPage = function (pageId) {
  // call original behaviour (if exists)
  if (typeof originalShowPage === "function") originalShowPage(pageId);

  // when profile opened, animate gauges
  if (pageId === "profile") {
    setTimeout(animateProfileGauges, 180);
  }
};

// Connect button behaviour (loading then navigate to collaboration)
function connectInfluencer() {
  const btns = [
    document.getElementById("connectBtn"),
    document.getElementById("connectBtnBottom"),
  ].filter(Boolean);
  btns.forEach((b) => {
    b.disabled = true;
    b.innerHTML = "Connecting...";
    b.style.opacity = 0.85;
  });

  // small simulated delay for UI realism
  setTimeout(() => {
    // restore buttons
    btns.forEach((b) => {
      b.disabled = false;
      b.innerHTML = "Connect Now";
      b.style.opacity = 1;
    });

    // show collaboration page
    showPage("collaboration");

    // optionally, show a temporary toast (simple)
    showToast("Connection request sent! Waiting for influencer response.");
  }, 1600);
}

// Simple toast helper
function showToast(msg) {
  let toast = document.createElement("div");
  toast.textContent = msg;
  toast.style.position = "fixed";
  toast.style.bottom = "28px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "rgba(0,0,0,0.8)";
  toast.style.color = "#fff";
  toast.style.padding = "12px 18px";
  toast.style.borderRadius = "12px";
  toast.style.zIndex = 4000;
  toast.style.fontWeight = 600;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
  }, 2500);
  setTimeout(() => {
    toast.remove();
  }, 3200);
}
