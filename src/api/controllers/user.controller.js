const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../models/user.model');
const uploadFile = require("../middlewares/upload");
const multer =  require("multer");

const readXlsxFile = require('read-excel-file/node');

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 	   cb(null, __basedir + '/uploads/')
// 	},
// 	filename: (req, file, cb) => {
//        console.log(req.file);
//        console.log(file);
//        console.log("====file=====");
// 	   cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
// 	}
// });

//const upload = multer({storage: storage});

exports.uploadFile = async (req, res, next) => {
    try {
        //await uploadFile(req,res);
        console.log('==============================123');
        console.log(req.files);
        if (req.file == undefined) {
            return res.status(httpStatus.BAD_REQUEST).send("Please upload an excel file!");
          }
      
          let path =
            __basedir + "/uploads/" + req.files.filename;

         console.log(path);
      
          readXlsxFile(path).then((rows) => {
            // skip header
            rows.shift();
      
            let tutorials = [];
      
            rows.forEach((row) => {
              let tutorial = {
                id: row[0],
                title: row[1],
                description: row[2],
                published: row[3],
              };
              console.log("==========tutorials==========");
              tutorials.push(tutorial);
            });

      
            console.log(tutorials);
            });
} catch(error) {
        next(error);
    }
}

/**
 * Create new employees
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const users = new User(req.body);
    const savedUsers = await users.save();
//    await insertEmployees(savedEmployees);
    res.status(httpStatus.CREATED);
    return res.json(savedUsers.transform());
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Update existing employees
 * @public
 */
exports.update = (req, res, next) => {
//   const ommitRole = req.locals.employees.role !== 'admin' ? 'role' : '';
//   const updatedUser = omit(req.body, ommitRole);
//   const employees = Object.assign(req.locals.employees, updatedUser);

//   employees.save()
//     .then(savedUser => res.json(savedUser.transform()))
//     .catch(e => next(Employees.checkDuplicateEmail(e)));
};

exports.list = async (req, res, next) => {
  try {
    // const { count, data } = await listEmployees(req.body);
    res.json({message:"success" });
  } catch (error) {
    next(error);
  }
};
