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