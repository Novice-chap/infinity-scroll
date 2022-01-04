const imgContainer = document.querySelector(".img-container");
const loader = document.querySelector(".loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const apiKey = "XVpoy0foKulJzpmjSTu7gkX-v5o-MOpk6PcIufiu3-E";
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//! image loaded function to check if image is loaded
const imageLoaded = () => {
  console.log("loaded");
  imagesLoaded++;
  if (imagesLoaded === 30) {
    ready = true;
    loader.hidden = true;
  }
};
// ?Displaying photos
const displayPhoto = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  for (let photo of photosArray) {
    // ? Create anchor <a> DOM element for photo link
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    //? create image <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    if (photo.alt_description != null) {
      img.setAttribute("title", photo.alt_description);
    }
    img.setAttribute("alt", photo.alt_description);
    //? Add event listener to check if image has been loaded
    img.addEventListener("load", imageLoaded);
    // ? Put image inside <a> and then put both inside image container
    item.appendChild(img);
    imgContainer.appendChild(item);
  }
};
//? Get photos from API

const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhoto();
  } catch (e) {
    console.log(e);
  }
};

//? On Load
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
getPhotos();
