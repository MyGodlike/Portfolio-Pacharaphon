const xcardsContainer = document.querySelector(".xcards");
const xcardsContainerInner = document.querySelector(".xcards__inner");
const xcards = Array.from(document.querySelectorAll(".xcard"));
const overlay = document.querySelector(".overlay");

const applyOverlayMask = (e) => {
  const overlayEl = e.currentTarget;
  const x = e.clientX - xcardsContainer.getBoundingClientRect().left;
  const y = e.clientY - xcardsContainer.getBoundingClientRect().top;

  overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};


const createOverlayCta = (overlayxCard, ctaEl) => {
  const overlayCta = document.createElement("div");
  overlayCta.classList.add("cta");
  overlayCta.textContent = ctaEl.textContent;
  overlayCta.setAttribute("aria-hidden", true);
  overlayxCard.append(overlayCta);
};

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const xcardIndex = xcards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (xcardIndex >= 0) {
      overlay.children[xcardIndex].style.width = `${width}px`;
      overlay.children[xcardIndex].style.height = `${height}px`;
    }
  });
});

const initOverlayxCard = (xcardEl) => {
  const overlayxCard = document.createElement("div");
  overlayxCard.classList.add("xcard");
  createOverlayCta(overlayxCard, xcardEl.lastElementChild);
  overlay.append(overlayxCard);
  observer.observe(xcardEl);
};

xcards.forEach(initOverlayxCard);
document.body.addEventListener("pointermove", applyOverlayMask);





document.addEventListener("DOMContentLoaded", function () {
  // Hide preloader when content is loaded
  const preloader = document.getElementById("preloader");
  preloader.style.display = "none";
});








$(document).ready(function () {
  const xcardsContainer = $(".xcards");
  const xcardsContainerInner = $(".xcards__inner");
  const xcards = $(".xcard");
  const overlay = $(".overlay");

  const applyOverlayMask = function (e) {
    const overlayEl = $(this);
    const x = e.clientX - xcardsContainer.offset().left;
    const y = e.clientY - xcardsContainer.offset().top;

    overlayEl.css({
      "--opacity": 1,
      "--x": `${x}px`,
      "--y": `${y}px`
    });
  };

  const createOverlayCta = function (overlayxCard, ctaEl) {
    const overlayCta = $("<div class='cta' aria-hidden='true'></div>").text(ctaEl.text());
    overlayxCard.append(overlayCta);
  };

  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const xcardIndex = xcards.index($(entry.target));
      let width = entry.borderBoxSize[0].inlineSize;
      let height = entry.borderBoxSize[0].blockSize;

      if (xcardIndex >= 0) {
        overlay.children().eq(xcardIndex).css({
          width: `${width}px`,
          height: `${height}px`
        });
      }
    });
  });

  const initOverlayxCard = function (xcardEl) {
    const overlayxCard = $("<div class='xcard'></div>");
    createOverlayCta(overlayxCard, $(xcardEl).children().last());
    overlay.append(overlayxCard);
    observer.observe(xcardEl);
  };

  xcards.each(function () {
    initOverlayxCard(this);
  });

  $("body").on("pointermove", ".overlay", applyOverlayMask);

  const $cards = $(".card");
  const $style = $(".hover");

  $cards.on("mousemove touchmove", function (e) {
    var pos = [e.offsetX, e.offsetY];
    e.preventDefault();
    if (e.type === "touchmove") {
      pos = [e.touches[0].clientX, e.touches[0].clientY];
    }
    var $card = $(this);
    var l = pos[0];
    var t = pos[1];
    var h = $card.height();
    var w = $card.width();
    var px = Math.abs(Math.floor((100 / w) * l) - 100);
    var py = Math.abs(Math.floor((100 / h) * t) - 100);
    var pa = 50 - px + (50 - py);
    var lp = 50 + (px - 50) / 1.5;
    var tp = 50 + (py - 50) / 1.5;
    var px_spark = 50 + (px - 50) / 7;
    var py_spark = 50 + (py - 50) / 7;
    var p_opc = 20 + Math.abs(pa) * 1.5;
    var ty = ((tp - 50) / 2) * -1;
    var tx = ((lp - 50) / 1.5) * 0.5;
    var grad_pos = `background-position: ${lp}% ${tp}%;`;
    var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`;
    var opc = `opacity: ${p_opc / 100};`;
    var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`;
    var style = `
      .card:hover:before { ${grad_pos} }
      .card:hover:after { ${sprk_pos} ${opc} }
    `;
    $cards.removeClass("active");
    $card.removeClass("animated");
    $card.attr("style", tf);
    $style.html(style);
    if (e.type === "touchmove") {
      return false;
    }
    clearTimeout(x);
  }).on("mouseout touchend touchcancel", function () {
    var $card = $(this);
    $style.html("");
    $card.removeAttr("style");
    x = setTimeout(function () {
      $card.addClass("animated");
    }, 2500);
  });

  // Hide preloader when content is loaded
  $("#preloader").hide();
});