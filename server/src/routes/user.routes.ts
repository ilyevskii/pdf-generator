import {Router} from "express";
import {User} from "../entity/user.entity";
import {UserController} from "../controller/user.controller";

const router: Router = require("express").Router();
const bcrypt = require("bcrypt");

const controller: UserController = new UserController();

//GET USER INFO
router.get("/:userId", async (req, res) => {

    try {
        const user: User | null = await controller.findUser({id: req.params.userId});

        if (!user) {
            res.status(404).json("User doesn`t exists");
            return;
        }

        res.status(200).json(user);

    } catch (err: any) {
        res.status(500).json({error: err.toString()});
    }
});

//CHANGE USER INFO
router.put("/:userId", async (req, res) => {

    try {
        if (req.body.id.toString() === req.params.userId) {

            const user: User | null = await controller.findUser({id: req.body.id})
            if (!user) {
                res.status(404).json("User doesn`t exists");
                return;
            }

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }

            await controller.updateUser(req.body);
            res.status(200).json("Account has been updated");

        } else {
            return res.status(403).json("You can update only your account!");
        }

    } catch (err: any) {
        res.status(500).json({error: err.toString()});
    }
});

module.exports = router;

