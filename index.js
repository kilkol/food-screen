import express from "express";
import passport from "passport";
import facebookStrategy from "./passportStrategies/facebookStrategy";
import welcomeRouter from "./routes/welcomeRouter";
import authRouter from "./routes/authRouter";
import users from "./models/users";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";


let app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ secret: 'Schovanej pták',resave: false, saveUninitialized: true, }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(facebookStrategy)

passport.serializeUser(function(user, done) {
	done(false, user.id);
})

passport.deserializeUser(function(id, done) {
	users.findOne({
		id:id
	}).then(function(user){
		done(false, user);
	}, function(err) {
		done(err);
	})
})

app.use("/",welcomeRouter);
app.use("/auth",authRouter);


app.listen(3000)
console.log("Serverruning3000")