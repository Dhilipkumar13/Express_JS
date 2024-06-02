const whitelist = [
    'https://www.yourswebsite.com',
    'http://127.0.0.1:5500',
    'http://127.0.0.1:3501',
    'http://localhost:3501'
]
const corsOperation = {
    origin:(origin, callback) => {
        if(whitelist.indexOf(origin)!==-1 || !origin){
            callback(null, true)
        }
        else{
            callback(new Error('Not allowed by corps'))
        }
    },
    optionsSuccessStatus : 200
}

module.exports = corsOperation;