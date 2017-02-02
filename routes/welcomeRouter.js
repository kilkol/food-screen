import express from "express";
import pug from "pug";
import {onlyNotLogged} from "../middlewares/auth";

let router = express.Router();

const compileWelcomePage = pug.compileFile("views/welcomePage.pug")

router.get("/", onlyNotLogged, function(req,res){
	res.send(compileWelcomePage());
})

export default router;
