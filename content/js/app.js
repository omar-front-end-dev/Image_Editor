const saturate = document.getElementById("saturate");
const contrast = document.getElementById("contrast");
const brightness = document.getElementById("brightness");
const sepia = document.getElementById("sepia");
const grayscale = document.getElementById("grayscale");
const blurFilter = document.getElementById("blur");
const hueRotate = document.getElementById("hue-rotate");

const upload = document.getElementById("upload");
const download = document.getElementById("download");

const image = document.getElementById("img");
const reset = document.getElementById("reset");
const imageBox = document.querySelector(".image__box");

const canvasElement = document.getElementById("canvas");
const ctx = canvasElement.getContext("2d")

function reseatValue() {
    image.style.filter = "none"
    saturate.value = "100"
    contrast.value = "100"
    brightness.value = "100"
    sepia.value = "0"
    grayscale.value = "0"
    blurFilter.value = "0"
    hueRotate.value = "0"
}


window.addEventListener("load", ()=>{
    download.style.display = "none";
    reset.style.display = "none";
    imageBox.style.display = "none";
})

upload.addEventListener("change", () =>{
    reseatValue()
    download.style.display = "block";
    reset.style.display = "block";
    imageBox.style.display = "block";
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.addEventListener("load", () =>{
        image.src = file.result
    })
    image.onload = function() {
        canvasElement.width = image.width;
        canvasElement.height = image.height
        ctx.drawImage(image, 0, 0,canvasElement.width, canvasElement.height);
        image.style.display = "none"; 
    }
})

const filters = document.querySelectorAll("ul li input");

filters.forEach(filter =>{
    filter.addEventListener("input", () =>{
        ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blurFilter.value}px)
        hue-rotate(${hueRotate.value}deg)
        `
        ctx.drawImage(image, 0, 0,canvasElement.width, canvasElement.height);
    })
})

reset.addEventListener("click", () =>{
    reseatValue()
})

download.addEventListener("click", () =>{
    download.href = canvasElement.toDataURL()
    reseatValue()
})