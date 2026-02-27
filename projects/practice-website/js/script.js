/* my_website.js
   Interactivity: modal, notes storage, hover color accents, vCard download
*/

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const contactBtn = document.getElementById('contactBtn');
  const contactModal = document.getElementById('contactModal');
  const closeModal = document.getElementById('closeModal');
  const closeModal2 = document.getElementById('closeModal2');
  const copyEmail = document.getElementById('copyEmail');
  const yearSpan = document.getElementById('year');
  const saveNote = document.getElementById('saveNote');
  const clearNote = document.getElementById('clearNote');
  const notesArea = document.getElementById('notesArea');
  const downloadVcardBtn = document.getElementById('downloadVcard');
  const hireBtn = document.getElementById('hireBtn');

  // Set current year
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Modal open/close
  function openModal(){
    contactModal.setAttribute('aria-hidden', 'false');
  }
  function closeModalFn(){
    contactModal.setAttribute('aria-hidden', 'true');
  }
  contactBtn.addEventListener('click', openModal);
  closeModal.addEventListener('click', closeModalFn);
  closeModal2.addEventListener('click', closeModalFn);
  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) closeModalFn();
  });

  // Copy email
  copyEmail.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('yoliymepoh@gmail.com');
      copyEmail.textContent = 'Copied!';
      setTimeout(()=> copyEmail.textContent = 'Copy Email', 1500);
    } catch (err){
      alert('Could not copy. Email: yoliymepoh@gmail.com');
    }
  });

  // Notes: save to localStorage
  const NOTES_KEY = 'abdi_notes_v1';
  function loadNotes(){
    const raw = localStorage.getItem(NOTES_KEY);
    if (raw) notesArea.value = raw;
  }
  function saveNotes(){
    localStorage.setItem(NOTES_KEY, notesArea.value);
    saveNote.textContent = 'Saved';
    setTimeout(()=> saveNote.textContent = 'Save', 1200);
  }
  function clearNotes(){
    notesArea.value = '';
    localStorage.removeItem(NOTES_KEY);
  }
  saveNote.addEventListener('click', saveNotes);
  clearNote.addEventListener('click', clearNotes);
  loadNotes();

  // Hover accent: read data-hovercolor from cards and apply subtle glow on hover
  const cards = document.querySelectorAll('.card[data-hovercolor]');
  cards.forEach(card => {
    const color = card.dataset.hovercolor;
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = `0 24px 60px ${hexToRgba(color, 0.14)}, inset 0 1px 0 rgba(255,255,255,0.02)`;
      card.style.transform = 'translateY(-10px) scale(1.01)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
      card.style.transform = '';
    });
  });

  // vCard generation function (basic)
  function generateVcard(){
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Abdi Tilahun',
      'ORG:Mattu University',
      'TITLE:Computer Science Student',
      'EMAIL;TYPE=INTERNET:yoliymepoh@gmail.com',
      'TEL;TYPE=VOICE:',
      'URL:https://t.me/yoliymepoh',
      'END:VCARD'
    ].join('\n');
    return vcard;
  }
  downloadVcardBtn.addEventListener('click', () => {
    const blob = new Blob([generateVcard()], {type: 'text/vcard;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'abdi_tilahun.vcf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  // Hire button quick open modal & focus
  hireBtn.addEventListener('click', () => {
    openModal();
    // Focus copy button after opening
    setTimeout(()=> document.getElementById('copyEmail').focus(), 220);
  });

  // Utility: hex to rgba
  function hexToRgba(hex, alpha = 1){
    let c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c = hex.substring(1).split('');
      if(c.length === 3) c = [c[0],c[0],c[1],c[1],c[2],c[2]];
      c = '0x' + c.join('');
      return 'rgba(' + [(c>>16)&255, (c>>8)&255, c&255].join(',') + ',' + alpha + ')';
    }
    return hex;
  }

  // Accessibility: close modal on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModalFn();
  });

  // Profile photo fallback: if image fails to load, show initials-style background
  const profileImg = document.getElementById('profilePhoto');
  profileImg.addEventListener('error', () => {
    profileImg.style.display = 'none';
    const parent = profileImg.parentElement;
    const initials = document.createElement('div');
    initials.className = 'initials';
    initials.textContent = 'AT';
    initials.style.width = '100%';
    initials.style.height = '100%';
    initials.style.display = 'flex';
    initials.style.alignItems = 'center';
    initials.style.justifyContent = 'center';
    initials.style.background = 'linear-gradient(135deg,var(--accent-a),var(--accent-b))';
    initials.style.color = '#041017';
    initials.style.fontWeight = '700';
    initials.style.fontSize = '28px';
    parent.appendChild(initials);
  });
});
