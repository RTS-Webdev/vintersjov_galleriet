// Mobil menu toggle
const setupMobileMenu = () => {
	const dropdown = document.getElementById('dropdown');
	const linksMenu = document.getElementById('links_mobile');
	const openIcon = document.getElementById('open');
	const closeIcon = document.getElementById('close');

	if (dropdown && linksMenu && openIcon && closeIcon) {
		dropdown.addEventListener('click', function () {
			const expanded = this.getAttribute('aria-expanded') === 'true';
			this.setAttribute('aria-expanded', !expanded);
			linksMenu.classList.toggle('open');
			openIcon.style.display = expanded ? 'block' : 'none';
			closeIcon.style.display = expanded ? 'none' : 'block';
		});
	}
};

// Dialog håndtering
const setupDialog = () => {
	const dialog = document.querySelector('.dialog');
	
	if (!dialog) {
		console.error('Dialog element ikke fundet!');
		return { toggleDialog: () => {} };
	}
	
	const closeButton = dialog.querySelector('.close_button');
	
	// Dialog åbne/lukke funktion
	const toggleDialog = (storeName = null) => {
		console.log('toggleDialog kaldt med:', storeName);
		
		const isHidden = dialog.hasAttribute('hidden');
		
		if (isHidden && storeName) {
			// Åbn dialog
			console.log('Åbner dialog for:', storeName);
			dialog.removeAttribute('hidden');
			document.body.style.overflow = 'hidden';
			
			// Opdater indhold
			const dialogTitle = document.getElementById('dialog_title');
			const dialogImage = document.getElementById('dialog_image');
			
			if (dialogTitle) {
				dialogTitle.textContent = capitalizeFirstLetter(storeName);
			} else {
				console.warn('Dialog titel element ikke fundet');
			}
			
			if (dialogImage) {
				dialogImage.src = `assets/svgs/${storeName}.svg`;
			} else {
				console.warn('Dialog billede element ikke fundet');
			}
			
			// Tilgængelighed
			if (closeButton) {
				setTimeout(() => closeButton.focus(), 100);
			}
			
			document.addEventListener('keydown', handleEscapeKey);
		} else {
			// Luk dialog
			console.log('Lukker dialog');
			dialog.setAttribute('hidden', '');
			document.body.style.overflow = '';
			document.removeEventListener('keydown', handleEscapeKey);
		}
	};
	
	// Håndter ESC tast til at lukke dialog
	const handleEscapeKey = (event) => {
		if (event.key === 'Escape') {
			toggleDialog();
		}
	};
	
	// Tilføj luk-knap funktionalitet
	if (closeButton) {
		closeButton.addEventListener('click', () => toggleDialog());
	} else {
		console.warn('Luk-knap ikke fundet i dialog');
	}
	
	// Tilføj global reference til toggleDialog (nødvendig for onclick attributter)
	window.toggleDialog = toggleDialog;
	
	// Tilføj klik-funktionalitet til galleri-billeder
	const setupGalleryImages = () => {
		const galleryImages = document.querySelectorAll('.gallery_item img');
		console.log('Galleri billeder fundet:', galleryImages.length);
		
		if (galleryImages.length === 0) {
			console.warn("Ingen galleri-billeder fundet! Sikr dig at HTML'en indeholder .gallery_item img elementer");
		}
		
		galleryImages.forEach(image => {
			image.style.cursor = 'pointer'; // Vis at billedet er klikbart
			
			// Fjern onclick på parent knapper for at undgå dobbelt-åbning
			const parentButton = image.closest('.gallery_item').querySelector('.gallery_button');
			if (parentButton) {
				parentButton.style.display = 'none';
				console.log('Skjuler gallery_button:', parentButton);
			}
			
			image.addEventListener('click', function() {
				console.log('Billede klikket:', this.alt);
				const galleryItem = this.closest('.gallery_item');
				
				// Prøv at finde butiksnavnet fra forskellige kilder
				let storeName = galleryItem.dataset.store;
				
				if (!storeName) {
					// Prøv at få det fra onclick attribut på .gallery_button
					const button = galleryItem.querySelector('.gallery_button');
					if (button && button.getAttribute('onclick')) {
						const onclickValue = button.getAttribute('onclick');
						const match = onclickValue.match(/toggleDialog\('(.+?)'\)/);
						if (match && match[1]) {
							storeName = match[1];
							console.log('Fandt butiksnavn fra onclick:', storeName);
						}
					}
				}
				
				if (!storeName) {
					// Brug alt-tekst uden "logo" delen
					storeName = this.alt.replace(' logo', '').toLowerCase();
					console.log('Bruger alt-tekst som butiksnavn:', storeName);
				}
				
				if (storeName) {
					toggleDialog(storeName);
				} else {
					console.error('Kunne ikke bestemme butiksnavn for:', this.alt);
				}
			});
		});
	};
	
	setupGalleryImages();
	
	return { toggleDialog };
};

