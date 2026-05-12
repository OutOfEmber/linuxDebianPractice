const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.post('/users/add', (req, res) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = { id: newId, name, email };
    users.push(newUser);
    
    res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex !== -1) {
        if (name) users[userIndex].name = name;
        if (email) users[userIndex].email = email;
        
        res.json({ 
            message: 'User updated successfully', 
            user: users[userIndex] 
        });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(200).json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});
app.get('/', (req, res) => {
    res.send('Hello from backend');
});
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});