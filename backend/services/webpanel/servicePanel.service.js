const Service = require("../../models/Service");
const config = require("../../configs/app");
const fs = require("fs/promises");
const multer = require("multer");
const { ensureDirectoryExistence } = require("../../helpers/checkDirectory.helper");
const { ErrorBadRequest, ErrorNotFound } = require("../../configs/errorMethods");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./public/image/service";
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
}).fields([
  { name: "image", maxCount: 1 },
  { name: "gallery", maxCount: 12 },
]);

const methods = {
  scopeSearch(req) {
    $or = [];
    if (req.query.keyword)
      $or.push({ serviceNameTH: { $regex: req.query.keyword } });
    if (req.query.status && req.query.status !== "all")
      $or.push({ status: req.query.status });
    const query = $or.length > 0 ? { $or } : {};
    return { query: query };
  },

  async findAll(req) {
    const limit = +(req.query.size || config.pageLimit);
    const offset = +(limit * ((req.query.page || 1) - 1));
    const _q = methods.scopeSearch(req);

    try {
      const rows = await Service.find(_q.query)
        .sort({ sort: "asc" })
        .limit(limit)
        .skip(offset);
      const count = await Service.countDocuments();
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
      const obj = await Service.findById(id);
      if (!obj) return Promise.reject(ErrorNotFound("id: not found"));
      return obj;
    } catch (error) {
      return Promise.reject(ErrorBadRequest(error.message));
    }
  },

  async insert(req, res) {
    return new Promise(async (resolve, reject) => {
      upload(req, res, async (err) => {
        if (err) {
          return reject(ErrorBadRequest(err));
        } else {
          try {
            const data = req.body;
            if (req.files?.image) {
              req.files?.image.map((file) => {
                data.image = file.path;
              });
            }
            if (req.files?.gallery) {
              data.gallery = [];
              req.files?.gallery.map((file) => {
                data.gallery.push(file.path);
              });
            }
            const obj = new Service(data);
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
    return new Promise(async (resolve, reject) => {
      try {
        upload(req, res, async (err) => {
          if (err) {
            return reject(ErrorBadRequest(err));
          } else {
            try {
              const data = req.body;
              const obj = await Service.findById(req.params.id).exec();
              if (!obj) return reject(ErrorNotFound("id: not found"));
              if (req.files?.image) {
                if (obj?.image) {
                  try {
                    await fs.unlink(obj.image);
                  } catch (error) {
                    if (error.code !== "ENOENT") {
                      throw error;
                    }
                  }
                }
                req.files?.image.map((file) => {
                  data.image = file.path;
                });
              }
              if (req.files?.gallery) {
                if (obj.gallery?.length >= 12)
                  return reject(ErrorBadRequest("Gallery is full"));
                const galleryLeft = 12 - obj.gallery.length;
                if (galleryLeft < req.files.gallery.length)
                  return reject(
                    ErrorBadRequest(
                      `You can upload ${galleryLeft} picture to the gallery`
                    )
                  );
                if (obj.gallery.length > 0) {
                  data.gallery = obj.gallery;
                  req.files?.gallery.map((file) => {
                    data.gallery = [...data.gallery, file.path];
                  });
                } else {
                  data.gallery = [];
                  req.files?.gallery.map((file) => {
                    data.gallery = [...data.gallery, file.path];
                  });
                }
              }
              await Service.updateOne({ _id: req.params.id }, data, {
                runValidators: true,
                new: true,
              });
              resolve(Object.assign(obj, data));
            } catch (error) {
              return reject(ErrorBadRequest(error.message));
            }
          }
        });
      } catch (error) {
        return reject(ErrorBadRequest(error.message));
      }
    });
  },

  async delete(id) {
    try {
      const obj = await Service.findOneAndDelete({ _id: id }).exec();
      if (!obj) return Promise.reject(ErrorNotFound("id: not found"));
      if (obj?.image) {
        try {
          await fs.unlink(obj.image);
        } catch (error) {
          if (error.code !== "ENOENT") {
            throw error;
          }
        }
      }
      if (obj?.gallery) {
        obj.gallery.map(async (item) => {
          try {
            await fs.unlink(item);
          } catch (error) {
            if (error.code !== "ENOENT") {
              throw error;
            }
          }
        });
      }
      return { msg: "deleted success" };
    } catch (error) {
      return Promise.reject(ErrorBadRequest(error.message));
    }
  },

  async deleteGallery(id, position) {
    try {
      const obj = await Service.findById({ _id: id }).exec();
      if (!obj) return Promise.reject(ErrorNotFound("id: not found"));
      if (obj.gallery[position]) {
        try {
          await fs.unlink(obj.gallery[position]);
        } catch (err) {
          if (err.code !== "ENOENT") {
            throw err;
          }
        }
        obj.gallery.splice(position, 1);
      } else {
        return Promise.reject(ErrorNotFound("Image not found in gallery"));
      }
      await Service.updateOne({ _id: id }, { gallery: obj.gallery });
      return { msg: "deleted success" };
    } catch (error) {
      return Promise.reject(ErrorBadRequest(error.message));
    }
  },
};

module.exports = { ...methods };
