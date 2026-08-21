document.addEventListener("DOMContentLoaded", async () => {

    // Wait for components
    await loadComponents();

    // Initialize AOS
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 700,
            once: true
        });
    }

});