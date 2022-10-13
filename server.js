const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
require('dotenv').config();
global.__basedir = __dirname;

class ServerClass{
  constructor(){
    this.server = express();
    this.port = process.env.PORT;
    }
    init(){
      const AuthRouterClass = require('./routes/auth.router');
      const authRouter = new AuthRouterClass();

      const PostRouterClass = require('./routes/post.router');
      const postRouter = new PostRouterClass();

      const TeamRouterClass = require('./routes/team.router');
      const teamRouter = new TeamRouterClass();


      this.server.use( (req, res, next) => {
          const allowedOrigins = process.env.ALLOWED_ORIGINS.split(', ');
          const origin = req.headers.origin;
          if(allowedOrigins.indexOf(origin) > -1){ res.setHeader('Access-Control-Allow-Origin', origin)}
          res.header('Access-Control-Allow-Credentials', true);
          res.header('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'DELETE']);
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
          next();
      });

      this.server.use(bodyParser.json({limit: '20mb'}));

      this.server.use(cors(corsOptions));
      this.server.use(bodyParser.urlencoded({ extended: true }));
      this.server.use(cookieParser(process.env.COOKIE_SECRET));
      this.server.use('/auth', authRouter.init());
      this.server.use('/posts', postRouter.init());
      this.server.use('/team', teamRouter.init());

      this.config();
    }
    config(){
      this.launch();
    }
    launch(){
          this.server.listen( this.port, () => {
              console.log({
                  node: `http://localhost:${this.port}`,
              })
          })
  }

}
const MyServer = new ServerClass();
MyServer.init();
