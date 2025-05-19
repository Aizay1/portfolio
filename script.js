/**
 * Updated script for main.html interactions:
 * - Resume download with visible message using existing PDF file
 * - Contact form validation with fixed email regex and visible messages
 * - Responsive navigation toggle for mobile menu
 * - Detail icon toggle to hide/show nav links and change icon to "X"
 * - Theme toggle button to switch between dark and light themes
 */

document.addEventListener('DOMContentLoaded', () => {
  // Resume download button
  const resumeButton = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.trim() === 'Get my resume');
  if (resumeButton) {
    resumeButton.addEventListener('click', () => {
      // Use existing PDF file in folder, assuming 'Resume.pdf'
      const link = document.createElement('a');
      link.href = 'Resume.pdf';
      link.download = 'Kaleb_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show visible message
      showMessage('Your resume download should start shortly.', 'success');
    });
  }

  // Contact form validation
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    // Create message container
    let messageContainer = document.createElement('div');
    messageContainer.style.color = 'red';
    messageContainer.style.marginBottom = '10px';
    contactForm.prepend(messageContainer);

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      messageContainer.textContent = '';

      const firstName = contactForm.querySelector('input[placeholder="First name"]').value.trim();
      const lastName = contactForm.querySelector('input[placeholder="Last name"]').value.trim();
      const email = contactForm.querySelector('input[type="email"]').value.trim();
      const message = contactForm.querySelector('textarea').value.trim();

      if (!firstName || !lastName || !email || !message) {
        messageContainer.textContent = 'Please fill in all fields.';
        return;
      }

      // Validate first and last name: letters only
      const nameRegex = /^[A-Za-z]+$/;
      if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        messageContainer.textContent = 'First and Last name should contain letters only.';
        return;
      }

      // Fixed email validation regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        messageContainer.textContent = 'Please enter a valid email address.';
        return;
      }

      // If validation passes, show success message and reset form
      messageContainer.style.color = 'green';
      messageContainer.textContent = 'Thank you for your message! We will get back to you soon.';
      contactForm.reset();
    });
  }

  // Responsive navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('nav ul');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Detail icon toggle to hide/show nav links and change icon to "X"
  const detailIcon = document.getElementById('detail-icon');
  const navLinks = document.querySelectorAll('.nav-links li:not(:last-child):not(#theme-toggle)'); // all except detail icon and theme toggle
  detailIcon.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.forEach(link => {
      if (link.style.display === 'none') {
        link.style.display = 'inline-block';
      } else {
        link.style.display = 'none';
      }
    });
    // Toggle icon between bars and times
    if (detailIcon.classList.contains('fa-bars')) {
      detailIcon.classList.remove('fa-bars');
      detailIcon.classList.add('fa-times');
    } else {
      detailIcon.classList.remove('fa-times');
      detailIcon.classList.add('fa-bars');
    }
  });

  // Theme toggle button to switch between dark and light themes
const themeToggle = document.getElementById('theme-toggle');
function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  }
}
// Set initial theme on page load
(function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') setTheme('dark');
  else setTheme('light');
})();
if (themeToggle) {
  themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    if (document.body.classList.contains('dark-theme')) setTheme('light');
    else setTheme('dark');
  });
}


  // Helper function to show visible messages temporarily
  function showMessage(text, type) {
    let msg = document.createElement('div');
    msg.textContent = text;
    msg.style.position = 'fixed';
    msg.style.bottom = '20px';
    msg.style.left = '50%';
    msg.style.transform = 'translateX(-50%)';
    msg.style.padding = '10px 20px';
    msg.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
    msg.style.color = 'white';
    msg.style.borderRadius = '5px';
    msg.style.zIndex = '10000';
    document.body.appendChild(msg);
    setTimeout(() => {
      document.body.removeChild(msg);
    }, 3000);
  }
});
