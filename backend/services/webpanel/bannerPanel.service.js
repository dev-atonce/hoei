const Banner = require("../../models/Banner.js");
const config = require("../../configs/app");
const fs = require("fs/promises");
const multer = require("multer");
const {
  ensureDirectoryExistence,
} = require("../../helpers/checkDirectory.helper");
const {
  ErrorBadRequest,
  ErrorNotFound,
} = require("../../configs/errorMethods");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./public/image/banner";
    ensureDirectoryExistence(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: config.limitFileSize },
}).single("image");

const methods = {
  async findAll(req) {
    // try {
    //     const rows = await Banner.find().sort({ sort: "asc" });
    //     const count = await Banner.countDocuments();
    //     return {
    //         total: count,
    //         rows: rows,
    //     };
    // } catch (error) {
    //     return Promise.reject(ErrorNotFound(error.message));
    // }

    const limit = +(req.query.size || config.pageLimit);
    const offset = +(limit * ((req.query.page || 1) - 1));

    try {
      const rows = await Banner.find()
        .sort({ sort: "asc" })
        .limit(limit)
        .skip(offset);
      const count = await Banner.countDocuments();
      return {
        total: count,
        lastPage: Math.ceil(count / limit),
        currPage: +req.query.page || 1,
        rows: rows,
      };
    } catch (error) {
      return Promise.reject(ErrorNotFound(error.message));
    }
  },

  async findById(id) {
    try {
      const obj = await Banner.findById(id);
      if (!obj) return Promise.reject(ErrorNotFound("id: not found"));
      return obj;
    } catch (error) {
      return Promise.reject(ErrorNotFound("id: not found"));
    }
  },

  async insert(req, res) {
    return new Promise((resolve, reject) => {
      upload(req, res, async (err) => {
        if (err) {
          return reject(ErrorBadRequest(err));
        } else {
          try {
            const data = req.body;
            data.image = req.file?.path;
            const obj = new Banner(data);
            const inserted = await obj.save();
            resolve(inserted);
          } catch (error) {
            return reject(ErrorBadRequest(error.message));
          }
        }
      });
    });
  },

  async update(req, res) {
    return new Promise((resolve, reject) => {
      upload(req, res, async (err) => {
        if (err) {
          return reject(ErrorBadRequest(err));
        } else {
          try {
            const data = req.body;
            const obj = await Banner.findById(req.params.id);
            if (!obj) return Promise.reject(ErrorNotFound("id: not found"));
            if (req.file) {
              if (obj?.image) {
                try {
                  await fs.unlink(obj.image);
                } catch (error) {
                  if (error.code !== "ENOENT") {
                    throw error;
                  }
                }
              }
              data.image = req.file?.path;
            }
            await Banner.updateOne({ _id: req.params.id }, data, {
              runValidators: true,
              new: true,
            });
            resolve(Object.assign(obj, data));
          } catch (error) {
            reject(ErrorBadRequest(error.message));
          }
        }
      });
    });
  },

  async delete(id) {
    try {
      const obj = await Banner.findOneAndDelete({ _id: id }).exec();
      if (obj?.image) {
        try {
          await fs.unlink(obj.image);
        } catch (error) {
          if (error.code !== "ENOENT") {
            throw error;
          }
        }
      }
      return { msg: "deleted success" };
    } catch (error) {
      Promise.reject(ErrorBadRequest(error.message));
    }
  },
};

module.exports = { ...methods };
