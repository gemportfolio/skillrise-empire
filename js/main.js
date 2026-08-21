document.addEventListener("DOMContentLoaded", async () => {

    await loadComponents();

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 700,
            once: true
        });
    }

});


document.addEventListener("submit", function (e) {
    if (e.target.id !== "skillPathForm") return;

    e.preventDefault();

    const form = e.target;

    const selectedPath =
        form.querySelector("#selected-skill-path").value;

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

    const message =
        `Hello Obong Ekemini, I am interested in joining SkillRise-Empire.\n\n` +
        `*Registration Details*\n` +
        `Name: ${name}\n` +
        `Location: ${location}\n` +
        `Email: ${email}\n` +
        `WhatsApp: ${whatsapp}\n\n` +
        `*Training Details*\n` +
        `Skill Path: ${selectedPath}\n` +
        `Interest: ${fieldOfInterest}\n` +
        `Purchased a digital skill before: ${purchasedSkill}\n\n` +
        `*Questions / Challenges / Experience*\n` +
        `${experience || "None"}\n\n` +
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
    const amountElement = document.getElementById("payment-amount");

    if (pathElement) {
        pathElement.textContent = "Payment for " + skillPath;
    }

    if (skillPath === "Skill + Monetization Coaching") {
        amountElement.textContent = "₦49,999";
    } else {
        amountElement.textContent = "₦24,999";
    }

    // Update WhatsApp link with the specific skill
    const whatsappLink = document.getElementById("payment-whatsapp");
    if (whatsappLink) {
        const baseMessage = "Hello Obong Ekemini, I have made my payment and would like to enroll in:";
        whatsappLink.href = `https://wa.me/2349079949346?text=${encodeURIComponent(baseMessage + "\n\n" + skillPath)}`;
    }
}
