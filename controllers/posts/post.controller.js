const { Post,User,userActivity,Comment,Tag,PostTag,Image } = require('../../models');

const AddPostPicture = async (req,res) => {
  const { image } = req.body;
  console.log(image)
  try {
    if (req.file == undefined) {
      return res.json(`You must select a file.`);
    }
    const image = Image.create({
      type: image.mimetype,
      imageType: 'post',
      imageId: id,
      name: image.filename,
      data: fs.readFileSync(
        __basedir + `/resources/static/assets/uploads/post/${image.filename}`
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + `/resources/static/assets/tmp/post/${image.filename}`,
        image.data
      );
      console.log(image);
      return res.json(`File has been uploaded (${image.filename})`);
    });
  } catch (error) {
    return res.json(`Error when trying upload images: ${error}`);
  }
}

const createOne = async (req,res) => {
  const { title, content, userId , tags , richContent,image } = req.body;
  console.log(req.body)
  await Post.create({
    title,
    content,
    userId: userId,
    richContent,
    publicationStatus: 'draft',
  })
  .then( apiResponse => {
    tags.forEach( async (tag) => {
      await Tag.findOrCreate({
        name:tag,
        postId: apiResponse.id,
        where: { name: tag },

      })
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
    .catch( err => res.json( { data: null, err: err } ))
    })
    if(image) {
      Image.create({
        type: image.mimetype,
        imageType: 'post',
        imageId: apiResponse.id,
        name: image.filename,
        data: fs.readFileSync(
          __basedir + `/resources/static/assets/uploads/post/${image.filename}`
        ),
      }).then((image) => {
        fs.writeFileSync(
          __basedir + `/resources/static/assets/tmp/post/${image.filename}`,
          image.data
        );
        })
    }
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
    include: [{
      model: User,
      as: 'author',
      attributes: ['id', 'firstName', 'lastName'],
    },
  ],
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
    },

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
