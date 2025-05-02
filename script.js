function toggleMenu() {
	const button = document.getElementById("dropdown");
	button.classList.toggle("active");
}

function toggleDialog(storeId) {
    const dialog = document.querySelector(".dialog");
    
    if (storeId) {
        const dialogImage = document.getElementById("dialog_image");
        const dialogTitle = document.getElementById("dialog_title");
        
        // Sæt billedet og titlen baseret på den valgte butik
        dialogImage.src = `assets/svgs/${storeId}.svg`;
        dialogTitle.textContent = capitalizeFirstLetter(storeId);
        
        // Vis dialogen
        dialog.classList.add("active");
    } else {
        // Skjul dialogen hvis ingen butiks-id er givet
        dialog.classList.remove("active");
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const menu = document.getElementById("dropdown");
menu.addEventListener("click", toggleMenu);

const accordionHeaders = document.querySelectorAll(".accordion__header");

accordionHeaders.forEach((header) => {
	header.addEventListener("click", function () {
		const accordionItem = this.parentElement;

		const allAccordionItems = document.querySelectorAll(
			".faq__accordion__container article"
		);
		allAccordionItems.forEach((item) => {
			if (item !== accordionItem && item.classList.contains("active")) {
				item.classList.remove("active");
			}
		});

		accordionItem.classList.toggle("active");
	});
});

const firstAccordionItem = document.querySelector(
	".faq__accordion__container article"
);
if (firstAccordionItem) {
	firstAccordionItem.classList.add("active");
}