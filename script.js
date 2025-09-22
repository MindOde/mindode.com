// Simple IntersectionObserver-based reveal on scroll + dynamic year
document.getElementById("year").textContent = new Date().getFullYear();

const revealEls = document.querySelectorAll(".reveal, .reveal-up");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el) => io.observe(el));
