import express, {Router} from 'express';
import multer from 'multer';
import * as fs from 'fs';
import {UserController} from "../controllers/user.controller";

const router: Router = express.Router();
const controller: UserController = new UserController();
const upload: multer.Multer = multer({ dest: '../public/images' });

router.post('/upload', upload.single('image'), async (req, res) => {

    try {
        const {path, mimetype} = req.file!;
        const extension: string = mimetype.split("/")[1];
        const newFileName: string = `${path}.${extension}`;
        fs.renameSync(path, newFileName);

        const previousImage: string | undefined = (await controller.findUserById(req.body.id))!.image

        if (previousImage) {
            fs.unlink(`../../public/images/${previousImage}`, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('File deleted successfully');
            });
        }

        await controller.updateUser({id: req.body.id, image: newFileName.split("/").slice(-1)[0]})

        const imageUrl: string = `http://localhost:3001/${newFileName}`;
        res.status(200).json({url: imageUrl});

    }
    catch (err: any) {
        res.status(500).json({error: err.toString()});
    }
});

module.exports = router;
