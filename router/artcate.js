const express = require('express')

const router = express.Router()

const artcate_handler = require('../router_handler/artcate')

router.get('/cates', artcate_handler.getArticleCates)

module.exports = router