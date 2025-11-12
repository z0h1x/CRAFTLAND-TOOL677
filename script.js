// script.js

// --- Password Panel Logic ---
const passwordPanel = document.getElementById('password-panel');
const passwordInput = document.getElementById('password-input');
const passwordSubmit = document.getElementById('password-submit');
const passwordError = document.getElementById('password-error');
const mainContent = document.getElementById('main-content');

// Dummy password (change as needed)
const CORRECT_PASSWORD = 'ssfyt2025';

// Show main content on password success
passwordSubmit.addEventListener('click', () => {
  const entered = passwordInput.value;
  if (entered === CORRECT_PASSWORD) {
    passwordPanel.classList.remove('active');
    mainContent.classList.remove('hidden');
    passwordInput.value = '';
    passwordError.textContent = '';
  } else {
    passwordError.textContent = 'Incorrect password!';
  }
});

// Enter triggers button as well
passwordInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') passwordSubmit.click();
});

// --- Select Options Populate ---
function populateSelect(selectId, maxOption) {
  const select = document.getElementById(selectId);
  select.innerHTML = ''; // Clear
  for (let i = 1; i <= maxOption; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = i;
    select.appendChild(opt);
  }
}

populateSelect('teams-select', 12);
populateSelect('players-select', 12);
populateSelect('rounds-select', 20);

// --- File Upload & Download Logic ---
const fileInput = document.getElementById('file-input');
const downloadBtn = document.getElementById('download-btn');

// Store original file
let uploadedFile = null;

fileInput.addEventListener('change', (e) => {
  if (e.target.files && e.target.files[0]) {
    uploadedFile = e.target.files[0];
    downloadBtn.disabled = false;
  } else {
    uploadedFile = null;
    downloadBtn.disabled = true;
  }
});

// --- Dummy Edit and Download ---
downloadBtn.addEventListener('click', () => {
  if (!uploadedFile) return;

  // Collect selected values
  const teams = document.getElementById('teams-select').value;
  const players = document.getElementById('players-select').value;
  const rounds = document.getElementById('rounds-select').value;

  // Here you would edit the file based on above values; this is dummy:
  const reader = new FileReader();
  reader.onload = function(event) {
    // No real edit, just download the file as-is with a new name
    const blob = new Blob([event.target.result], { type: 'application/octet-stream' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `edited_map_${teams}t_${players}p_${rounds}r.bytes`;
    a.click();
  };
  reader.readAsArrayBuffer(uploadedFile);
});

// Optional: Clear error on password input
passwordInput.addEventListener('input', () => {
  passwordError.textContent = '';
});