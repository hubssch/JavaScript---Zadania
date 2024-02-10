const addForm = document.getElementById('add-form');
const notesList = document.getElementById('notes-list');

const saveNote = (note) => {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
};

const deleteNote = (index) => {
    let notes = JSON.parse(localStorage.getItem('notes'));
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
};

const renderNotes = () => {
    notesList.innerHTML = '';
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach((note, index) => {
        const noteEl = document.createElement('div');
        noteEl.classList.add('note');
        noteEl.style.backgroundColor = note.color;
        const noteContent = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <p>${note.date}</p>
            <button class="delete-btn">Usuń</button>`;
        noteEl.innerHTML = noteContent;
        noteEl.querySelector('.delete-btn').addEventListener('click', () => {
            deleteNote(index);
        });
        notesList.appendChild(noteEl);
    });
};

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = addForm.querySelector('#title').value;
    const content = addForm.querySelector('#content').value;
    const color = addForm.querySelector('#color').value;
    const date = new Date().toLocaleString();
    const pinned = false;
    saveNote({title, content, color, pinned, date});
    addForm.reset();
});

renderNotes();
