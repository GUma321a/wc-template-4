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