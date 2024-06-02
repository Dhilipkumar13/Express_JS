const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3501;
const cors = require('cors');
const corsOperation = require('../Config/corsOperation');

console.log(corsOperation); // Check if corsOperation is correct
app.use(cors(corsOperation)); // Apply CORS middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, './public'))); // Serve static files from the 'public' directory

const rootRouter = require('../router/root');
const userRouter = require('../router/api/user');
const authRouter = require('../router/api/auth')
console.log(rootRouter); // Check if rootRouter is correct
console.log(userRouter); // Check if userRouter is correct

app.use('/', rootRouter); // Use root router
app.use('/user', userRouter); // Use user router
app.use('/login', authRouter);
// Route to handle all other requests and send a 404 response
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'view', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
