// --- Select Options Populate ---
function populateSelect(selectId, maxOption) {
  const select = document.getElementById(selectId);
  select.innerHTML = '';
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

downloadBtn.addEventListener('click', () => {
  if (!uploadedFile) return;

  const teams = document.getElementById('teams-select').value;
  const players = document.getElementById('players-select').value;
  const rounds = document.getElementById('rounds-select').value;

  const reader = new FileReader();
  reader.onload = function(event) {
    const blob = new Blob([event.target.result], { type: 'application/octet-stream' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `edited_map_${teams}t_${players}p_${rounds}r.bytes`;
    a.click();
  };
  reader.readAsArrayBuffer(uploadedFile);
});
