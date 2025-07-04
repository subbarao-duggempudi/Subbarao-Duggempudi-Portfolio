document.addEventListener('DOMContentLoaded', function() {
  const typingTextElement = document.getElementById('main-typing-text');
  const roles = [
    "<b>Web Designer</b>",
    "<b>Front-End Developer</b>",
    "<b>UI Developer</b>",
    "<b>Mechanical Engineer</b>",
    "<b>Business Analyst</b>"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  let deletingSpeed = 50;
  let pauseTime = 1500;

  function typeWriter() {
    const currentRole = roles[roleIndex];
    let textToShow = '';

    if (isDeleting) {
        let tempText = currentRole.substring(0, charIndex);
        if (tempText.endsWith('</b>')) {
            charIndex -= 4;
        } else if (tempText.endsWith('<b>')) {
            charIndex -= 3;
        }
        textToShow = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        if (currentRole.substring(charIndex, charIndex + 3) === '<b>') {
            charIndex += 3;
        } else if (currentRole.substring(charIndex, charIndex + 4) === '</b>') {
            charIndex += 4;
        }
        textToShow = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    typingTextElement.innerHTML = textToShow;

    let currentTypingSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex >= currentRole.length) {
      currentTypingSpeed = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex <= 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      charIndex = 0;
      currentTypingSpeed = 500;
    }

    setTimeout(typeWriter, currentTypingSpeed);
  }

  typeWriter();

  const currentYear = new Date().getFullYear();
  document.getElementById('currentYear').textContent = currentYear;
});