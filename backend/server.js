const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

const lessonsFile = path.join(DATA_DIR, 'lessons.json');
const noticesFile = path.join(DATA_DIR, 'notices.json');
const teachersFile = path.join(DATA_DIR, 'teachers.json');
const attendanceFile = path.join(DATA_DIR, 'attendance.jsonl');
const resourcesFile = path.join(DATA_DIR, 'resources.json');

// Seed data if missing
if (!fs.existsSync(lessonsFile)) {
  fs.writeFileSync(lessonsFile, JSON.stringify([
    { id: 1, title: 'Math Basics', category: 'Math', desc: 'Addition, subtraction, mental arithmetic' },
    { id: 2, title: 'Science - Plants', category: 'Science', desc: 'Parts of a plant, local crops' },
    { id: 3, title: 'Digital Literacy', category: 'Digital', desc: 'Using a smartphone and basic apps' }
  ], null, 2));
}

if (!fs.existsSync(resourcesFile)) {
  fs.writeFileSync(resourcesFile, JSON.stringify([
    { id: 1, title: 'Math Quick Guide (PDF)', url: 'https://example-files.online-convert.com/document/pdf/example.pdf', size: '120KB' },
    { id: 2, title: 'Plant Care Guide (PDF)', url: 'https://example-files.online-convert.com/document/pdf/example.pdf', size: '150KB' }
  ], null, 2));
}

if (!fs.existsSync(noticesFile)) {
  fs.writeFileSync(noticesFile, JSON.stringify([
    { id: 1, text: 'Free health camp on 15th Aug', author: 'District Admin', date: new Date().toISOString() }
  ], null, 2));
}

if (!fs.existsSync(teachersFile)) {
  fs.writeFileSync(teachersFile, JSON.stringify([
    { id: 1, name: 'Mrs. Mehta', phone: '+91-90000-11111', subject: 'Math' },
    { id: 2, name: 'Mr. Sharma', phone: '+91-90000-22222', subject: 'Science' }
  ], null, 2));
}

// Helper to read JSON
function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file)); } catch (e) { return []; }
}

// Lessons
app.get('/api/lessons', (req, res) => {
  res.json(readJson(lessonsFile));
});

// Resources
app.get('/api/resources', (req, res) => {
  res.json(readJson(resourcesFile));
});

// Notices
app.get('/api/notices', (req, res) => {
  res.json(readJson(noticesFile));
});

app.post('/api/notices', (req, res) => {
  const notices = readJson(noticesFile);
  const nextId = (notices.length ? Math.max(...notices.map(n => n.id)) : 0) + 1;
  const notice = { id: nextId, text: req.body.text || '', author: req.body.author || 'Teacher', date: new Date().toISOString() };
  notices.unshift(notice);
  fs.writeFileSync(noticesFile, JSON.stringify(notices, null, 2));
  res.json({ success: true, notice });
});

// Teachers
app.get('/api/teachers', (req, res) => {
  res.json(readJson(teachersFile));
});

// Attendance (append newline-delimited JSON for quick storage)
app.post('/api/attendance', (req, res) => {
  const record = req.body; // { date, lessonId, students: {name: boolean}, notes }
  fs.appendFileSync(attendanceFile, JSON.stringify(record) + '\n');
  res.json({ success: true });
});

// Quiz submissions (store in attendance file for simplicity)
app.post('/api/quiz-submit', (req, res) => {
  const submission = req.body; // { quizId, student, score }
  fs.appendFileSync(attendanceFile, JSON.stringify({ type: 'quiz', submission }) + '\n');
  res.json({ success: true });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));