const User = require("../../models/User");
const config = require("../../configs/app");
const jwt = require("jsonwebtoken");
const {
  ErrorBadRequest,
  ErrorNotFound,
  ErrorUnauthorized,
} = require("../../configs/errorMethods");

const methods = {
  async find(req) {
    const limit = +(req.query.size || config.pageLimit);
    const offset = +(limit * ((req.query.page || 1) - 1));

    try {
      const rows = await User.find().limit(limit).skip(offset);
      const count = await User.countDocuments();
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
      const obj = await User.findById(id);
      if (!obj) return Promise.reject(ErrorNotFound("id: not found"));
      return obj;
    } catch (error) {
      return Promise.reject(ErrorNotFound("id: not found"));
    }
  },

  async insert(data) {
    try {
      const obj = new User(data);
      const inserted = await obj.save();
      return inserted;
    } catch (error) {
      return Promise.reject(ErrorBadRequest(error.message));
    }
  },

  async update(id, data) {
    try {
      if (!data.password) {
        delete data.password;
      }
      const obj = await User.findById(id);
      if (!obj) return Promise.reject(ErrorNotFound("id: not found"));
      await User.updateOne({ _id: id }, data, {
        runValidators: true,
        new: true,
      });
      return Object.assign(obj, data);
    } catch (error) {
      return Promise.reject(ErrorBadRequest(error.message));
    }
  },

  async delete(id) {
    try {
      const obj = await User.findById(id);
      if (!obj) return Promise.reject(ErrorNotFound("id: not found"));
      await User.deleteOne({ _id: id });
      return { msg: "deleted success" };
    } catch (error) {
      return Promise.reject(ErrorBadRequest(error.message));
    }
  },

  login(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = await User.findOne({ email: data.email });
        if (!obj) {
          return reject(ErrorUnauthorized("email not found"));
        }
        if (!obj.validPassword(data.password)) {
          return reject(ErrorUnauthorized("password is invalid."));
        }
        const accessToken = obj.generateJWT();
        resolve({ accessToken: accessToken, userData: obj });
      } catch (error) {
        return reject(error);
      }
    });
  },

  refreshToken(accessToken) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(accessToken);
        const obj = await User.findOne({ username: decoded.username });
        if (!obj) {
          reject(ErrorUnauthorized("username not found"));
        }
        resolve({ accessToken: obj.generateJWT(obj), userData: obj });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = { ...methods };
