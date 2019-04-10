const express = require("express");
const router = express.Router();

const User = require("./userSchema");

router.get("/", function(req, res) {
  console.log(req.url);
  res.json({ message: "Welcome to our api!" });
});

router
  .route("/users")

  // add a user (accessed at POST http://localhost:8080/api/users)
  .post(function(req, res) {
    var user = new User();
    user.firstname = req.body.firstname; // set the users info (comes from the request)
    user.lastname = req.body.lastname;
    user.sex = req.body.sex;
    user.age = req.body.age;
    user.password = req.body.password;

    // save the user and check for errors
    user.save(function(err) {
      if (err) res.status(500).send(err);
      console.log("User added!");
      res.status(200).json({ message: "User added!" });
    });
  });

router
  .route("/users/:user_id")
  .put(function(req, res) {
    // use our user model to find the user we want
    User.findById(req.params.user_id, function(err, user) {
      if (err) res.send(err);

      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.sex = req.body.sex;
      user.age = req.body.age;
      user.password = user.password;

      user.save(function(err) {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json({ message: "user updated!" });
      });
      // }
    });
  })

  // 7th part - delete
  // delete the user with this id (accessed at DELETE http://localhost:8080/api/users/:user_id)
  .delete(function(req, res) {
    User.deleteOne(
      {
        _id: req.params.user_id
      },
      function(err, user) {
        if (err) res.status(500).send(err);

        res.status(200).json({ message: "Successfully deleted" });
      }
    );
  });

//get users with paginate
router.route("/users").get(function(req, res) {
  //console.log(req);

  console.log(req.query.sort);
  console.log(typeof req.query.sort);
  console.log(JSON.stringify(req.query.sort));
  //var test = JSON.stringify(req.params.sort);
  let sortBy = req.query.sort;
  //console.log(typeof test);
  console.log(req.query.asc);
  console.log(req.query.asc);
  let options = {
    page: parseInt(req.query.page),
    limit: 5,
    sort: { [sortBy]: req.query.asc }
    //sort: asc? {req.params.sort}
    //sort: { lastname: req.params.seq }
  };

  User.paginate({}, options, function(err, users) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    // users.sort( (user1, user2) => {
    //   user1.docs.get.params.[test]
    // });
    //console.log(users);
    //console.log(users.docs.params);
    console.log(JSON.stringify(users));
    res.status(200).json(users);
  });
});

// ""
// '/users/sort/:attr/:increase/:size/:page'
// router.route("/users/:page/:limit/:sort/:asc").get(function(req, res) {
//   console.log("attr from sort" + req.params.sort);
//   let options = {
//     page: parseInt(req.params.page),
//     limit: 5
//     //sort: { sortBy: req.params.asc === true ? 1 : -1 }
//     //sort: asc? {req.params.sort}
//     //sort: { lastname: req.params.seq }
//   };

//   User.paginate({}, options, function(err, users) {
//     if (err) {
//       res.status(500).json(err);
//       return;
//     }
//     // users.sort( (user1, user2) => {
//     //   user1.docs.get.params.[test]
//     // });
//     //console.log(users);
//     console.log(users.docs.params);
//     console.log(JSON.stringify(users));
//     res.status(200).json(users);
//   });
//   User.find()
//     .sort([[req.params.sort, req.params.asc]])
//     .skip(5 * parseInt(req.params.page))
//     .limit(5)
//     .exec(function(err, users) {
//       if (err) {
//         res.send(err);
//       }

//       res.json(users);
//       // console.log(user.params);
//     });
// });

router
  .route("/search")
  // get the results match the key(accessed at GET http://localhost:8080/api/search/:key)
  .get(function(req, res) {
    // get result for wang but not wang li with either wang or li
    User.paginate({}, { page: 1, limit: 5 }, function(err, results) {
      if (err) res.status(500).send(err);
      res.status(200).json(results);
    });
  });

router
  .route("/search/:key")
  // get the results match the key(accessed at GET http://localhost:8080/api/search/:key)
  .get(function(req, res) {
    //console.log(req.params.key);

    //OR
    var query = req.params.key.replace(" ", "|");

    var regex = new RegExp(query, "i"); // 'i' makes it case insensitive
    User.paginate(
      {
        $or: [{ firstname: regex }, { lastname: regex }]
      },
      { page: 1, limit: 5 },
      function(err, results) {
        if (err) res.status(500).send(err);
        res.status(200).json(results);
      }
    );
  });

module.exports = router;
