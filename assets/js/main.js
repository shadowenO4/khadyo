

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)"; // shadow
    navbar.style.transition = "box-shadow 0.3s ease";
  } else {
    navbar.style.boxShadow = "none";
  }
});



const modal = document.createElement("div");
modal.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.9);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
modal.innerHTML = `
  <span class="close" style="position:absolute;top:20px;right:30px;font-size:40px;color:white;cursor:pointer">&times;</span>
  <span class="arrow left" style="position:absolute;top:50%;left:30px;font-size:50px;color:white;cursor:pointer">&#10094;</span>
  <img class="modal-img" src="" alt="" style="width:300px;max-width:90%;border-radius:10px;display:block">
  <span class="arrow right" style="position:absolute;top:50%;right:30px;font-size:50px;color:white;cursor:pointer">&#10095;</span>
`;
document.body.appendChild(modal);

const modalImg = modal.querySelector(".modal-img");
const closeBtn = modal.querySelector(".close");
const leftArrow = modal.querySelector(".left");
const rightArrow = modal.querySelector(".right");


let currentGallery = [];
let currentIndex = 0;

function showImage() {
  modalImg.src = currentGallery[currentIndex].src;
  modal.style.display = "flex";
}


function setupGallery(sectionSelector) {
  const imgs = document.querySelectorAll(sectionSelector);
  imgs.forEach((img, index) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      currentGallery = imgs;  
      currentIndex = index;
      showImage();
    });
  });
}


setupGallery(".col-md-4.col-sm-6 img");  
setupGallery(".top-image-bar img");       
setupGallery(".promo-card img");          


closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

rightArrow.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  showImage();
});

leftArrow.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  showImage();
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

document.addEventListener("keydown", (e) => {
  if (modal.style.display === "flex") {
    if (e.key === "Escape") modal.style.display = "none";
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % currentGallery.length;
      showImage();
    }
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
      showImage();
    }
  }
});

