const cloudinary = require("cloudinary");
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.uploadImages = async (req, res) => {
  try {
    const { path } = req.body;
    //make the file that sent from user to become an array
    let files = Object.values(req.files).flat();
    //images is for sending back to the front end
    let images = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file, path);
      images.push(url);
      removeTmp(file.tempFilePath);
    }
    res.json(images);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.listImages = async (req, res) => {
  //receive the path, sort, max from req.body
  const { path, sort, max } = req.body;
  //cloudinary.vs.search allows you fine control on filtering and retrieving information on all the assets
  cloudinary.v2.search
    //expression is a details about the asset, in this case, it will be the url of the image
    .expression(`${path}`)
    //sort_by is a way to order the assest that returning back, in this case sort will be asc or desc based on the created_at key (see this in the cloudinary details)
    .sort_by("created_at", `${sort}`)
    //max_results tell how much asset you want to return
    .max_results(max)
    .execute()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.error.message);
    });
};

const uploadToCloudinary = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (err, res) => {
        if (err) {
          removeTmp(file.tempFilePath);
          return res.status(400).json({ message: "Upload image failed." });
        }
        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
