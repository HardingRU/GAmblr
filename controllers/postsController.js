const Posts = require('../models/postsDB');

const postsController = {};

postsController.feed = (req, res) => {
  Posts.populateFeed()
    .then(posts => {
      res.json({
        message: 'ok',
        data: { posts },
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({message: '400', err});
    });
},

postsController.likes = (req, res) => {
  Posts.populateLikes()
    .then(posts => {
      res.json({
        message: 'ok',
        data: {posts},
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err})
    });
},

postsController.create = (req, res) => {
  Posts.createPost(req.body)
    .then(post => {
      res.json({
        message: 'ok',
        data: {post}
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err})
    })
},

postsController.userPage = (req, res) => {
  Posts.userPage(req.body)
    .then(info => {
      res.json({
        message: 'ok',
        data: { info },
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({message: '400', err});
    });
},

postsController.addLike = (req, res) => {
  Posts.addLike(req.body)
    .then(post => {
      res.json({
        message: 'ok',
        data: { post }
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err})
    });
},

postsController.removeLike = (req, res) => {
  Posts.removeLike(req.body)
    .then(post => {
      res.json({
        message: 'ok',
        data: { post },
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err})
    });
},

postsController.myPosts = (req, res) => {
  Posts.myPosts(req.body)
    .then(posts => {
      res.json({
        message: 'ok',
        data: { posts }
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err})
    });

},

postsController.singlePost = (req, res) => {
  let sendObj = {}
  sendObj.id = req.params.id
  Posts.singlePost(sendObj)
    .then(post => {
      res.json({
        message: 'ok',
        data: { post }
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err})
    });
}

postsController.getComments = (req, res) => {
  let sendObj = {}
  sendObj.id = req.params.id
  Posts.getComments(sendObj)
    .then(comments => {
      res.json({
        message: 'ok',
        data: { comments }
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err})
    });
}

postsController.addComment = (req, res) => {
  let sendObj = {}
  console.log("REQ BODY", req.body)
  sendObj.id = req.params.id
  sendObj.comment = req.body.content
  Posts.addComment(sendObj)
    .then(comment => {
      res.json({
        message: 'ok',
        data: { comment }
      })
    })
    .catch(err => {
      res.status(400).json({message: '400', err})
    })

}


module.exports = postsController;
