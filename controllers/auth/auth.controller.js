const { User,Post,Comment } = require('../../models');
const jwt = require('jsonwebtoken');
const { AdminInvitation } = require('../../config/email-transporter/email-templates/AdminInvitation');
const { transporter } = require('../../config/email-transporter/email-transporter');
const { nodemailer } = require('nodemailer');

const generateAccessToken = (email, id) => {
  return jwt.sign({ email ,id }, 'BookazikosCookie', { expiresIn: '100000000000s' }
  );
}

const checkAccessToken = async (req,res) => {
  const token = req.body.token;
  if(!token) return res.json({ data: null, err: 'No token provided' });
  const decoded = jwt.verify(token, 'BookazikosCookie');
  await User.findOne({
    where: { id: decoded.id }
  })
  .then( apiResponse => res.json( { data: {
    id: apiResponse.id,
    email: apiResponse.email,
    role: apiResponse.role,
    firstName: apiResponse.firstName,
    lastName: apiResponse.lastName,
  }, err: null } ))
  .catch( apiError => res.json( { data: null, err: apiError } ))

}

const createOne = async (req,res) => {
  const { firstName, lastName, email, password } = req.body;
  const existingUser = await User.findOne({
    where: { email: email }
  });
  if(!existingUser){
    await User.create({
      firstName,
      lastName,
      email,
      password,
      role: 'user'
    })
    .then( apiResponse => res.json( { data: apiResponse, err: null } ))
    .catch( err => res.json( { data: null, err: err } ))
  }
  else{
    return res.json({
      errorCode: 'User already exists'
    });
  }
}

const sendAdminInvitationEmail = async (req,res) => {
  console.log(req.body)
  const existingUser = await User.findOne({
    where: { email: req.body.email }
  });
  console.log(existingUser)
  if(!existingUser){
    await transporter.sendMail(AdminInvitation(req.body.email), (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });

  }
}

const readAll = async (req,res) => {
    await User.findAll({})
    .then( apiResponse => res.json( { data: apiResponse, err: null } ))
    .catch( apiError => res.json( { data: null, err: apiError } ))
}

const updateOne = async (req,res) => {
  await User.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    email: req.body.email,
    role: req.body.role,
    description: req.body.description,
    occupation: req.body.occupation,
  },
  {
    where: { id: req.params.id }
  }
  )
  .then( apiResponse => res.json( { data: apiResponse, err: null } ))
  .catch( apiError => res.json( { data: null, err: apiError } ))
}

const readOne = async (req,res) => {
  await User.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Post,
        as: 'posts',
        include: {
          model: User,
          as: 'author',
        },
        attributes: ['id', 'title', 'content', 'createdAt'],
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'content', 'createdAt'],
      }
    ]
  })
  .then( apiResponse => res.json( { data: {
    id: apiResponse.id,
    email: apiResponse.email,
    role: apiResponse.role,
    userProfile: {
      firstName: apiResponse.firstName,
      lastName: apiResponse.lastName,
      description: apiResponse.description,
      occupation : apiResponse.occupation,
      avatar: apiResponse.avatar,
    },
    posts: apiResponse.posts,
    comments: apiResponse.comments,
  }, err: null } ))
  .catch( apiError => res.json( { data: null, err: apiError } ))
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({
    where: { email: email }
  });
  if(foundUser && foundUser.validPassword(password)) {
    const { email, id } = foundUser;
    const token =  generateAccessToken(email,id);
    return res.json({
      data: {
        token,
        id,
        email,
        role: foundUser.role,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
      },
      err: null
    });
  }
  else{
    return res.json({
      errorCode: 'Server Error'
    });
  }
}

const uploadProfilePicture = async (req, res) => {
  console.log(req.body)
  try {
    if (req.file == undefined) {
      return res.json(`You must select a file.`);
    }
    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      imageId: req.params.id,
      imageType: 'profile',
      data: fs.readFileSync(
        __basedir + `/resources/static/assets/uploads/user/${req.file.filename}`
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + `/resources/static/assets/tmp/user/${image.name}`,
        image.data
      );
      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    return res.json(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
        createOne,
        updateOne,
        readAll,
        login,
        readOne,
        checkAccessToken,
        uploadProfilePicture,
        sendAdminInvitationEmail
    }
