/* =================================================================
   Aatmanirbhar Nari — Vanilla JavaScript
   Beginner-friendly. Each function does ONE small thing and is
   commented so you can explain it line-by-line in your viva.
================================================================= */

/* -----------------------------------------------------------------
   1) HIDE LOADING SCREEN
   When the whole page (images, fonts) finishes loading, fade out
   the loader so the real content is visible.
----------------------------------------------------------------- */
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  // small delay so the spinner is visible even on fast networks
  setTimeout(() => loader.classList.add("hidden"), 400);
});

/* -----------------------------------------------------------------
   2) NAVBAR SHRINK ON SCROLL
   Add a CSS class when the user scrolls down, so the navbar gets
   smaller and shows a subtle shadow.
----------------------------------------------------------------- */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* -----------------------------------------------------------------
   3) MOBILE MENU TOGGLE
   On small screens, tapping the hamburger opens / closes the menu.
----------------------------------------------------------------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

// Close mobile menu after a link is tapped
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
  });
});

/* -----------------------------------------------------------------
   4) SCROLL REVEAL ANIMATIONS
   Any element with class "reveal" becomes visible (fade + slide-up)
   the first time it enters the viewport. We use IntersectionObserver
   because it's modern, fast, and easy to read.
----------------------------------------------------------------- */
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target); // animate only once
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach(function (el) {
  revealObserver.observe(el);
});

/* -----------------------------------------------------------------
   5) ANIMATED COUNTERS (STATS SECTION)
   When a stat number scrolls into view, count from 0 to its target.
----------------------------------------------------------------- */
const counters = document.querySelectorAll(".stat__num");

function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-target"), 10);
  const duration = 1500; // total animation time in ms
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    // Ease-out makes the count slow down near the end (feels nicer)
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

counters.forEach(function (c) {
  counterObserver.observe(c);
});

/* -----------------------------------------------------------------
   6) FAQ ACCORDION
   Clicking a question expands its answer; clicking again hides it.
   Only one item is open at a time for a cleaner UX.
----------------------------------------------------------------- */
const faqItems = document.querySelectorAll(".faq__item");

faqItems.forEach(function (item) {
  const question = item.querySelector(".faq__q");
  const answer = item.querySelector(".faq__a");

  question.addEventListener("click", function () {
    const isOpen = item.classList.contains("open");

    // Close every item first
    faqItems.forEach(function (other) {
      other.classList.remove("open");
      other.querySelector(".faq__a").style.maxHeight = null;
    });

    // Open the clicked one (if it wasn't already open)
    if (!isOpen) {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

/* -----------------------------------------------------------------
   7) CONTACT FORM VALIDATION
   Pure JavaScript — no server. We check:
   - name is not empty (min 2 chars)
   - email looks like a real email (regex)
   - message has at least 10 characters
   If valid, we show a friendly success message and reset the form.
----------------------------------------------------------------- */
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("formSuccess");

// Simple email pattern: something@something.something
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Helper to show an error under a field
function showError(fieldId, message) {
  document.getElementById(fieldId + "Error").textContent = message;
}

// Helper to clear all previous errors
function clearErrors() {
  ["name", "email", "message"].forEach(function (id) {
    showError(id, "");
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();        // stop the page from reloading
  clearErrors();
  successMsg.hidden = true;

  // Read trimmed values from the inputs
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  let isValid = true;

  if (name.length < 2) {
    showError("name", "Please enter your full name.");
    isValid = false;
  }
  if (!emailPattern.test(email)) {
    showError("email", "Please enter a valid email address.");
    isValid = false;
  }
  if (message.length < 10) {
    showError("message", "Message must be at least 10 characters.");
    isValid = false;
  }

  if (isValid) {
    successMsg.hidden = false;
    form.reset();
    // hide the success note again after 4 seconds
    setTimeout(() => (successMsg.hidden = true), 4000);
  }
});

/* -----------------------------------------------------------------
   8) BACK-TO-TOP BUTTON
   Appears after the user scrolls down. Clicking it scrolls smoothly
   back to the top of the page.
----------------------------------------------------------------- */
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 500) {
    toTop.classList.add("visible");
  } else {
    toTop.classList.remove("visible");
  }
});

toTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* -----------------------------------------------------------------
   9) AUTO YEAR IN FOOTER
   Saves you from updating the copyright year every January.
----------------------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();
