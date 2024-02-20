import multer from 'multer'

const storage = multer.diskStorage({
  filename:function (req, file, cb) {
    cb(null,file.originalname)
  }
})

const upload = multer({storage:storage})

export default upload







// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "Projectonia",
//     allowedFormats: ["jpeg", "png", "jpg"],
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (!["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
//     return cb(new Error("File is not an image"));
//   }
//   return cb(null, true);
// };

// const upload = multer({ storage, fileFilter });

// const uploadImage = (req, res, next) => {
//   debugger
//   upload.array('images')(req, res, (err,files) => {
//     console.log("req",res,req)
//     if (err) {
//       console.error(err);
//       if (err.message === "File is not an image") {
//         console.log('Selected file is not an image')
//         return res.status(400).json({ error: 'Selected file is not an image' });
//       }
//       console.log('An error occurred during file upload');
//       return res.status(500).json({ error: 'An error occurred during file upload' });
//     }
//     console.log("reached to cloudinary")
//     const uploadedFileUrls = files.map((file) => file.secure_url);

//     return next();
//   });
// };

// export default uploadImage;


