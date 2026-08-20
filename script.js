document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       MOBILE MENU
    ========================= */

    const menuButton = document.getElementById("menuButton");
    const navLinks = document.querySelector(".nav-links");
    const navigationLinks = document.querySelectorAll(".nav-links a");

    function closeMenu() {
        if (!menuButton || !navLinks) return;

        navLinks.classList.remove("active");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
    }

    function toggleMenu() {
        if (!menuButton || !navLinks) return;

        const isOpen = navLinks.classList.toggle("active");

        menuButton.textContent = isOpen ? "×" : "☰";
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    }

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleMenu();
        });

        navLinks.addEventListener("click", function (event) {
            event.stopPropagation();
        });

        navigationLinks.forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", function () {
            closeMenu();
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 800) {
                closeMenu();
            }
        });
    }


    /* =========================
       REVIEWS SLIDER
    ========================= */

    const reviews = document.querySelectorAll(".review");
    const dots = document.querySelectorAll(".review-dot");
    const prevReview = document.getElementById("prevReview");
    const nextReview = document.getElementById("nextReview");

    let currentReview = 0;

    function showReview(index) {
        if (!reviews.length) return;

        reviews.forEach(function (review) {
            review.classList.remove("active");
        });

        dots.forEach(function (dot) {
            dot.classList.remove("active");
        });

        reviews[index].classList.add("active");

        if (dots[index]) {
            dots[index].classList.add("active");
        }
    }

    if (reviews.length) {
        showReview(currentReview);

        if (nextReview) {
            nextReview.addEventListener("click", function () {
                currentReview++;

                if (currentReview >= reviews.length) {
                    currentReview = 0;
                }

                showReview(currentReview);
            });
        }

        if (prevReview) {
            prevReview.addEventListener("click", function () {
                currentReview--;

                if (currentReview < 0) {
                    currentReview = reviews.length - 1;
                }

                showReview(currentReview);
            });
        }

        dots.forEach(function (dot) {
            dot.addEventListener("click", function () {
                currentReview = Number(dot.dataset.review);
                showReview(currentReview);
            });
        });
    }


    /* =========================
       CONTACT FORM
    ========================= */

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm && formMessage) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            formMessage.textContent = "Thank you! Your message has been sent.";
            contactForm.reset();
        });
    }


    /* =========================
       HEADER ON SCROLL
    ========================= */

    const header = document.querySelector(".header");

    function updateHeader() {
        if (!header) return;

        header.classList.toggle("scrolled", window.scrollY > 50);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const trackedSections = document.querySelectorAll("#home, #about, #menu, #gallery, #contact");
    const trackedNavLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateActiveNavigation() {
        if (!trackedSections.length || !trackedNavLinks.length) return;

        const headerOffset = header ? header.offsetHeight + 80 : 140;
        let currentSectionId = "home";

        trackedSections.forEach(function (section) {
            const sectionTop = section.offsetTop - headerOffset;

            if (window.scrollY >= sectionTop) {
                currentSectionId = section.id;
            }
        });

        trackedNavLinks.forEach(function (link) {
            const isActive = link.getAttribute("href") === "#" + currentSectionId;
            link.classList.toggle("active", isActive);
        });
    }

    updateActiveNavigation();
    window.addEventListener("scroll", updateActiveNavigation, { passive: true });
    window.addEventListener("resize", updateActiveNavigation);


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(
        ".reveal-up, .reveal-left, .reveal-right"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach(function (element) {
            element.classList.add("reveal-ready");
            observer.observe(element);
        });
    }


    /* =========================
       GALLERY LIGHTBOX
    ========================= */

    const galleryImages = document.querySelectorAll(".gallery-item img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");

    let currentGalleryImage = 0;
    let lastFocusedElement = null;

    function showGalleryImage() {
        if (!galleryImages.length || !lightboxImage) return;

        lightboxImage.src = galleryImages[currentGalleryImage].src;
        lightboxImage.alt = galleryImages[currentGalleryImage].alt;
    }

    function openLightbox(index) {
        if (!lightbox || !lightboxImage || !galleryImages.length) return;

        currentGalleryImage = index;
        showGalleryImage();

        lastFocusedElement = document.activeElement;
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        if (lightboxClose) {
            lightboxClose.focus();
        }
    }

    function closeLightbox() {
        if (!lightbox) return;

        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    function nextGalleryImage() {
        if (!galleryImages.length) return;

        currentGalleryImage++;

        if (currentGalleryImage >= galleryImages.length) {
            currentGalleryImage = 0;
        }

        showGalleryImage();
    }

    function previousGalleryImage() {
        if (!galleryImages.length) return;

        currentGalleryImage--;

        if (currentGalleryImage < 0) {
            currentGalleryImage = galleryImages.length - 1;
        }

        showGalleryImage();
    }

    if (lightbox && lightboxImage && galleryImages.length) {
        galleryImages.forEach(function (image, index) {
            image.parentElement.addEventListener("click", function () {
                openLightbox(index);
            });
        });

        if (lightboxClose) {
            lightboxClose.addEventListener("click", closeLightbox);
        }

        if (lightboxNext) {
            lightboxNext.addEventListener("click", nextGalleryImage);
        }

        if (lightboxPrev) {
            lightboxPrev.addEventListener("click", previousGalleryImage);
        }

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }


    /* =========================
       KEYBOARD
    ========================= */

    document.addEventListener("keydown", function (event) {
        const lightboxIsOpen = lightbox && lightbox.classList.contains("active");

        if (event.key === "Escape") {
            if (lightboxIsOpen) {
                closeLightbox();
            }

            closeMenu();
            return;
        }

        if (!lightboxIsOpen) return;

        if (event.key === "ArrowRight") {
            nextGalleryImage();
        }

        if (event.key === "ArrowLeft") {
            previousGalleryImage();
        }
    });

});
