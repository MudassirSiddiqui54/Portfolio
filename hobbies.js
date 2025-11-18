// hobbies.js
document.querySelectorAll('.hobby-banner').forEach(banner => {
  banner.addEventListener('mouseenter', () => {
    banner.classList.add('revealed');
  });
});

