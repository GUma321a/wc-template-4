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