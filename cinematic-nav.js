const header = document.querySelector('header');
const secondSection = document.querySelector('#services');
let scheduled = false;
function updateNavigation() {
  header.classList.toggle('is-solid', secondSection.getBoundingClientRect().top <= 0);
  scheduled = false;
}
function scheduleUpdate() {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
}
window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate);
window.addEventListener('pageshow', updateNavigation);
updateNavigation();
