// ************************** Burger Menu ************************** //
function burgerMenu() {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".header__menu-list");
  burger.addEventListener("click", (e) => {
    if (!menu.classList.contains("active")) {
      menu.classList.add("active");
      burger.classList.add("active-burger");
      e.stopPropagation();
    } else {
      menu.classList.remove("active");
      burger.classList.remove("active-burger");
    }
  });

  // When links are anchors
  // menu.addEventListener("click", handleMenuClick);
  // function handleMenuClick(event) {
  //   if (event.target instanceof HTMLAnchorElement) {
  //     menu.classList.remove("active");
  //     burger.classList.remove("active-burger");
  //   }
  // }

  document.addEventListener('click', function(e) {
    const targetBurger = e.target;
    const targetMenu = targetBurger == menu || menu.contains(targetBurger);
    const targetBurgerTrigger = targetBurger == burger;
    const burgerIsActive = menu.classList.contains('active');
    
    if (!targetMenu && !targetBurgerTrigger && burgerIsActive) {
      menu.classList.remove("active");
      burger.classList.remove("active-burger");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 999) {
      menu.classList.remove("active");
      burger.classList.remove("active-burger");
    }
  });
}

burgerMenu();
// ************************** Burger Menu ************************** //



// ************************** Fixed Header ************************** //
function fixedNav() {
  const header = document.querySelector(".header");
  const breakpoint = 1;

  if (window.scrollY >= breakpoint) {
    header.classList.add("header__fixed");
  } else {
    header.classList.remove("header__fixed");
  }
}

window.addEventListener('scroll', fixedNav);
// ************************** Fixed Header ************************** //



// ************************** Current page active link ************************** //
function currentPageLink() {
  const currentPage = location.pathname.split('/')[1];
  if (currentPage === "") return;
  const menuItems = document.querySelectorAll('.header__menu-list-link');
  for (let i = 0, len = menuItems.length; i < len; i++) {
      if (menuItems[i].getAttribute("href").indexOf(currentPage) !== -1) {
          menuItems[i].classList.add("active");
      }
  }
}

currentPageLink();
// ************************** Current page active link ************************** //



// ************************** Faq Accordion ************************** //
function accordion() {
  const accordionItems = document.querySelectorAll('.faq__accordion-trigger');
  accordionItems.forEach(accordionItem => {
    accordionItem.addEventListener('click', () => {
      const parent = accordionItem.parentNode;
      if (parent.classList.contains('accordion__item-active')) {
          parent.classList.remove('accordion__item-active');
      } else {
          document.querySelectorAll('.faq__accordion-item').forEach(child => child.classList.remove('accordion__item-active'));
          parent.classList.add('accordion__item-active');
      }
    });
  });
}

accordion();
// ************************** Faq Accordion ************************** //



// ************************** Testimonials Slider ************************** //
  const testimonialsSlider = document.querySelectorAll('.testimonials__slider');

  for ( let i = 0; i < testimonialsSlider.length; i++ ) {
    new Splide(testimonialsSlider[i], {
      type: 'slide',
      perPage: 1,
      gap: 30,
      classes: {
        arrows: 'splide__arrows testimonials__arrows',
        arrow: 'splide__arrow testimonials__arrow',
        prev: 'splide__arrow--prev testimonials__arrow-prev',
        next: 'splide__arrow--next testimonials__arrow-next',
        pagination: 'splide__pagination testimonials__pagination',
        page: 'splide__pagination__page testimonials__pagination-page',
      },
    }).mount();
  }
// ************************** Testimonials Slider ************************** //



// ************************** Telegram Form ************************** //
const telegramChatID = '-1001500417277';
const telegramBotToken = 'bot5104551091:AAEqt6v67QzDOYve_lvjDSj34y_cEYMJpqA';
const telegramURL = `https://api.telegram.org/${telegramBotToken}/sendMessage`;
const telegramForm = document.querySelectorAll('.telegram-form');
const messageStatus = document.querySelector('.form-status');


