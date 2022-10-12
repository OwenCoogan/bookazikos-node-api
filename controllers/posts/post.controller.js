const { Post,User } = require('../../models');

const createOne = async (req,res) => {
  const { title, content, userId , tags , richContent } = req.body;
  await Post.create({
    title,
    content,
    userId: userId,
    richContent,
    publicationStatus: 'draft',
  })
  .then( apiResponse => res.json( { data: apiResponse, err: null } ))
  .catch( err => res.json( { data: null, err: err } ))
}

const publishPost = async (req,res) => {
  const { id } = req.body;
  console.log(id);
  await Post.update({ publicationStatus: 'published' }, { where: { id: id } })
  .then( apiResponse => res.json( { data: apiResponse, err: null } ))
  .catch( err => res.json( { data: null, err: err } ))
}

const getPublishedPosts = async (req,res) => {
  await Post.findAll({
    where: { publicationStatus: 'published' },
    include: {
      model: User,
      as: 'author',
      attributes: ['id', 'firstName', 'lastName'],
    },
  }).then( apiResponse => res.json( { data: apiResponse, err: null } ))
}

const getDrafts = async (req,res) => {
  await Post.findAll({
    where: { publicationStatus: 'draft' },
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
    publicationStatus: apiResponse.publicationStatus,
  }, err: null } ))
  .catch( err => res.json( { data: null, err: err } ))
}

module.exports = {
  createOne,
  getDrafts,
  getOne,
  publishPost,
  getPublishedPosts
}
