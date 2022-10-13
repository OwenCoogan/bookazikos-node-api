const { Post,User,userActivity } = require('../../models');

const getAll = async (req, res) => {
    await User.findAll({})
    .then( apiResponse => res.json( { data: apiResponse, err: null } ))
    .catch( apiError => res.json( { data: null, err: apiError } ))
}

module.exports = {
    getAll
}