for ( let i = 0; i < telegramForm.length; i++ ) {
  telegramForm[i].addEventListener("submit", async e => {
    e.preventDefault();
    let telegramDataArray = [];
    let formData = new FormData(e.target);
    let telegramFormInputs = e.target.getAttribute('names').split(" ");
    let telegramFormTitle = e.target.getAttribute('formTitle');

    telegramFormInputs.forEach(name => {
      telegramDataArray.push({
          'name': name,
          'value': formData.get(name)
      });
    });

    let telegramText = `New request from ${telegramFormTitle}`;
    telegramDataArray.forEach(d => {
      telegramText += `<b>\n ${d.name}</b>: ${d.value}`;
    });

    const sendMessage = await fetch(telegramURL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: telegramChatID,
          text: telegramText,
          parse_mode: 'html'
        }),
    });

    if (sendMessage.ok) {
      messageStatus.classList.add('success');
      setTimeout(() => {
        messageStatus.classList.remove('success');
      }, 3000);
    } else {
      messageStatus.textContent = "Message failed to send :(";
    }
   
    e.target.reset();
  });
}
// ************************** Telegram Form ************************** //


// ************************** Filter ************************ //
  const filters = document.querySelectorAll(".filter");


  filters.forEach((filter) => {
    filter.addEventListener("click", function (e) {
      filters.forEach((el) => {
        el.classList.remove("active");
      });
      filter.classList.add("active");
      let selectedFilter = filter.getAttribute("data-filter");
      let itemsToHide = document.querySelectorAll(
        `.filter-menu .filter-item:not([data-filter='${selectedFilter}'])`
      );
      let itemsToShow = document.querySelectorAll(
        `.filter-menu [data-filter='${selectedFilter}']`
      );

      if (selectedFilter == "all") {
        itemsToHide = [];
        itemsToShow = document.querySelectorAll(".filter-menu [data-filter]");
      }

      itemsToHide.forEach((el) => {
        el.classList.add("hide");
        el.classList.remove("show");
      });

      itemsToShow.forEach((el) => {
        el.classList.remove("hide");
        el.classList.add("show");
      });
    });
  });
// ************************** Filter ************************ //

// ************************** Map ************************** //
function initMap() {
  // тут задаем центр карты
  var myLatLng = { lat: 40.810709, lng: -73.948331 };

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14, // определяет масштаб карты, ее "зум"
    center: myLatLng,
  });

  // ниже задаются стили, можете использовать https://mapstyle.withgoogle.com/ или https://snazzymaps.com/ для быстрого создания стиля,
  // далее оттуда берете блок с кодом для стилей и вставляете вместо этого блока ниже
  var styles = [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [
        {
          saturation: 36,
        },
        {
          color: "#000000",
        },
        {
          lightness: 40,
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [
        {
          visibility: "on",
        },
        {
          color: "#000000",
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 17,
        },
        {
          weight: 1.2,
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 21,
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 17,
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 29,
        },
        {
          weight: 0.2,
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 18,
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 19,
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
        {
          lightness: 17,
        },
      ],
    },
  ];

  map.setOptions({ styles: styles });

  // ниже задаем маркер - картинку и ее размер, а также точку картинки (в примере - это низ картинки, выровненный по центру - которая будет находится в указанных координатах)
  var image = {
    url: "./images/icons/map-pin.svg",
    // тут маркер 30 пикселей в ширину и 118 в высоту
    size: new google.maps.Size(50, 118),
    // задаем начало картинки, обычно это левый верхний угол (0, 0).
    origin: new google.maps.Point(0, 0),
    // и точка картинки, которая будет находиться в точке вашего объекта на карте, тут - центр картинки внизу (15, 118).
    anchor: new google.maps.Point(15, 118),
  };

  // тут создается блок, всплывающий по клику на маркер. Удобен чтоб добавить небольшой текст-описание или подсказку.
  var contentString =
    '<div id="map-content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h2  class="map__modal-title">WebCifra</h2>' +
    '<div class="map__modal-text">' +
    "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit." +
    "Atque, culpa. Sint et earum." +
    "</div>" +
    "</div>";

  var infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 350,
  });

  // здесь создается сам маркер и применяются параметры отображения
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: image,
    animation: google.maps.Animation.DROP,
    title: 'WebCifra',
  });

  var myOptions = {
    // your other options...
    draggable: !("ontouchend" in document),
    
  };

  marker.addListener("click", function () {
    infowindow.open(map, marker);
  });
}
// ************************** Map ************************** //



// ************************** Player *********************** //
  const player = new Plyr("#player", {
    controls: [
      "play-large",
      "play",
      "progress",
      "current-time",
      "mute",
      "volume",
      "settings",
      "pip",
      "airplay",
      "fullscreen",
    ],
    resetOnEnd: true,
  });
// ************************** Player *********************** //