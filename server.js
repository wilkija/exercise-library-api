const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;


app.use(express.json());
app.use(cors());

let library = [
{
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
},
{
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false
},
{
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true
}
];

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/api/library', (req, res) => {
    res.json(library);
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/api/library/:id', (req, res) => {
    const id = Number(req.params.id);
    const exercise = library.find(exercise => exercise.id === id);
    if (exercise) {
        res.json(exercise);
    } else {
        res.status(404).end();
    }
});

app.delete('/api/library/:id', (req, res) => {
    const id = Number(req.params.id);
    library = library.filter(exercise => exercise.id !== id);

    res.status(204).end();
});

const generateId = () => {
    const maxId = library.length > 0
        ? Math.max(...library.map(n => n.id))
        : 0
    return maxId + 1;
}

app.post('/api/library', (req, res) => {
    const body = req.body;
    
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        });
    }

    const exercise = {
        content: body.content,
        important: body.important || false, 
        date: new Date(),
        id: generateId(),
    };

    library = library.concat(exercise);

    res.json(exercise);
});