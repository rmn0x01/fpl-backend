const express = require('express')
const multer  = require('multer')
const path = require('path')
const helpers = require('../helpers/helpers')
const router = express.Router()
const playerController = require('../controllers/player')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/role')
const playerPhotosDirectory = process.env.PLAYER_PHOTOS_DIRECTORY || 'public/data/players'

//These 2 definitely can be refactored, TODO
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../' + playerPhotosDirectory));
    },
    filename: function (req, file, cb) {
      cb(
        null,
        req.body.player_id + path.extname(file.originalname)
      );
    },
  });
const upload = multer({ storage: diskStorage, fileFilter: helpers.imageFilter,limits: { fileSize: 5*1024*1024 } }).single("player_img")

const updateDiskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../' + playerPhotosDirectory));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.params.id + path.extname(file.originalname)
    );
  },
});
const updateUpload = multer({ storage: updateDiskStorage, fileFilter: helpers.imageFilter,limits: { fileSize: 5*1024*1024 } }).single("player_img")

router.get('/', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, playerController.getAll)
router.get('/:id', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, playerController.getById)
router.post('/', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, (req, res, next) => {
    upload(req, res, function(err){
        if(req.fileValidationError){
            return res.status(400).json({
                message: req.fileValidationError
            })
        }
        if(err){
            return res.status(400).json({
                message: err.message || err
            })
        }
        return next()
    }
    )},playerController.insert)
router.put('/photo/:id', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, (req, res, next) => {
  updateUpload(req, res, function(err){
        if(req.fileValidationError){
            return res.status(400).json({
                message: req.fileValidationError
            })
        }
        if(err){
          return res.status(400).json({
              message: err.message || err
          })
      }
        return next()
    }
    )},playerController.updatePhoto)
router.put('/:id', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, playerController.update)
router.delete('/:id', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, playerController.remove)

module.exports = router