export function onlyLogged(req, res, next){
	if(!req.user) res.redirect("/");
	else next();
}

export function onlyNotLogged(req, res, next){
	if(req.user) res.redirect("/feed");
	else next();
}