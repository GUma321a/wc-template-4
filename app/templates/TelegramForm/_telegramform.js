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