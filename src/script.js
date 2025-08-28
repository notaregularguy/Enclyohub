let community = { name: '', genre: '', description: '' };
let pages = {};
let currentEditPage = '';
let currentRenameKey = '';

function loadData() {
  const storedCommunity = localStorage.getItem('community');
  const storedPages = localStorage.getItem('wikiPages');

  if (storedCommunity) {
    community = JSON.parse(storedCommunity);
    document.getElementById('communityName').value = community.name;
    document.getElementById('communityGenre').value = community.genre;
    document.getElementById('communityDescription').value = community.description;
  }

  if (storedPages) {
    pages = JSON.parse(storedPages);
  }

  renderPages();
}

function saveData() {
  localStorage.setItem('community', JSON.stringify(community));
  localStorage.setItem('wikiPages', JSON.stringify(pages));
}

function renderPages() {
  const container = document.getElementById('pagesList');
  container.innerHTML = '';

  for (const [title, content] of Object.entries(pages)) {
    const card = document.createElement('div');
    card.className = 'page-card';
    const preview = content.length > 100 ? content.substring(0, 100) + '...' : content;

    card.innerHTML = `
      <h3>${title}</h3>
      <div class="content-preview">${preview}</div>
      <div class="page-actions">
        <button class="btn btn-small" onclick="editPage('${title}')">Edit</button>
        <button class="btn btn-secondary btn-small" onclick="openRenameModal('${title}')">Rename</button>
        <button class="btn btn-danger btn-small" onclick="deletePage('${title}')">Delete</button>
      </div>
    `;

    container.appendChild(card);
  }
}

function editPage(title) {
  currentEditPage = title;
  document.getElementById('pageTitle').value = title;
  document.getElementById('pageContent').value = pages[title];
  updatePreview();
}

function deletePage(title) {
  if (confirm(`Delete page "${title}"?`)) {
    delete pages[title];
    saveData();
    renderPages();
    if (currentEditPage === title) {
      clearEditor();
    }
  }
}

function clearEditor() {
  currentEditPage = '';
  document.getElementById('pageTitle').value = '';
  document.getElementById('pageContent').value = '';
  document.getElementById('markdownPreview').innerHTML = '';
}

function openRenameModal(title) {
  currentRenameKey = title;
  document.getElementById('newPageTitle').value = title;
  document.getElementById('renameModal').style.display = 'flex';
}

function closeRenameModal() {
  document.getElementById('renameModal').style.display = 'none';
  currentRenameKey = '';
}

function confirmRename() {
  const newTitle = document.getElementById('newPageTitle').value.trim();
  if (!newTitle) {
    alert('Title required');
    return;
  }
  if (newTitle !== currentRenameKey && pages[newTitle]) {
    alert('Page with this title already exists');
    return;
  }

  pages[newTitle] = pages[currentRenameKey];
  if (newTitle !== currentRenameKey) {
    delete pages[currentRenameKey];
  }

  if (currentEditPage === currentRenameKey) {
    currentEditPage = newTitle;
    document.getElementById('pageTitle').value = newTitle;
  }

  saveData();
  renderPages();
  closeRenameModal();
}

function updatePreview() {
  const content = document.getElementById('pageContent').value;
  const preview = document.getElementById('markdownPreview');
  preview.innerHTML = marked.parse(content);
}

function switchTab(tabName) {
  document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  document.querySelectorAll('.tab-panel').forEach((p) => (p.style.display = 'none'));
  document.getElementById(`${tabName}-tab`).style.display = 'block';
  if (tabName === 'preview') {
    updatePreview();
  }
}

function showSuccess(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = message;
  document.querySelector('.container').insertBefore(successDiv, document.querySelector('.main-content'));
  setTimeout(() => successDiv.remove(), 3000);
}

/* Event Listeners */
document.getElementById('saveCommunity').onclick = function () {
  community.name = document.getElementById('communityName').value.trim();
  community.genre = document.getElementById('communityGenre').value.trim();
  community.description = document.getElementById('communityDescription').value.trim();
  saveData();
  showSuccess('Community saved successfully!');
};

