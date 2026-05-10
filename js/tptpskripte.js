// Tamni mod toggle
const btn = document.getElementById("dark-mode-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme == "dark") {
    document.body.classList.add("dark-mode");
}

btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    let theme = "light";
    if (document.body.classList.contains("dark-mode")) {
        theme = "dark";
    }
    localStorage.setItem("theme", theme);
});

//Kod za filtriranje proizvoda
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filterValue = button.getAttribute("data-filter");
        productCards.forEach(card => {
            if (filterValue === "all" || filterValue=== card.getAttribute("data-category")) {
                card.style.display = "block"; // Prikazujemo karticu ako se poklapa ili ako je filter "all"
            } 
            else {
                card.style.display = "none"; // Sakrivamo karticu ako se ne poklapa
            }
        });
    });
});