const { User,Post } = require('../../models');
const jwt = require('jsonwebtoken');
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
    return res.status(400)
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
    posts: apiResponse.posts
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

module.exports = {
        createOne,
        updateOne,
        readAll,
        login,
        readOne,
        checkAccessToken
    }
