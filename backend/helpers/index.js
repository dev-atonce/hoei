const dateHelper = require('./date.helper')
const uploadHelper = require('./uploader.helper')
const checkDirectoryHelper = require('./checkDirectory.helper')
const fieldHelper = require('./field.helper')
const convertFileHelper = require('./convertFile.helper')

const Methods = {
    dateHelper,
    uploadHelper,
    checkDirectoryHelper,
    fieldHelper,
    convertFileHelper
}

module.exports = { ...Methods }
