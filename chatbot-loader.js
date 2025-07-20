(function () {
  const iframe = document.createElement('iframe');
  iframe.src = 'https://scaledaycares.github.io/kidovationseducationalexperience/';
  iframe.style.border = 'none';
  iframe.style.position = 'fixed';
  iframe.style.bottom = '0';
  iframe.style.right = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.maxWidth = '500px';
  iframe.style.maxHeight = '600px';
  iframe.style.zIndex = '2147483647';
  document.body.appendChild(iframe);

  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'chatbot-toggle';
  Object.assign(toggleBtn.style, {
    position: 'fixed',
    bottom: '10px',
    right: '480px',
    backgroundColor: '#1874c4',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '70px',
    height: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: '2147483646',
  });

  const img = document.createElement('img');
  img.src = 'https://cdn.glitch.global/b3ab09eb-1116-4be8-a7e0-1c7e203a9b89/24-242263_chat-speech-bubble-with-text-lines-comments-speech-removebg-preview.png?v=1691191893430';
  img.style.width = '50px';
  img.style.height = '50px';
  toggleBtn.appendChild(img);
  document.body.appendChild(toggleBtn);

  const closeButton = document.createElement('button');
  closeButton.id = 'chatbot-close';
  Object.assign(closeButton.style, {
    position: 'fixed',
    bottom: '395px',
    right: '35px',
    fontSize: '15px',
    width: '24px',
    height: '24px',
    backgroundColor: 'black',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '2147483647',
    color: 'white',
    display: 'none',
  });
  closeButton.textContent = 'X';
  document.body.appendChild(closeButton);

  let chatbotIsOpen = localStorage.getItem('chatbotIsOpen');
  chatbotIsOpen = chatbotIsOpen === null ? true : chatbotIsOpen === 'true';

  function updateChatbotVisibility() {
    iframe.style.display = chatbotIsOpen ? 'flex' : 'none';
    closeButton.style.display = chatbotIsOpen ? 'flex' : 'none';
    localStorage.setItem('chatbotIsOpen', chatbotIsOpen);
  }

  function updateToggleBtnPosition() {
    toggleBtn.style.right = window.innerWidth <= 768 ? '20px' : '480px';
  }

  function resizeChatbot() {
    if (window.innerWidth <= 400) {
      iframe.style.width = '150%';
      iframe.style.height = '100%';
      iframe.style.right = '-50px';
      iframe.style.transform = 'scale(0.8)';
      closeButton.style.bottom = '445px';
      closeButton.style.right = '20px';
      closeButton.style.fontSize = '18px';
      closeButton.style.width = '30px';
      closeButton.style.height = '30px';
    } else if (window.innerWidth <= 768) {
      iframe.style.width = '110%';
      iframe.style.transform = 'scale(0.85)';
      iframe.style.transformOrigin = 'bottom right';
      closeButton.style.bottom = '415px';
      closeButton.style.right = '20px';
      closeButton.style.fontSize = '18px';
      closeButton.style.width = '17px';
      closeButton.style.height = '17px';
    } else {
      iframe.style.transform = 'scale(1)';
      closeButton.style.bottom = '490px';
    }
  }

  toggleBtn.addEventListener('click', function () {
    chatbotIsOpen = !chatbotIsOpen;
    updateChatbotVisibility();
  });

  closeButton.addEventListener('click', function () {
    chatbotIsOpen = false;
    updateChatbotVisibility();
  });

  window.addEventListener('message', function (event) {
    if (event.data && event.data.action) {
      if (event.data.action === 'openCalendly') {
        closeButton.style.display = 'none';
      } else if (event.data.action === 'closeCalendly') {
        closeButton.style.display = 'flex';
      } else if (event.data.action === 'closeChatbot') {
        chatbotIsOpen = false;
        updateChatbotVisibility();
      }
    }
  });

  window.addEventListener('resize', function () {
    updateToggleBtnPosition();
    resizeChatbot();
  });

  updateToggleBtnPosition();
  resizeChatbot();
  updateChatbotVisibility();
})();
