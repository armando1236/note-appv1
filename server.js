const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require("./db/db.json")
const uuid = require("uuid");
const { networkInterfaces } = require('os');

const PORT = process.env.PORT || 3001;

const app = express();
function noteCreateNewNote(body, noteTakerArray) {
  const note = body;
  noteTakerArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({
      notes: noteTakerArray
    }, null, 2)
  )
  return note;
}



// Middleware for parsing JSON and urlencoded form data
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/api/notes', (req, res) => {
  res.json(notes.slice(1));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

function createNewNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray))
      notesArray = [];
  
  if (notesArray.length === 0)
      notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;

  notesArray.push(newNote);
  fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify(notesArray, null, 2)
  );
  return newNote;
}

app.post('/api/notes', (req, res) => {
  const newNote = createNewNote(req.body, notes);
  res.json(newNote);
});


          // GET Route for homepage
          app.get('/', function (req, res) {
          res.sendFile(path.join(__dirname, + '/public/index.html'));
          });
          
          // GET Route for feedback page
          app.get('/notes', function (req, res) {
          res.sendFile(path.join(__dirname + '/public/notes.html'));
          });
      
          app.listen(PORT, () =>
          console.log(`App listening at http://localhost:${PORT} 🚀`)
        );