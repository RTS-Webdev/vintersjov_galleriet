function toggleMenu() {
	const button = document.getElementById("dropdown");
	button.classList.toggle("active");
}

function toggleDialog() {
    const dialog = document.querySelector(".dialog");
    dialog.classList.toggle("active");
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

function openModal() {
	document.documentElement.classList.toggle("dimmed");
}