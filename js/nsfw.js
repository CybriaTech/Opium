const alert = document.getElementById('alert');
const overlay = document.getElementById('overlay');

function openPopup() {
  alert.style.display = 'block';
  overlay.style.display = 'block';
}

function closePopup() {
  alert.style.display = 'none';
  overlay.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
  openPopup();
});

document.getElementById('closing').addEventListener('click', function() {
  closePopup();
});

overlay.addEventListener('click', function() {
  closePopup();
});
