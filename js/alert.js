function createPopup() {
  const alertContainer = document.createElement('div');
  alertContainer.id = 'alert';
  alertContainer.className = 'alert';

  const contentsContainer = document.createElement('div');
  contentsContainer.className = 'contents';

  const title = document.createElement('p');
  title.style.fontWeight = 'bold';
  title.style.fontSize = '1.4em';
  title.textContent = 'OPIUM UPDATE';

  const description = document.createElement('p');
  description.textContent = 'Currently, X-88 and Scott Ferren are updating Opium from Version 0.5 (Current) to Version 1.0. With newer features, games, and content.';

  const closeButton = document.createElement('button');
  closeButton.id = 'closing';
  closeButton.className = 'closing';
  closeButton.textContent = 'Oh Ok';

  contentsContainer.appendChild(title);
  contentsContainer.appendChild(description);
  contentsContainer.appendChild(closeButton);
  
  alertContainer.appendChild(contentsContainer);
  
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.className = 'overlay';

  document.body.appendChild(alertContainer);
  document.body.appendChild(overlay);

  closeButton.addEventListener('click', closePopup);
  overlay.addEventListener('click', closePopup);
}

function openPopup() {
  const alert = document.getElementById('alert');
  const overlay = document.getElementById('overlay');
  alert.style.display = 'block';
  overlay.style.display = 'block';
}

function closePopup() {
  const alert = document.getElementById('alert');
  const overlay = document.getElementById('overlay');
  alert.style.display = 'none';
  overlay.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
  createPopup();
  openPopup();
});
