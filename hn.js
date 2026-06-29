
/* ==========================================
   SPLASH SCREEN
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const splash = document.querySelector(".splash-screen");

    setTimeout(() => {
        if (splash) {
            splash.classList.add("hide");

            setTimeout(() => {
                splash.style.display = "none";
            }, 800);
        }
    }, 2200);
});


/* ==========================================
   CUSTOM CURSOR (SMOOTH + SAFE)
========================================== */

const cursor = document.querySelector(".cursor");

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {

    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;

    if (cursor) {
        cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }

    requestAnimationFrame(animateCursor);
}

animateCursor();

/* Cursor hide/show */
document.addEventListener("mouseleave", () => {
    if (cursor) cursor.style.opacity = "0";
});

document.addEventListener("mouseenter", () => {
    if (cursor) cursor.style.opacity = "1";
});


/* ==========================================
   CURSOR ACTIVE ON HOVER
========================================== */

const hoverItems = document.querySelectorAll(
    "a, button, .project-card, .certificate-card, .contact-card, .skills-list span"
);

hoverItems.forEach(el => {
    el.addEventListener("mouseenter", () => cursor?.classList.add("active"));
    el.addEventListener("mouseleave", () => cursor?.classList.remove("active"));
});


/* ==========================================
   SCROLL PROGRESS BAR
========================================== */

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    document.documentElement.style.setProperty("--scroll-progress", progress + "%");
});


/* ==========================================
   NAVBAR SHADOW
========================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (!header) return;

    header.style.boxShadow =
        window.scrollY > 50
            ? "0 10px 30px rgba(0,0,0,0.15)"
            : "none";
});


/* ==========================================
   ACTIVE NAV LINK
========================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 120;
        const height = section.clientHeight;

        if (window.scrollY >= top && window.scrollY < top + height) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });

});


/* ==========================================
   SCROLL REVEAL (FIXED + OPTIMIZED)
========================================== */

const revealElements = document.querySelectorAll(".section, .project-card, .glass-card, .certificate-card, .contact-card");

function revealOnScroll() {

    const trigger = window.innerHeight * 0.85;

    revealElements.forEach(el => {

        const top = el.getBoundingClientRect().top;

        if (top < trigger) {
            el.classList.add("active");
        }

    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/* ==========================================
   BUTTON RIPPLE EFFECT
========================================== */

document.querySelectorAll(".btn").forEach(btn => {

    btn.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);

        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
        ripple.style.top = (e.clientY - rect.top - size / 2) + "px";

        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});


/* ==========================================
   ADVANCED 3D MOUSE TRACKING ON CARDS
========================================== */

const trackedCards = document.querySelectorAll('.project-card, .certificate-card, .contact-card, .glass-card');

trackedCards.forEach(card => {
    let isHovering = false;

    card.addEventListener('mouseenter', () => {
        isHovering = true;
        card.classList.add('card-active');
    });

    card.addEventListener('mouseleave', () => {
        isHovering = false;
        card.classList.remove('card-active');
        
        // Reset transforms
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        card.style.boxShadow = '';
    });

    card.addEventListener('mousemove', (e) => {
        if (!isHovering) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation angles
        const rotateX = ((y - centerY) / centerY) * 12;
        const rotateY = ((x - centerX) / centerX) * 12;

        // Calculate glow position
        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;

        // Apply 3D transform
        card.style.transform = `perspective(1200px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;

        // Apply dynamic glow shadow
        card.style.boxShadow = `
            0 0 40px rgba(14, 165, 233, 0.6),
            0 0 80px rgba(6, 182, 212, 0.4),
            0 0 120px rgba(16, 185, 129, 0.3),
            ${(x - centerX) * 0.1}px ${(y - centerY) * 0.1}px 40px rgba(14, 165, 233, 0.3)
        `;

        // Add gradient background animation
        if (card.classList.contains('project-card') || card.classList.contains('certificate-card')) {
            card.style.backgroundPosition = `${glowX}% ${glowY}%`;
        }
    });
});


/* ==========================================
   MAGNETIC BUTTON EFFECT
========================================== */

const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Magnetic pull effect
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 100;

        if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 8;
            btn.style.transform = `translate(${x * force * 0.1}px, ${y * force * 0.1}px) scale(1.02)`;
        }
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});


/* ==========================================
   HERO IMAGE PARALLAX (SAFE)
========================================== */

const heroImg = document.querySelector(".hero-image img");

window.addEventListener("scroll", () => {
    if (!heroImg) return;

    heroImg.style.transform = `translateY(${window.scrollY * 0.05}px)`;
});


/* ==========================================
   LOADED STATE
========================================== */

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});