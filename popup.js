// Not yönetimi için ana sınıf
class NotesManager {
  constructor() {
    this.notes = [];
    this.currentNoteId = null;
    this.isEditing = false;
    
    this.initializeElements();
    this.bindEvents();
    this.loadNotes();
  }

  initializeElements() {
    // DOM elementlerini seç
    this.notesView = document.getElementById('notesView');
    this.editorView = document.getElementById('editorView');
    this.notesList = document.getElementById('notesList');
    this.addNoteBtn = document.getElementById('addNoteBtn');
    this.backBtn = document.getElementById('backBtn');
    this.saveNoteBtn = document.getElementById('saveNoteBtn');
    this.noteTitle = document.getElementById('noteTitle');
    this.noteContent = document.getElementById('noteContent');
    this.statusMessage = document.getElementById('statusMessage');
  }

  bindEvents() {
    // Event listener'ları bağla
    this.addNoteBtn.addEventListener('click', () => this.createNewNote());
    this.backBtn.addEventListener('click', () => this.showNotesList());
    this.saveNoteBtn.addEventListener('click', () => this.saveNote());
    
    // Enter tuşu ile kaydetme
    this.noteTitle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.saveNote();
      }
    });
  }

  // Not butonlarını bağla
  bindNoteButtons() {
    // Not kutusuna tıklama
    this.notesList.querySelectorAll('.note-item').forEach(noteItem => {
      noteItem.addEventListener('click', (e) => {
        // Eğer butonlara tıklanmadıysa notu aç
        if (!e.target.closest('.note-actions')) {
          const noteId = noteItem.getAttribute('data-id');
          this.editNote(noteId);
        }
      });
    });

    // Düzenle butonları
    this.notesList.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const noteId = btn.getAttribute('data-note-id');
        this.editNote(noteId);
      });
    });

    // Sil butonları
    this.notesList.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const noteId = btn.getAttribute('data-note-id');
        this.deleteNote(noteId);
      });
    });
  }

  // Notları Chrome storage'dan yükle
  loadNotes() {
    chrome.storage.sync.get(['notes'], (result) => {
      this.notes = result.notes || [];
      this.renderNotesList();
    });
  }

  // Notları Chrome storage'a kaydet
  saveNotesToStorage() {
    chrome.storage.sync.set({ 'notes': this.notes }, () => {
      console.log('Notlar kaydedildi:', this.notes);
    });
  }

  // Not listesini render et
  renderNotesList() {
    if (this.notes.length === 0) {
      this.notesList.innerHTML = `
        <div class="empty-state">
          <div>📝</div>
          <h3>Henüz not yok</h3>
          <p>İlk notunuzu oluşturmak için "Yeni Not Ekle" butonuna tıklayın.</p>
        </div>
      `;
      return;
    }

    this.notesList.innerHTML = this.notes
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .map(note => this.createNoteElement(note))
      .join('');
    
    // Buton event listener'larını bağla
    this.bindNoteButtons();
  }

  // Tekil not elementi oluştur
  createNoteElement(note) {
    const preview = note.content.length > 100 
      ? note.content.substring(0, 100) + '...' 
      : note.content;
    
    const date = new Date(note.updatedAt).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return `
      <div class="note-item" data-id="${note.id}">
        <div class="note-title">${this.escapeHtml(note.title || 'Başlıksız Not')}</div>
        <div class="note-preview">${this.escapeHtml(preview)}</div>
        <div class="note-date">${date}</div>
        <div class="note-actions">
          <button class="btn-small btn-edit" data-note-id="${note.id}">
            ✏️ Düzenle
          </button>
          <button class="btn-small btn-delete" data-note-id="${note.id}">
            🗑️ Sil
          </button>
        </div>
      </div>
    `;
  }

  // Yeni not oluştur
  createNewNote() {
    this.currentNoteId = null;
    this.isEditing = false;
    this.noteTitle.value = '';
    this.noteContent.value = '';
    this.showEditor();
  }

  // Notu düzenle
  editNote(noteId) {
    const note = this.notes.find(n => n.id === noteId);
    if (note) {
      this.currentNoteId = noteId;
      this.isEditing = true;
      this.noteTitle.value = note.title || '';
      this.noteContent.value = note.content || '';
      this.showEditor();
    }
  }

  // Notu kaydet
  saveNote() {
    const title = this.noteTitle.value.trim();
    const content = this.noteContent.value.trim();

    if (!content) {
      this.showStatus('Not içeriği boş olamaz!', 'error');
      return;
    }

    const now = new Date().toISOString();

    if (this.isEditing && this.currentNoteId) {
      // Mevcut notu güncelle
      const noteIndex = this.notes.findIndex(n => n.id === this.currentNoteId);
      if (noteIndex !== -1) {
        this.notes[noteIndex] = {
          ...this.notes[noteIndex],
          title: title || 'Başlıksız Not',
          content: content,
          updatedAt: now
        };
      }
    } else {
      // Yeni not oluştur
      const newNote = {
        id: this.generateId(),
        title: title || 'Başlıksız Not',
        content: content,
        createdAt: now,
        updatedAt: now
      };
      this.notes.unshift(newNote);
    }

    this.saveNotesToStorage();
    this.showStatus('Not başarıyla kaydedildi!');
    this.showNotesList();
  }

  // Notu sil
  deleteNote(noteId) {
    if (confirm('Bu notu silmek istediğinizden emin misiniz?')) {
      this.notes = this.notes.filter(note => note.id !== noteId);
      this.saveNotesToStorage();
      this.renderNotesList();
      this.showStatus('Not silindi!');
    }
  }

  // Not listesini göster
  showNotesList() {
    this.notesView.style.display = 'block';
    this.editorView.classList.remove('active');
    this.renderNotesList();
  }

  // Editörü göster
  showEditor() {
    this.notesView.style.display = 'none';
    this.editorView.classList.add('active');
    this.noteTitle.focus();
  }

  // Durum mesajı göster
  showStatus(message, type = 'success') {
    this.statusMessage.textContent = message;
    this.statusMessage.className = `status-message show ${type}`;
    
    setTimeout(() => {
      this.statusMessage.classList.remove('show');
    }, 3000);
  }

  // Benzersiz ID oluştur
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // HTML escape
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Eklenti yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', function() {
  window.notesManager = new NotesManager();
});