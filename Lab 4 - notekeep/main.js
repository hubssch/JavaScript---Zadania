const addForm = document.getElementById('add-form');
const notesList = document.getElementById('notes-list');
const title = document.getElementById('title')
const content = document.getElementById('content')
const color = document.getElementById('color')
let editID = null;

const saveNote = (note) => {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    if(editID) {
        const index = notes.findIndex(item => item.id === editID)
        notes.splice(index , 1, note);
    } else {
        notes.push(note);
    }
    localStorage.setItem('notes', JSON.stringify(notes));
    editID = null;
    renderNotes();  
};


const deleteNote = (index) => {
    let notes = JSON.parse(localStorage.getItem('notes'));
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
};

const editNote = (index) => {
    let notes = JSON.parse(localStorage.getItem('notes'))
    let note = notes[index];
    title.value = note.title;
    content.value = note.content;
    color.value = note.color;
    editID = note.id;
}

const pinNote = (index) => {
    let notes = JSON.parse(localStorage.getItem('notes'))
    let note = notes[index];
    note.pinned = true;
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

const renderNotes = () => {
    notesList.innerHTML = '';
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.sort( (a, b) => {
        console.log(a);
        return b.pinned-a.pinned
    })
    notes.forEach((note, index) => {
        const noteEl = document.createElement('div');
        noteEl.classList.add('note');
        noteEl.style.backgroundColor = note.color;
        const noteContent = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <p>${note.date}</p>
            <p>${note.pinned}</p>
            <button class="delete-btn">Usuń</button>
            <button class="edit-btn">Edytuj</button>
            <button class="pin-btn">Pin</button>`;
        noteEl.innerHTML = noteContent;
        noteEl.querySelector('.delete-btn').addEventListener('click', () => {
            deleteNote(index);
        });
        noteEl.querySelector('.edit-btn').addEventListener('click', () => {
            editNote(index);
        });
        noteEl.querySelector(".pin-btn").addEventListener('click', () => {
            pinNote(index);
        })
        notesList.appendChild(noteEl);
    });
};

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = Date.now();
    const title = addForm.querySelector('#title').value;
    const content = addForm.querySelector('#content').value;
    const color = addForm.querySelector('#color').value;
    const date = new Date().toLocaleString();
    const pinned = false;
    saveNote({title, content, color, pinned, date, id});
    addForm.reset();
});

renderNotes();

