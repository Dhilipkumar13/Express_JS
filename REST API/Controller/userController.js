const data = {
    user: require('../Data/db.json'),
    setUser: function(data) { this.user = data; }
};

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

// Function to get all users
const userGet = (req, res) => {
    res.json(data.user);
};

// Function to register a new user
const userPost = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ "message": `User password must needed` });

    const duplicate = data.user.find(person => person.username === username);
    if (duplicate)
        return res.status(400).json({ 'message': `Username ${username} already exists` });

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: data.user.length > 0 ? data.user[data.user.length - 1].id + 1 : 1,
            username: username,
            password: hashPassword
        };

        data.setUser([...data.user, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'Data', 'db.json'),
            JSON.stringify(data.user, null, 2)
        );

        res.status(201).json({ 'success': `New user ${username} registered` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

// Function to update an existing user
const userPut = async (req, res) => {
    const { id, username, password } = req.body;

    const user = data.user.find(usr => usr.id === parseInt(id));
    if (!user)
        return res.status(400).json({ "message": `User ID ${id} not found` });

    if (username) user.username = username;
    if (password) user.password = await bcrypt.hash(password, 10);

    const filteredArray = data.user.filter(usr => usr.id !== parseInt(id));
    const unsortedArray = [...filteredArray, user];
    data.setUser(unsortedArray.sort((a, b) => a.id > b.id ? 1 : -1));

    try {
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'Data', 'db.json'),
            JSON.stringify(data.user, null, 2)
        );
        res.json(data.user);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

// Function to delete a user
const userDelete = async (req, res) => {
    const { id } = req.body;

    const user = data.user.find(usr => usr.id === parseInt(id));
    if (!user)
        return res.status(400).json({ "message": `User ID ${id} not found` });

    const filteredArray = data.user.filter(usr => usr.id !== parseInt(id));
    data.setUser([...filteredArray]);

    try {
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'Data', 'db.json'),
            JSON.stringify(data.user, null, 2)
        );
        res.json(data.user);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

// Function to get a user by ID
const userGetId = (req, res) => {
    const user = data.user.find(usr => usr.id === parseInt(req.params.id));
    if (!user)
        return res.status(400).json({ "message": `User ID ${req.params.id} not found` });

    res.json(user);
};

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userGetId
};
