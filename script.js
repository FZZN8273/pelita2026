// Navigasi & Menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navDropdown = document.getElementById('navDropdown');

hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navDropdown.classList.toggle('open');
});

// Klik di luar menu untuk menutup (User Control & Freedom)
document.addEventListener('click', (e) => {
    if (!navDropdown.contains(e.target) && e.target !== hamburgerBtn) {
        navDropdown.classList.remove('open');
    }
});

// Pindah Halaman & Highlight Aktif
document.querySelectorAll('.nav-dropdown button').forEach(btn => {
    btn.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        document.querySelectorAll('.halaman').forEach(h => h.classList.remove('active'));
        const activePage = document.getElementById(target);
        activePage.classList.add('active');
        if (target === 'home') activePage.style.display = 'flex';
        else activePage.style.display = 'block';
        
        // Highlight Tombol Aktif (System Status)
        document.querySelectorAll('.nav-dropdown button').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        navDropdown.classList.remove('open');
    });
});

// Chatbot
function toggleChat() {
    const win = document.getElementById('ai-chat-window');
    win.style.display = win.style.display === 'flex' ? 'none' : 'flex';
}

function sendChatGemini() {
    const input = document.getElementById('ai-chat-input').value;
    // PRINSIP 5: ERROR PREVENTION (Cegah kirim kosong)
    if (!input.trim()) return;
    
    const messages = document.getElementById('ai-chat-messages');
    messages.innerHTML += `<div style="align-self:flex-end; background:#2E8B57; color:white; padding:10px 14px; border-radius:16px 16px 0 16px; max-width:85%; margin-bottom:8px;">${input}</div>`;
    
    const lowerInput = input.toLowerCase();
    let response = "Maaf Kak, saya belum punya data itu. Coba tanya soal obat, gizi, TBC, atau vaksin ya! (Ketik: help)";
    
    // PRINSIP 10: HELP & DOCUMENTATION
    if (lowerInput.includes("help") || lowerInput.includes("bantuan")) response = "Saya bisa bantu soal: Obat, Gizi, Sanitasi, Kesehatan Mental, TBC, Vaksin, dan P3K!";
    else if (lowerInput.includes("obat")) response = knowledge.obat;
    else if (lowerInput.includes("gizi") || lowerInput.includes("makan")) response = knowledge.gizi;
    else if (lowerInput.includes("sanitasi")) response = knowledge.sanitasi;
    else if (lowerInput.includes("mental")) response = knowledge.mental;
    else if (lowerInput.includes("tbc")) response = knowledge.tbc;
    else if (lowerInput.includes("vaksin")) response = knowledge.vaksin;
    else if (lowerInput.includes("p3k")) response = knowledge.p3k;
    
    messages.innerHTML += `<div style="align-self:flex-start; background:#eee; padding:10px 14px; border-radius:16px 16px 16px 0; max-width:85%; margin-bottom:8px;">${response}</div>`;
    
    document.getElementById('ai-chat-input').value = '';
    messages.scrollTop = messages.scrollHeight;
}
