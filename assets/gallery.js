/**
 * VARIABLES
 */
const images = document.getElementsByClassName("gallery-item");
const galleryItems = document.querySelectorAll(".gallery-item");
const gallery = document.querySelector(".gallery-display");
const filters = document.querySelector(".gallery-filters");
const buttonFilterAll = document.querySelector(".filterAll");
const modalLocation = document.querySelector("main");

const imagesArray = [...images];
const imagesTags = [];
let filteredImagesArray = [];
let currentIndex;

/**
 * FONCTIONS
 */

/**
 * Récupère les tags des images afin de les envoyer à la fonction de création des boutons de filtres
 **/
function getTags() {
  for (i = 0; i < imagesArray.length; i++) {
    const tag = imagesArray[i].dataset.galleryTag;
    if (!imagesTags.includes(tag)) {
      imagesTags.push(tag);
    }
  }
  return imagesTags;
}

/**
 * Crée les boutons de filtres suivant les tags récupérés par la fonction getTags()
 **/
function createFilters(imagesTags) {
  for (let i = 0; i < imagesTags.length; i++) {
    const tag = imagesTags[i];
    const button = document.createElement("button");
    button.classList.add("filter");
    button.setAttribute("data-filter", tag);
    button.innerHTML = tag;

    button.addEventListener("click", function () {
      const allButtons = filters.querySelectorAll(".filter");
      allButtons.forEach((btn) => {
        btn.classList.remove("filter-active");
      });
      button.classList.add("filter-active");
      filterImages(tag);
    });

    filters.append(button);
  }
}

/**
 * Trie l'affichage des images en fonction de leur tag
 **/
function filterImages(tag) {
  filteredImagesArray = [];

  galleryItems.forEach((item) => {
    const imageTag = item.getAttribute("data-gallery-tag");
    if (tag === "all" || tag === imageTag) {
      item.style.display = "block";
      filteredImagesArray.push(item);
    } else {
      item.style.display = "none";
    }
  });

  openModal();
}

/**
 * Crée une modale avec un fond opaque prenant tout l'écran et l'image choisie au 1er plan
 **/
function createModal(imageSrc, imageAlt) {
  closeModal();
  const modalDiv = document.createElement("div");
  modalDiv.className = "modal";
  modalLocation.appendChild(modalDiv);
  const modalWrapper = document.createElement("div");
  modalWrapper.className = "modal-wrapper";
  const modalImage = document.createElement("img");
  modalImage.src = imageSrc;
  modalImage.alt = imageAlt;
  modalImage.className = "modal-image modal-zone";
  modalDiv.append(modalWrapper);

  const prevButton = document.createElement("button");
  prevButton.innerHTML = "&lt;";
  prevButton.className = "prev";
  prevButton.addEventListener("click", function (e) {
    e.stopPropagation();
    prevImage();
  });

  const nextButton = document.createElement("button");
  nextButton.innerHTML = "&gt;";
  nextButton.className = "next";
  nextButton.addEventListener("click", function (e) {
    e.stopPropagation();
    nextImage();
  });

  modalWrapper.append(prevButton, modalImage, nextButton);

  outsideModal();
}

/**
 * Permet l'ouverture de la modale contenant l'image choisie en grand
 **/
function openModal() {
  filteredImagesArray.forEach((button) => {
    // Détachez d'abord l'ancien écouteur d'événements
    button.removeEventListener("click", handleImageClick);

    // Puis attachez le nouvel écouteur d'événements
    button.addEventListener("click", handleImageClick);
  });
}

function handleImageClick(event) {
  // Trouvez l'index de l'image cliquée dans le tableau filteredImagesArray
  currentIndex = filteredImagesArray.indexOf(event.currentTarget);
  showImage(currentIndex);
}

/**
 * Permet de fermer la modale et l'image affichée
 **/
function closeModal() {
  const modal = document.querySelector(".modal");
  const modalWorks = document.querySelector(".modal-wrapper");
  if (modalWorks) {
    modal.remove();
  }
}

/**
 * Permet de fermer la modale active si l'utilisateur clique en dehors de la pop-in
 **/
function outsideModal() {
  if (document.querySelector(".modal")) {
    const modalZone = document.querySelector(".modal");

    modalZone.addEventListener("click", (e) => {
      if (!e.target.closest(".modal-zone")) {
        closeModal();
      }
    });
  }
}

function showImage(index) {
  const imageSrc = filteredImagesArray[index].getAttribute("src");
  const imageAlt = filteredImagesArray[index].getAttribute("alt");
  createModal(imageSrc, imageAlt);
}

function nextImage() {
  currentIndex = (currentIndex + 1) % filteredImagesArray.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + filteredImagesArray.length) %
    filteredImagesArray.length;
  showImage(currentIndex);
}

/**
 * ADDEVENTLISTENERS
 */

/**
 * Affiche toutes les images via le bouton 'Tous' de la barre de filtre
 **/
buttonFilterAll.addEventListener("click", () => filterImages("all"));

/**
 * LANCEMENT DU SCRIPT
 */

/**
 * Lancement du script
 **/
function init() {
  getTags();
  createFilters(imagesTags);
  filterImages("all");
  openModal();
}

init();
