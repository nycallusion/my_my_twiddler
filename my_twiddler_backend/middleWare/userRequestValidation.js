const Users = require('../models/Users');

module.exports = {
    /////check if all fiend are filled
    validateRegister: async(req, res, next) => {
        console.log('hit')
        const {email, password, userName} = req.body;
        let user = await Users.findOne({email});
        let userNameExist = await Users.findOne({userName});
        if (user) {
            return res
                .status(409)
                .json({status: 'error', message: 'Email Already Exist!'});
        };
        if (userNameExist) {
            return res
                .status(409)
                .json({status: 'error', message: 'UserName Already Exist!'});
        };

        if (!email || !password || !userName) {
            return res
                .status(400)
                .json({status: 'error', message: 'All field must be filled'});
        };
        if (!email.includes('@') || !email.includes('.')) {
            return res
                .status(400)
                .json({status: 'error', message: 'Use a valid Email'});
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({status: 'error', message: 'Password must be 6 character or longer'});
        }
        console.log('hit')
        next();
    }
};