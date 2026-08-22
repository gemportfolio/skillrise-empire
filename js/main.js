document.addEventListener("DOMContentLoaded", async () => {
    await loadComponents();

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 700,
            once: true
        });
    }

    updateUrgencyCountdown();
    setInterval(updateUrgencyCountdown, 1000);
});

// Toggle mobile navigation
function toggleMobileNav(forceState) {
    const mobileNav = document.getElementById("mobileNav");
    const menuIcon = document.getElementById("menuIcon");
    const menuButton = document.querySelector('[aria-controls="mobileNav"]');

    const isOpen = !mobileNav.classList.contains("hidden");

    const shouldOpen = typeof forceState === "boolean"
        ? forceState
        : !isOpen;

    if (shouldOpen) {
        mobileNav.classList.remove("hidden");
        menuIcon.classList.remove("bi-list");
        menuIcon.classList.add("bi-x-lg");
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.querySelector(".sr-only").textContent = "Close menu";
    } else {
        mobileNav.classList.add("hidden");
        menuIcon.classList.remove("bi-x-lg");
        menuIcon.classList.add("bi-list");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.querySelector(".sr-only").textContent = "Open menu";
    }
}

// 12-hour urgency countdown
const TWELVE_HOURS = 12 * 60 * 60 * 1000;
// get the deadline from local storage
function getUrgencyDeadline() {
    let deadline = localStorage.getItem("skillRiseUrgencyDeadline");

    if (!deadline) {
        deadline = Date.now() + TWELVE_HOURS;
        localStorage.setItem("skillRiseUrgencyDeadline", deadline);
    }

    return Number(deadline);
}
// update the countdown
function updateUrgencyCountdown() {
    const distance = getUrgencyDeadline() - Date.now();

    const hoursElement = document.getElementById("urgency-hours");
    const minutesElement = document.getElementById("urgency-minutes");
    const secondsElement = document.getElementById("urgency-seconds");

    if (!hoursElement || !minutesElement || !secondsElement) {
        return;
    }

    if (distance <= 0) {
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        return;
    }

    const hours = Math.floor(
        distance / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");
}

document.addEventListener("submit", function (e) {
    if (e.target.id !== "skillPathForm") return;

    e.preventDefault();

    const form = e.target;

    const name =
        form.querySelector("#full-name").value.trim();

    const location =
        form.querySelector("#location").value.trim();

    const email =
        form.querySelector("#email").value.trim();

    const whatsapp =
        form.querySelector("#whatsapp").value.trim();

    const fieldOfInterest =
        form.querySelector("#field-of-interest").value;

    const purchasedSkill =
        form.querySelector(
            'input[name="purchased_skill"]:checked'
        )?.value || "";

    const experience =
        form.querySelector("#experience").value.trim();

    const goal =
        form.querySelector("#goal").value.trim();

    const comfort =
        form.querySelector("#comfort").value.trim();

    const message =
        `Hello Obong Ekemini, I am interested in joining SkillRise-Empire.\n\n` +
        `*REGISTRATION DETAILS*\n` +
        `Name: ${name}\n` +
        `Location: ${location}\n` +
        `Email: ${email}\n` +
        `WhatsApp: ${whatsapp}\n\n` +
        `*FIELD OF INTEREST*\n` +
        `${fieldOfInterest}\n\n` +
        `*PREVIOUS DIGITAL SKILL EXPERIENCE*\n` +
        `Purchased a digital skill before: ${purchasedSkill}\n\n` +
        `*EXPERIENCE / QUESTIONS / CHALLENGES*\n` +
        `${experience || "None"}\n\n` +
        `*GOAL*\n` +
        `${goal || "Not provided"}\n\n` +
        `*SAFETY / COMFORT*\n` +
        `${comfort || "Not provided"}\n\n` +
        `Please send me the next steps.`;

    const phone = "2349079949346";

    const whatsappUrl =
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
});

function scrollToPayment(skillPath) {
    // Scroll to payment section
    const paymentSection = document.getElementById("skill-path-payment");
    if (!paymentSection) return;

    paymentSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    // Update order summary inside payment section
    const pathElement = document.getElementById("payment-selected-path");
    const amountElements = document.querySelectorAll("#payment-amount");

    if (pathElement) {
        pathElement.textContent = "Payment for " + skillPath;
    }

    if (skillPath === "Skill + Monetization Coaching") {
        amountElements.forEach((amountElement) => {
            amountElement.textContent = "₦49,999";
        });
    } else {
        amountElements.forEach((amountElement) => {
            amountElement.textContent = "₦24,999";
        });
    }

    // Update WhatsApp link with the specific skill
    const whatsappLink = document.getElementById("payment-whatsapp");
    if (whatsappLink) {
        const baseMessage = "Hello Obong Ekemini, I have made my payment and would like to enroll in:";
        whatsappLink.href = `https://wa.me/2349079949346?text=${encodeURIComponent(baseMessage + "\n\n" + skillPath)}`;
    }
}

function copyAccountNumber() {
    const accountNumber = document.getElementById("account-number").textContent.trim();
    const copyIcon = document.getElementById("copy-account-icon");

    navigator.clipboard.writeText(accountNumber).then(() => {
        copyIcon.classList.remove("bi-copy");
        copyIcon.classList.add("bi-check-lg");

        setTimeout(() => {
            copyIcon.classList.remove("bi-check-lg");
            copyIcon.classList.add("bi-copy");
        }, 2000);
    });
}
