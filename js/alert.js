document.write(`
               <div id="alert" class="alert">
  <div class="contens">
  <p style="font-weight: bold; font-size: 1.4em;">OPIUM UPDATE
  </p>
    <p>Currently, X-88 and Scott Ferren are updating Opium from Version 0.5 (Current) To Version 1.0. With newer feautres, games and content</p>
    <button id="closing" class="closing">Oh Ok</button>
  </div>
</div>
<div id="overlay" class="overlay"></div>
  `);

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