document.getElementById('addPage').onclick = function () {
  const title = document.getElementById('pageTitle').value.trim();
  const content = document.getElementById('pageContent').value.trim();

  if (!title) {
    alert('Page title is required');
    return;
  }
  if (currentEditPage && currentEditPage !== title && pages[title]) {
    alert('Page with this title already exists');
    return;
  }
  if (currentEditPage && currentEditPage !== title) {
    delete pages[currentEditPage];
  }

  pages[title] = content;
  currentEditPage = title;
  saveData();
  renderPages();
  showSuccess(`Page "${title}" saved successfully!`);
};

document.getElementById('clearPage').onclick = clearEditor;

document.getElementById('generateBtn').onclick = function () {
  if (!community.name) {
    alert('Please save community information first');
    return;
  }

  let pageContent = '';
  for (const [title, content] of Object.entries(pages)) {
    pageContent += `<div class="page-section"><h2>${title}</h2><div class="page-content">${marked.parse(content)}</div></div>`;
  }

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${community.name}</title>
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;color:#333}
      .container{max-width:1000px;margin:0 auto;padding:20px}
      .header{text-align:center;margin-bottom:40px;color:#fff}
      .header h1{font-size:3rem;font-weight:700;text-shadow:0 4px 8px rgba(0,0,0,0.3);margin-bottom:10px}
      .header .genre{font-size:1.3rem;opacity:0.9;margin-bottom:15px}
      .header .description{font-size:1.1rem;opacity:0.8;max-width:600px;margin:0 auto;line-height:1.6}
      .content{background:rgba(255,255,255,0.95);backdrop-filter:blur(10px);border-radius:20px;padding:40px;box-shadow:0 8px 32px rgba(31,38,135,0.37);border:1px solid rgba(255,255,255,0.18)}
      .page-section{margin-bottom:40px;padding-bottom:30px;border-bottom:2px solid #e2e8f0}
      .page-section:last-child{border-bottom:none}
      .page-section h2{color:#2d3748;margin-bottom:20px;font-size:1.8rem;font-weight:600}
      .page-content h1,h2,h3,h4,h5,h6{margin:20px 0 10px 0;color:#2d3748}
      .page-content p{margin-bottom:15px;line-height:1.6;color:#4a5568}
      .page-content ul,ol{margin:15px 0;padding-left:25px}
      .page-content li{margin-bottom:5px}
      .page-content code{background:#edf2f7;padding:3px 8px;border-radius:4px;font-family:Monaco,'Courier New',monospace;font-size:0.9em}
      .page-content pre{background:#2d3748;color:#fff;padding:20px;border-radius:12px;overflow-x:auto;margin:20px 0}
      .page-content blockquote{border-left:4px solid #667eea;margin:20px 0;padding:15px 25px;background:#f8fafc;border-radius:8px;font-style:italic}
      .page-content strong{font-weight:600;color:#2d3748}
      .page-content em{font-style:italic}
      .page-content a{color:#667eea;text-decoration:none}
      .page-content a:hover{text-decoration:underline}
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>${community.name}</h1>
        <div class="genre">Genre: ${community.genre}</div>
        <div class="description">${community.description}</div>
      </div>
      <div class="content">
        ${pageContent}
      </div>
    </div>
  </body>
  </html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${community.name}.html`;
  a.click();
  URL.revokeObjectURL(url);
  showSuccess(`${community.name}.html generated successfully!`);
};

/* Tabs */
document.querySelectorAll('.tab').forEach((tab) => {
  tab.onclick = () => switchTab(tab.dataset.tab);
});

/* Live Preview */
document.getElementById('pageContent').oninput = function () {
  if (document.querySelector('.tab[data-tab="preview"]').classList.contains('active')) {
    updatePreview();
  }
};

/* Initialize */
loadData();
