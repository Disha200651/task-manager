const express= require('express');
const cors= require('cors');
require('dotenv').config();
const app=express();

app.use(cors());
app.use(express.json());

let tasks=[];
let nextId =1;
app.get('/',(req,res)=>{
    res.send('Task manager api is running');

});

app.get('/api/tasks',(req,res)=>{
    res.json(tasks);
});
app.post('/api/tasks',(req,res)=>{
    const {title}= req.body;
    if (!title){
        return res.status(400).json({message:'Title is required'});
    }
    const task={ id:nextId++, title, completed:false};
    tasks.push(task);
    res.status(201).json(task);
});

app.get('/api/tasks/:id',(req,res)=> {
    const task= tasks.find(t=>t.id=== parseInt(req.params.id));
    if (!task){
        return res.status(404).json({message: 'Task not found'});
    }
    res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.json({ message: 'Task deleted' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
