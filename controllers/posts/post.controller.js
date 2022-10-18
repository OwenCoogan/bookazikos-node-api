const { Post,User,userActivity,Comment,Tag,PostTag } = require('../../models');

const AddPostPicture = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.json(`You must select a file.`);
    }
    Image.create({
      type: req.file.mimetype,
      imageType: 'post',
      imageId: req.params.id,
      name: req.file.filename,
      data: fs.readFileSync(
        __basedir + `/resources/static/assets/uploads/post/${req.file.filename}`
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + `/resources/static/assets/tmp/post/${req.file.filename}`,
        image.data
      );
      return res.json(`File has been uploaded (${req.file.filename})`);
    });
  } catch (error) {
    return res.json(`Error when trying upload images: ${error}`);
  }
}

const createOne = async (req,res) => {
  const { title, content, userId , tags , richContent } = req.body;
  await Post.create({
    title,
    content,
    userId: userId,
    richContent,
    publicationStatus: 'draft',
  })
  .then( apiResponse => {
    tags.forEach( async (tag) => {
      Tag.create({
        name: tag,
        postId: apiResponse.id,
      })
      .then( response =>{
        PostTag.create({
          postId: apiResponse.id,
          tagId: response.id,
        })
      }

      )
    })
    return res.json( { data: apiResponse, err: null } )
  })
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
    include: [{
      model: User,
      as: 'author',
      attributes: ['id', 'firstName', 'lastName'],
    },
    {
      model: Comment,
      as: 'comments',
      attributes: ['id', 'content', 'createdAt'],
      include: {
        model: User,
        as: 'author',
        attributes: ['id', 'firstName', 'lastName'],
      }
    },
    {
      model: Tag,
      as: 'tags',
      attributes: ['id', 'name'],
    }

  ],
  }).then( apiResponse => res.json( { data: {
    id: apiResponse.id,
    title: apiResponse.title,
    content: apiResponse.content,
    richContent: JSON.parse(apiResponse.richContent),
    author: apiResponse.author,
    comments: apiResponse.comments,
    publicationStatus: apiResponse.publicationStatus,
    tags: apiResponse.tags,
    createdAt: apiResponse.createdAt,
  }, err: null } ))
  .catch( err => res.json( { data: null, err: err } ))
}

module.exports = {
  createOne,
  getDrafts,
  getOne,
  publishPost,
  getPublishedPosts,
  AddPostPicture
}
