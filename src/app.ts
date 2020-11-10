import * as express from "express";
import * as passport from "passport";
import * as cors from "cors";
import * as flash from "connect-flash";
import * as rateLimit from "express-rate-limit";
import * as mongoSanitize from "express-mongo-sanitize";
import * as xss from "xss-clean";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as bodyParser from "body-parser";

import { appRouter } from './router/appRouter';
import { authRouter } from './router/authRouter';

class App {
  public app: express.Application;
  public appRouter: appRouter = new appRouter();
  public authRouter: authRouter = new authRouter();

  constructor() {
    // create express application
    this.app = express();

    /**  List of Middlewares **/
    // Limit requests from same API
    let limiter = rateLimit({
      max: 100,
      windowMs: 60 * 60 * 1000,
      message: 'Too many requests from this IP, Please try again in an hour !!!'
    });
    this.app.use('/api', limiter);

    // Data sanitization against NoSQL query injections
    this.app.use(mongoSanitize());
    
    // Data sanitization against XSS
    this.app.use(xss());

    // handle headers
    this.app.use(cors());

    // handle custom header
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      next();
    });
  
    // use cookie
    this.app.use(cookieParser()); 

    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    this.app.use(bodyParser.json());

    // access static files
    this.app.use(express.static('public'));

    // allow views
    this.app.set('view engine', 'ejs');

    // allow session
    this.app.use(session({ secret: process.env.SESSION_SECRET }));

    // configure passport auth
    this.app.use(passport.initialize());
    this.app.use(passport.session()); 

    // session & cookie save through flash
    this.app.use(flash());

    // allow https
    this.app.enable('trust proxy'); 

    /** Routers **/
    this.appRouter.routes(this.app);
    this.authRouter.routes(this.app);

    // error session
    this.app.get('*', function(req, res){
      res.status(404).render('error');
    });
  }
}
/*
// auth via google, github, linkedin 
require('../controllers/authController')(passport);

// Router session
require('../router/basicRouter')(app);
app.use('/api', appRouter);
app.use('/auth', authRouter);
*/

export default new App().app;
