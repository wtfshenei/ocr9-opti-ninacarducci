// const images = [
//     {
//         "image": "aaron-paul-wnX-fXzB6Cw-unsplash.webp",
//         "alt": "Aaron Paul - Photographie d'un concert",
//         "galleryTag": "Concert"
//     },
//     {
//         "image": "ali-morshedlou-WMD64tMfc4k-unsplash.webp",
//         "alt": "Ali Morshedlou - Photographie d'un homme d'entreprise",
//         "galleryTag": "Entreprises"
//     },
//     {
//         "image": "jason-goodman-tHO1_OuKbg0-unsplash.webp",
//         "alt": "Jason Goodman - Photographie d'une réunion d'entreprise",
//         "galleryTag": "Entreprises"
//     },
//     {
//         "image": "hannah-busing-RvF2R_qMpRk-unsplash.webp",
//         "alt": "Hannah Busing - Photographie de mariage",
//         "galleryTag": "Mariages"
//     },
//     {
//         "image": "ade-tunji-rVkhWWZFAtQ-unsplash.webp",
//         "alt": "Ade Tunji - Photographie portrait de l'homme",
//         "galleryTag": "Portrait"
//     },
//     {
//         "image": "jakob-owens-SiniLJkXhMc-unsplash.webp",
//         "alt": "Jakob Owens - Photographie de mariage",
//         "galleryTag": "Mariages"
//     },
//     {
//         "image": "nino-van-prattenburg--443cl1uR_8-unsplash.webp",
//         "alt": "Nino Van Prattenburg - Photographie portrait de la femme",
//         "galleryTag": "Portrait"
//     },
//     {
//         "image": "austin-neill-hgO1wFPXl3I-unsplash.webp",
//         "alt": "Austin Neill - Photographie d'un concert",
//         "galleryTag": "Concert"
//     },
//     {
//         "image": "mateus-campos-felipe-Fsgzm8N0hIY-unsplash.webp",
//         "alt": "Mateus Campos Felipe - Photographie d'une salariée d'entreprise",
//         "galleryTag": "Entreprises"
//     }
// ]

const images = document.getElementsByClassName("gallery-item");
const imagesArray = [].slice.call(images);
const imagesArray2 = [...images];
const imagesArray3 = Array.from(images);
// const imagesList = images[0].alt;

console.log(images);
console.log(imagesArray);
console.log(imagesArray2);
console.log(imagesArray3);

for (let i = 0; i < images.length; i++) {
  const imageName = [i].alt;
  const imagePath = [i].currentSrc;
  const imageTag = [i].dataset.galleryTag;

  imagesList.push({
    name: imageName,
    path: imagePath,
    tag: imageTag,
  });
}

// console.log(imagesList)

// imagesArray.forEach((image) => {
//   const imageName = image.getAttribute("alt");
//   const imagePath = image.getAttribute("src");
//   const imageTag = image.getAttribute("data-gallery-tag");

//   imagesList.push({
//     name: imageName,
//     path: imagePath,
//     tag: imageTag,
//   });
// });

// console.log(imagesList);
