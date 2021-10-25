const express = require('express')
const multer  = require('multer')
const path = require('path')
const helpers = require('../helpers/helpers')
const router = express.Router()
const teamController = require('../controllers/team')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/role')

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/data/teams"));
    },
    filename: function (req, file, cb) {
      cb(
        null,
        req.body.team_id + path.extname(file.originalname)
      );
    },
  });
const upload = multer({ storage: diskStorage, fileFilter: helpers.imageFilter }).single("team_img")

router.get('/all', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, teamController.getAll)
router.get('/:id', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, teamController.getById)
router.post('/', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, (req, res, next) => {
    upload(req, res, function(err){
        if(req.fileValidationError){
            return res.status(400).json({
                message: req.fileValidationError
            })
        }
        return next()
    }
    )},teamController.insert)
// router.put('/:id', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, teamController.update) //TODO
// router.delete('/:id', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, teamController.remove) //TODO

module.exports = router