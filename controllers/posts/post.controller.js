const { Post,User } = require('../../models');

const createOne = async (req,res) => {
  const { title, content, userId , tags , richContent } = req.body;
  console.log(title , content, userId, tags,richContent);
  await Post.create({
    title,
    content,
    userId: userId,
    tags,
    richContent
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
  }).then( apiResponse => res.json( { data: {
    id: apiResponse.id,
    title: apiResponse.title,
    content: apiResponse.content,
    richContent: JSON.parse(apiResponse.richContent),
    author: apiResponse.author,
  }, err: null } ))
}

module.exports = {
  createOne,
  getAll,
  getOne
}
