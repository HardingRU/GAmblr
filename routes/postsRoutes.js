const express = require('express');
const postsController = require('../controllers/postsController');

const postRoutes = express.Router();

postRoutes.get('/feed', postsController.feed);
postRoutes.get('/like', postsController.likes);
postRoutes.get('/user', postsController.userPage)
postRoutes.post('/', postsController.create);
postRoutes.post('/like', postsController.addLike)
postRoutes.delete('/like', postsController.removeLike)
//postRoutes.put('/:id', postsController.editUser);
//postRoutes.delete('/:id', postController.deleteUser);

module.exports = postRoutes;