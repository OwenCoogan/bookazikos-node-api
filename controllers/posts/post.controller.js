const { Post,User } = require('../../models');

const createOne = async (req,res) => {
  const { title, content, userId , tags } = req.body;
  console.log(title , content, userId, tags);
  await Post.create({
    title,
    content,
    userId: userId,
  })
  .then( apiResponse => res.json( { data: apiResponse, err: null } ))
  .catch( err => res.json( { data: null, err: err } ))
}

const getAll = async (req,res) => {
  await Post.findAll({
    include: {
      model: User,
      as: 'author',
      attributes: ['id', 'firstName', 'lastName'],
    },
  }).then( apiResponse => res.json( { data: apiResponse, err: null } ))
}
const getOne = async (req,res) => {
  const { id } = req.params;
  await Post.findOne({
    where: { id },
    include: {
      model: User,
      as: 'author',
      attributes: ['id', 'firstName', 'lastName'],
    },
  }).then( apiResponse => res.json( { data: apiResponse, err: null } ))
}

module.exports = {
  createOne,
  getAll,
  getOne
}
