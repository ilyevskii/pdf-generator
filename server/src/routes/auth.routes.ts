import {Router} from "express";
import {User} from "../entity/user.entity";
import AppDataSource from "../typeorm.config";
import {Repository} from "typeorm";

const router: Router = require("express").Router();
const bcrypt = require("bcrypt");

export const UserRepository: Repository<User> = AppDataSource.getRepository(User);


//REGISTER
router.post("/register", async (req, res) => {
    try {

        if (await UserRepository.findOneBy({email: req.body.email}))
        {
            res.status(404).json("User with such email exists");
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user: User = await UserRepository.create({email: req.body.email, password: hashedPassword});
        await UserRepository.save(user);

        res.status(200).json(user);

    } catch (err: any) {
        res.status(500).json({error: err.toString()});
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {

        const user = await UserRepository.findOneBy({email: req.body.email})
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