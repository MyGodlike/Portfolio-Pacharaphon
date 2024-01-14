console.clear();

const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");

const applyOverlayMask = (e) => {
    const overlayEl = e.currentTarget;
    const x = e.clientX - cardsContainer.getBoundingClientRect().left;
    const y = e.clientY - cardsContainer.getBoundingClientRect().top;
  
    overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
  };
  

const createOverlayCta = (overlayCard, ctaEl) => {
  const overlayCta = document.createElement("div");
  overlayCta.classList.add("cta");
  overlayCta.textContent = ctaEl.textContent;
  overlayCta.setAttribute("aria-hidden", true);
  overlayCard.append(overlayCta);
};  

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndex = cards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (cardIndex >= 0) {
      overlay.children[cardIndex].style.width = `${width}px`;
      overlay.children[cardIndex].style.height = `${height}px`;
    }
  });
});

const initOverlayCard = (cardEl) => {
  const overlayCard = document.createElement("div");
  overlayCard.classList.add("card");
  createOverlayCta(overlayCard, cardEl.lastElementChild);
  overlay.append(overlayCard);
  observer.observe(cardEl);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask);


overlayEl.style.opacity = 1;
overlayEl.style.left = "auto";  // เปลี่ยน left เป็น auto
overlayEl.style.top = "auto";   // เปลี่ยน top เป็น auto



document.addEventListener("DOMContentLoaded", function() {
    // Hide preloader when content is loaded
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none";
  });
