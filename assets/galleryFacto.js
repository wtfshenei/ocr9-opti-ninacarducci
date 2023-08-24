const modalLocation = document.querySelector("main");
const galleryItems = [...document.querySelectorAll(".gallery-item")];
const filters = document.querySelector(".gallery-filters");
const buttonFilterAll = document.querySelector(".filterAll");

let currentIndex;
let filteredImagesArray = [];

/**
 * Récupère les tags des images.
 **/
function getUniqueTags() {
  return [...new Set(galleryItems.map((item) => item.dataset.galleryTag))];
}

/**
 * Applique la classe 'filter-active' au filtre sélectionné.
 **/
function toggleFilterButtonActiveState(button) {
  [
    ...filters.querySelectorAll(".filter, .filter-active"),
    buttonFilterAll,
  ].forEach((btn) => {
    btn.classList.remove("filter-active");
    btn.classList.add("filter");
  });

  button.classList.add("filter-active");
  button.classList.remove("filter");
}

/**
 * Crée un bouton pour chaque tag récupéré.
 **/
function createFilterButton(tag) {
  const button = document.createElement("button");
  button.classList.add("filter");
  button.setAttribute("data-filter", tag);
  button.textContent = tag;

  button.onclick = () => {
    toggleFilterButtonActiveState(button);
    filterImages(tag);
  };
  filters.append(button);
}

/**
 * Filtre les images en fonction du bouton de tag sélectionné. Par défaut 'Tous' est actif.
 **/
function filterImages(tag) {
  filteredImagesArray = galleryItems.filter((item) => {
    const matches = tag === "all" || item.dataset.galleryTag === tag;
    item.style.display = matches ? "block" : "none";
    return matches;
  });
  attachImageClickHandlers();
}

/**
 * Récupère la source et l'alt de l'image cliquée afin de créer la première image du carousel.
 **/
function showImage(index) {
  currentIndex = index;
  const imageSrc = filteredImagesArray[index].getAttribute("src");
  const imageAlt = filteredImagesArray[index].getAttribute("alt");
  createModal(imageSrc, imageAlt);
}

/**
 * Crée la modale qui affiche l'image en grand en fonction de l'image sélectionnée.
 **/
function createModal(imageSrc, imageAlt) {
  closeModal();

  const template = `
        <div class="modal-wrapper">
          <div class="image-container">    
            <button class="close button-style">X</button>
            <button class="prev button-style"><</button>
            <img src="${imageSrc}" alt="${imageAlt}" class="modal-image modal-zone">
            <button class="next button-style">></button>
          </div>
        </div>
    `;

  const modalDiv = document.createElement("div");
  modalDiv.className = "modal";
  modalDiv.innerHTML = template;
  modalLocation.appendChild(modalDiv);

  modalDiv.querySelector(".prev").onclick = (e) => {
    e.stopPropagation();
    showImage(
      (currentIndex - 1 + filteredImagesArray.length) %
        filteredImagesArray.length
    );
  };
  modalDiv.querySelector(".next").onclick = (e) => {
    e.stopPropagation();
    showImage((currentIndex + 1) % filteredImagesArray.length);
  };
  modalDiv.querySelector(".close").onclick = (e) => {
    e.stopPropagation();
    closeModal();
  };
  modalDiv.onclick = (e) => !e.target.closest(".modal-zone") && closeModal();
}

/**
 * Ferme la modale.
 **/
function closeModal() {
  const modal = document.querySelector(".modal");
  if (modal) modal.remove();
}

/**
 * Récupère la source et l'alt des images en fonction du tag sélectionné.
 **/
function attachImageClickHandlers() {
  filteredImagesArray.forEach((image, index) => {
    image.onclick = () => {
      currentIndex = index;
      const imageSrc = image.getAttribute("src");
      const imageAlt = image.getAttribute("alt");
      createModal(imageSrc, imageAlt);
    };
  });
}

/**
 * Fonctions lancés par défaut.
 **/
function init() {
  getUniqueTags().forEach(createFilterButton);

  buttonFilterAll.onclick = () => {
    toggleFilterButtonActiveState(buttonFilterAll);
    filterImages("all");
  };

  buttonFilterAll.classList.add("filter-active");
  buttonFilterAll.classList.remove("filterAll");

  filterImages("all");
}

init();
