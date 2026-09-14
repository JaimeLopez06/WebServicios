document.addEventListener("scroll", () => {
    const fades = document.querySelectorAll(".fade");
    fades.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 120) {
            el.classList.add("visible");
        }
    });
});