// Tilbuds håndtering
const setupOffers = () => {
	const offers = document.querySelectorAll('.offer');
	const deleteButton = document.querySelector('.del-btn');
	
	console.log('Tilbud fundet:', offers.length);
	console.log('Delete button fundet:', deleteButton !== null);
	
	// Funktion til at indløse et enkelt tilbud
	const redeemOffer = (offerElement) => {
		if (offerElement) {
			console.log('Indløser tilbud:', offerElement.querySelector('span').textContent);
			offerElement.style.opacity = '0';
			offerElement.style.transition = 'opacity 0.3s';
			
			setTimeout(() => {
				offerElement.style.display = 'none';
				// Opdater side-indhold efter fjernelse
				updateOfferStatus();
			}, 300);
		}
	};
	
	// Funktion til at nulstille/slette alle tilbud
	const resetAllOffers = () => {
		console.log('Nulstiller alle tilbud');
		offers.forEach(offer => {
			offer.style.opacity = '0';
			offer.style.transition = 'opacity 0.3s';
		});
		
		setTimeout(() => {
			offers.forEach(offer => {
				offer.style.display = 'none';
			});
			// Opdater side-indhold efter fjernelse
			updateOfferStatus();
		}, 300);
	};
	
	// Opdater side-indhold hvis alle tilbud er væk
	const updateOfferStatus = () => {
		const visibleOffers = Array.from(offers).filter(offer => 
			offer.style.display !== 'none');
		
		console.log('Synlige tilbud tilbage:', visibleOffers.length);
		
		if (visibleOffers.length === 0 && deleteButton) {
			// Alle tilbud er væk - vis en besked
			const section = deleteButton.closest('.tilbud__section');
			const message = document.createElement('p');
			message.textContent = 'Alle dine tilbud er indløst!';
			message.style.textAlign = 'center';
			message.style.marginTop = '2rem';
			
			// Fjern delete knappen
			deleteButton.style.display = 'none';
			
			// Tilføj besked hvis den ikke allerede findes
			if (!document.querySelector('.tilbud__section > p')) {
				section.appendChild(message);
			}
		}
	};
	
	// Tilføj event listeners til indløs-knapper
	offers.forEach(offer => {
		const redeemButton = offer.querySelector('button');
		if (redeemButton) {
			console.log('Tilføjer event listener til indløs knap:', 
						offer.querySelector('span').textContent);
			
			redeemButton.addEventListener('click', () => redeemOffer(offer));
		}
	});
	
	// Tilføj event listener til slet-knap
	if (deleteButton) {
		deleteButton.addEventListener('click', resetAllOffers);
	}
};

// Hjælpefunktion til at kapitalisere første bogstav
function capitalizeFirstLetter(string) {
	if (!string) return '';
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialiser alle funktioner
const init = () => {
	console.log('Initialiserer scripts.js...');
	setupMobileMenu();
	setupDialog();
	setupOffers();
};

// Kør hele scriptet
console.log('Script.js indlæst');
init();