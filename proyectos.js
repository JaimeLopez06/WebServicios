const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const projectCount = document.querySelector("#project-count");
const projectGrid = document.querySelector("#project-grid");
const cardsByCategory = new Map();

projectCards.forEach(card => {
    const categoryCards = cardsByCategory.get(card.dataset.category) || [];
    categoryCards.push(card);
    cardsByCategory.set(card.dataset.category, categoryCards);
});

let lastCategory = "";

while ([...cardsByCategory.values()].some(cards => cards.length > 0)) {
    const nextCategory = [...cardsByCategory.entries()]
        .filter(([category, cards]) => cards.length > 0 && category !== lastCategory)
        .sort((first, second) => second[1].length - first[1].length)[0];

    if (!nextCategory) break;

    const [category, cards] = nextCategory;
    projectGrid.append(cards.shift());
    lastCategory = category;
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        let visibleCount = 0;
        const selectedCategory = button.dataset.filter;

        filterButtons.forEach(filterButton => {
            const isActive = filterButton === button;
            filterButton.classList.toggle("is-active", isActive);
            filterButton.setAttribute("aria-pressed", String(isActive));
        });

        projectCards.forEach(card => {
            const isVisible = selectedCategory === "todos" || card.dataset.category === selectedCategory;
            card.hidden = !isVisible;
            if (isVisible) visibleCount += 1;
        });

        projectCount.textContent = `${visibleCount} ${visibleCount === 1 ? "proyecto" : "proyectos"}`;
    });
});
