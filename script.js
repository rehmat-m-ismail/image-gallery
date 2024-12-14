const imagesWrapper = document.querySelector(".images-ul")
const load = document.querySelector(".btn")
const SearchInput = document.querySelector('.input-sec input');
const lightbox = document.querySelector(".lightbox")


const apikey = "gukdfOQDsDAbVszAa2QHDSnwhdyGDWBwWxFXoC7OxLUorZA1OwRlDN6t"
const perpage = 15;
let currentpage = 1;
let SearchTerm = null


const showlightbox = (img) => {
    lightbox.classList.add("show");
    lightbox.querySelector("img").src = img;
}
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) { // Close when clicking on the background (outside the image)
        lightbox.classList.remove("show");
    }
});


const generateHTML = (images) => {
    imagesWrapper.innerHTML += images.map(img => ` <li class="card" onclick='showlightbox("${img.src.large2x}")'>
                <img src="${img.src.large2x}" alt="">
            </li>`).join("");
}

const getimages = (apiURL) => {
    load.innerHTML = 'Loading...'
    load.classList.add("disable");
    fetch(apiURL, {
        headers: { authorization: apikey }
    }).then(res => res.json()).then(data => {
        generateHTML(data.photos)
        load.innerHTML = 'Load More'
        load.classList.remove("disable");

    })
}

let loadmoreimages = () => {
    currentpage++;
    let apiURL = `https://api.pexels.com/v1/curated?page=${currentpage}&per_page=${perpage}`;
    getimages(apiURL);
    apiURL = SearchTerm ? `https://api.pexels.com/v1/search?query=${SearchTerm}&per_page=${perpage}` : apiURL
}

getimages(`https://api.pexels.com/v1/curated?${currentpage}&per_page=${perpage}`);
load.addEventListener("click", loadmoreimages);


document.addEventListener("DOMContentLoaded", () => {

    // Make sure the input element exists
    if (SearchInput) {
        const LoadSearchImage = (e) => {
            if (e.key === "Enter") {
                currentpage = 1;
                SearchTerm = e.target.value;
                imagesWrapper.innerHTML = "";
                getimages(`https://api.pexels.com/v1/search?query=${SearchTerm}&page=${currentpage}&per_page=${perpage}`);

            }
        };

        SearchInput.addEventListener("keyup", LoadSearchImage);
    } else {
        console.log("Search input element not found");
    }
});



