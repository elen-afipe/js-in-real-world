import Img1 from "./assets/images/R1-01559-0009.jpg";
import Img2 from "./assets/images/R1-01559-0010.jpg";
import Img3 from "./assets/images/R1-01559-0027.jpg";
import Img4 from "./assets/images/R1-01559-0001.jpg";
import Img5 from "./assets/images/R1-01559-0002.jpg";
import Img6 from "./assets/images/R1-01559-0007.jpg";
// create HTML
const carouselBlock = document.querySelector(".carouselBlock");
const  carouselContainer = document.createElement("div");
carouselContainer.classList.add("carousel-container");
const  carouselItems = document.createElement("div");
carouselItems.classList.add("carousel-items");
carouselContainer.append(carouselItems);
const img1 = document.createElement("img");
img1.src = Img1;
img1.classList.add("carousel-image");
const img2 = document.createElement("img");
img2.src = Img2;
img2.classList.add("carousel-image");
const img3 = document.createElement("img");
img3.src = Img3;
img3.classList.add("carousel-image");
const img4 = document.createElement("img");
img4.src = Img4;
img4.classList.add("carousel-image");
const img5 = document.createElement("img");
img5.src = Img5;
img5.classList.add("carousel-image");
const img6 = document.createElement("img");
img6.src = Img6;
img6.classList.add("carousel-image");
const images = [img1, img2, img3, img4, img5, img6]
images.forEach(image => {
    carouselItems.append(image)
})
carouselContainer.append(carouselItems)
const prevImgBtn = document.createElement("button");
prevImgBtn.textContent="<";
prevImgBtn.classList.add("prev-img", "btn");
const nextImgBtn = document.createElement("button");
nextImgBtn.textContent=">";
nextImgBtn.classList.add("next-img", "btn");
carouselContainer.append(prevImgBtn, nextImgBtn)
carouselBlock.append(carouselContainer)

// set function parameters
const imgWidth = 200; // in px
const numberOfPictures = Array.from(carouselItems.children).length;
const maxTransformWidth = numberOfPictures * imgWidth;
const transformThreshold = maxTransformWidth - imgWidth;
let transformWidth = 0;
let currentPictureNumber = 1;
let btnType = "next";
function openClickedPic(picNumber){
    currentPictureNumber = picNumber;
    if (Number(picNumber) === 1){
        transformWidth = 0;
    } else if (Number(picNumber) === Number(numberOfPictures)){
        transformWidth = transformThreshold;
    } else {
        transformWidth = (picNumber-1) * imgWidth;
    }
    const width = transformWidth;
    carouselItems.style.transform = `translateX(-${width}px)`;
}
// create bottom buttons
const lowerButtons = document.createElement("div");
lowerButtons.classList.add("lower-btns");
for (let n = 1; n <= numberOfPictures; n++){
    const imgBtn = document.createElement("button");
    imgBtn.classList.add(`${n}`, "btn", "img-btn");
    imgBtn.addEventListener("click", ()=>{
        openClickedPic(n);
        styleLowerBtns();
    })
    lowerButtons.append(imgBtn);
}
carouselContainer.append(lowerButtons);

function styleLowerBtns(){
    const imgBtns = lowerButtons.childNodes;
    imgBtns.forEach(btn =>{
        btn.classList.remove("active");
        if (btn.classList.contains(currentPictureNumber)){
            btn.classList.add("active");
        }
    })
}
styleLowerBtns();

function getTransformWidth(){
    if (transformWidth === transformThreshold & btnType === "next"){
        transformWidth = 0;
        currentPictureNumber = 1;
    } else if(transformWidth === 0 & btnType === "prev"){
        transformWidth = transformThreshold;
        currentPictureNumber = numberOfPictures;
    }
    else if(btnType === "prev"){
        transformWidth -= imgWidth;
        currentPictureNumber -= 1;
    } else if( btnType === "next") {
        transformWidth += imgWidth;
        currentPictureNumber += 1;
    }
    return transformWidth;
}

prevImgBtn.addEventListener("click", ()=>{
    btnType = "prev";
    const width = getTransformWidth();
    styleLowerBtns();
    carouselItems.style.transform = `translateX(-${width}px)`;
})
nextImgBtn.addEventListener("click", ()=>{
    btnType = "next";
    const width = getTransformWidth();
    styleLowerBtns();
    carouselItems.style.transform = `translateX(-${width}px)`;
})
window.setInterval(function(){
    btnType = "next";
    const width = getTransformWidth();
    styleLowerBtns();
    carouselItems.style.transform = `translateX(-${width}px)`;
  }, 5000);
