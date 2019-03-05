const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name : "C1"},
    {id: 2, name : "C2"},
    {id: 3, name : "C3"},
];


app.get('/', (req, res) => {
    res.send('This is cool !!!');
});


app.get('/api/courses', (req, res) => {
    res.send(courses);
});


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not found!");
    res.send(course);
});


app.post('/api/courses', (req, res) => {
    const valRes = validateCourse(req.body);
    if (valRes.error) return res.status(400).send(valRes.error);
        
    const course = {
        id : courses.length + 1,
        name : req.body.name
    };
    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not found!");
    

    const valRes = validateCourse(req.body);
    if (valRes.error) return res.status(400).send(valRes.error);
      
    course.name = req.body.name;
    res.send(course);
});


app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not found!");

    const index = courses.indexOf(course);
    courses.slice(index, 1);

    res.send(course);
});


function validateCourse(course)
{
    const schema = {
        name : Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}


const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listeninbg to port ${port}...`));

