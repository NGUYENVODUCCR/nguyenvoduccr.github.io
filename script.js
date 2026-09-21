const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const progressBar = document.getElementById("progressBar");

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);
  themeIcon.textContent = theme === "dark" ? "☀" : "☾";
}

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  setTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  setTheme("dark");
} else {
  setTheme("light");
}

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${height > 0 ? (scrollTop / height) * 100 : 0}%`;
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
   const b2bGallery = document.querySelector(".b2b-gallery");

   const b2bLightbox = document.getElementById("b2bLightbox");
   const b2bLightboxImage = document.getElementById("b2bLightboxImage");
   const b2bLightboxClose = document.getElementById("b2bLightboxClose");
   const b2bLightboxPrev = document.getElementById("b2bLightboxPrev");
   const b2bLightboxNext = document.getElementById("b2bLightboxNext");
   
   const b2bLightboxCurrent =
     document.getElementById("b2bLightboxCurrent");
   
   const b2bLightboxTotal =
     document.getElementById("b2bLightboxTotal");
   
   const b2bLightboxCaption =
     document.getElementById("b2bLightboxCaption");
   
   
   if (b2bGallery && b2bLightbox) {
   
     const galleryItems = [
       ...b2bGallery.querySelectorAll(".b2b-gallery-item")
     ];
   
     let currentImageIndex = 0;
   
     const totalImages = galleryItems.length;
   
     b2bLightboxTotal.textContent = totalImages;
   
   
     function openB2BLightbox(index) {
   
       if (index < 0) {
         index = totalImages - 1;
       }
   
       if (index >= totalImages) {
         index = 0;
       }
   
       currentImageIndex = index;
   
       const image =
         galleryItems[currentImageIndex].querySelector("img");
   
       if (!image) {
         return;
       }
   
       b2bLightboxImage.src = image.src;
   
       b2bLightboxImage.alt = image.alt;
   
       b2bLightboxCaption.textContent = image.alt;
   
       b2bLightboxCurrent.textContent =
         currentImageIndex + 1;
   
       b2bLightbox.classList.add("open");
   
       document.body.style.overflow = "hidden";
     }
   
   
     function closeB2BLightbox() {
   
       b2bLightbox.classList.remove("open");
   
       document.body.style.overflow = "";
   
       b2bLightboxImage.src = "";
     }
   
   
     function showPreviousImage() {
   
       openB2BLightbox(
         currentImageIndex - 1
       );
   
     }
   
   
     function showNextImage() {
   
       openB2BLightbox(
         currentImageIndex + 1
       );
   
     }
   
     galleryItems.forEach((item, index) => {
   
       item.addEventListener("click", () => {
   
         openB2BLightbox(index);
   
       });
   
     });
   
     b2bLightboxPrev.addEventListener(
       "click",
       (event) => {
   
         event.stopPropagation();
   
         showPreviousImage();
   
       }
     );
   
     b2bLightboxNext.addEventListener(
       "click",
       (event) => {
   
         event.stopPropagation();
   
         showNextImage();
   
       }
     );
   
     b2bLightboxClose.addEventListener(
       "click",
       (event) => {
   
         event.stopPropagation();
   
         closeB2BLightbox();
   
       }
     );
   
     b2bLightbox.addEventListener(
       "click",
       (event) => {
   
         if (event.target === b2bLightbox) {
   
           closeB2BLightbox();
   
         }
   
       }
     );
   
     document.addEventListener(
       "keydown",
       (event) => {
   
         if (!b2bLightbox.classList.contains("open")) {
           return;
         }
   
   
         if (event.key === "Escape") {
   
           closeB2BLightbox();
   
         }
   
   
         if (event.key === "ArrowLeft") {
   
           showPreviousImage();
   
         }
   
   
         if (event.key === "ArrowRight") {
   
           showNextImage();
   
         }
   
       }
     );
   
   }