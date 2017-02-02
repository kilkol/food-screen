import FacebookStrategy from "passport-facebook";
import config from "../config.json";
import users from "../models/users";

export default new FacebookStrategy({
	clientID: "1288656617840512",
	clientSecret: config.facebookSecret,
	callbackURL:"http://localhost:3000/auth/facebook/callback",
	profileFields: ['id','emails', 'name'] //Frayr
},function(accessToken, refreshToken, profile, cb) {
	let userFromServer = profile._json;

	users.findOneAndUpdate({id: userFromServer.id}, userFromServer).then(function(user) {
		if(user.value === null) {
			users.insert(userFromServer).then(function(user) {
				cb(false, user);
			});
			return;
		}

		cb(false, user);
	}, function(err) {
		cb(err);
	});

});



