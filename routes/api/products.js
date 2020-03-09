const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const router = new express.Router();
const User = require("../../models/User");
const Product = require("../../models/Product");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

// // Set storage engines
// const storage = multer.diskStorage({
//   destination: "./public/uploads/",
//   filename: function(req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1000000
//   },
//   fileFilter(req, file, cb) {
//     checkFileType(file, cb);
//   }
// }).single("productImg");
// // Check file type
// function checkFileType(file, cb) {
//   // allowed extensions
//   const fileTypes = /jpeg|jpg|png/;
//   // Check extension
//   const extname = fileTypes.test(
//     path.extname(file.originalname).toLocaleLowerCase()
//   );
//   // check mime type
//   const mimetype = fileTypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, cb);
//   } else {
//     cd({ msg: "Images only" });
//   }
// }
// const upload = multer({
//   // the below line saves the file in the destination folder but if the line is removed the data is passed to our function.
//   dest: "images",
//   limits: {
//     fileSize: 1000000
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
//       return cb(new Error("Please upload a valid image"));
//     }
//     cb(undefined, true);
//   }
// });
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});
// Upload Endpoint
router.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

// @route    POST api/products
// @desc     Create A product
// @access   Private
router.post("/", [auth], upload.single("productImg"), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      prouductPrice: req.body.prouductPrice,
      quantity: req.body.quantity,
      productImg: req.file.path,
      name: user.name,
      user: req.user.id
    });
    const product = await newProduct.save();

    res.json(product);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});
// @route    Get api/products
// @desc     Get All products
// @access   Private
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ date: -1 });
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
// @route    Get api/products/:id
// @desc     Get A product by id
// @access   Private
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not Found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not Found" });
    }
    res.status(500).send("Server Error");
  }
});
// @route    Delete api/posts/:id
// @desc     Delete A post by id
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    //   Check the user
    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    if (!product) {
      return res.status(404).json({ msg: "Product not Found" });
    }
    await product.remove();
    res.json({ msg: "Product Removed" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not Found" });
    }
    res.status(500).send("Server Error");
  }
});
// @route    PUT api/posts/like/:id
// @desc     LIke a post
// @access   Private
// router.put("/like/:id", auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     // Check if the post is already liked by the user
//     if (
//       post.likes.filter(like => like.user.toString() === req.user.id).length > 0
//     ) {
//       return res.status(400).json({ msg: "Post Already Liked" });
//     }
//     post.likes.unshift({ user: req.user.id });
//     await post.save();
//     res.json(post.likes);
//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).send("Server Error");
//   }
// });

// @route    GET api/products/:id/image
// @desc     Get Product image
// @access   Private

router.get("/:id/image", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !productImg) {
      return res.status(404).json({ msg: "Product not Found" });
    }
    res.set("Content-Type", "image/png");
    res.send(product.productImg);
  } catch (error) {
    res.status(500).json("Server Error");
  }
});

module.exports = router;
