const data = {
    user: require('../Data/db.json'),
    setUser: function(data) { this.user = data; }
};
const bcrypt = require('bcrypt');


const handleLogin = async(req,res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ "message": `User password must needed` })

    const foundUser = data.user.find(person => person.username === username);
    try{
        const match =   await bcrypt.compare(password, foundUser.password)

        if(match)
            return res.status(200).json({'success' : 'User Successfully loged in'})
        else
        return res.status(400).json({'unsuccess' : 'Username or password invalid'})
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = {
    handleLogin
}