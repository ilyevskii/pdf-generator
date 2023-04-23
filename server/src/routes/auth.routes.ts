import {Router} from "express";
import {User} from "../entity/user.entity";
import {UserController} from "../controller/user.controller";

const router: Router = require("express").Router();
const bcrypt = require("bcrypt");

const controller: UserController = new UserController();


//REGISTER
router.post("/register", async (req, res) => {
    try {

        if (await controller.findUser({email: req.body.email}))
        {
            res.status(404).json("User with such email exists");
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user: User = (await controller.createNewUser({email: req.body.email, password: hashedPassword})) as User;

        res.status(200).json(user);

    } catch (err: any) {
        res.status(500).json({error: err.toString()});
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {

        const user: User | null = await controller.findUser({email: req.body.email})
        if (!user) {
            res.status(404).json("User with such email not found");
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            res.status(400).json("Wrong password");
            return
        }

        res.status(200).json(user)

    } catch (err: any) {
        res.status(500).json({error: err.toString()});
    }
});

module.exports = router;