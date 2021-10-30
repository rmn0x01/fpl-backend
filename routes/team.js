const express = require('express')
const multer  = require('multer')
const path = require('path')
const helpers = require('../helpers/helpers')
const router = express.Router()
const teamController = require('../controllers/team')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/role')
const teamPhotosDirectory = process.env.TEAM_PHOTOS_DIRECTORY || 'public/data/teams'

//These 2 definitely can be refactored, TODO
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../' + teamPhotosDirectory));
    },
    filename: function (req, file, cb) {
      cb(
        null,
        req.body.team_id + path.extname(file.originalname)
      );
    },
  });
const upload = multer({ storage: diskStorage, fileFilter: helpers.imageFilter }).single("team_img")

const updateDiskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../' + teamPhotosDirectory));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.params.id + path.extname(file.originalname)
    );
  },
});
const updateUpload = multer({ storage: updateDiskStorage, fileFilter: helpers.imageFilter }).single("team_img")

router.get('/', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, teamController.getAll)
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
router.put('/photo/:id', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, (req, res, next) => {
  updateUpload(req, res, function(err){
        if(req.fileValidationError){
            return res.status(400).json({
                message: req.fileValidationError
            })
        }
        return next()
    }
    )},teamController.updatePhoto)
router.put('/:id', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, teamController.update)
router.delete('/:id', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, teamController.remove)

module.exports = router