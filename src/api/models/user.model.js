const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../utils/APIError');
const bcrypt = require('bcryptjs');

mongoose.set('useCreateIndex', true);

/**
* User Roles
*/
const roles = ['admin', 'manager', 'user'];

const UserSchema = new mongoose.Schema({
    
    userName: {
        type: String,
        trim:true
    },
    email: {
        type: String,   
        required: true,
        lowercase: true,
        trim:true,
        unique: false
    },
    phoneNumber: {
        type: String,
        trim:true
    },
    fullName: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'user'],
        default: 'user'
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    activationToken: {
        token: String,
        expires: Date
    },
    changePasswordToken: {
        token: {
            type: String,
            index: true,
        },
        expires: Date,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: Date,
    updatedAt: Date,
}, {
    timestamps: true,
})



/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
 UserSchema.pre('save', async (obj) => {
  try {
      const user = obj;
        if (user.password) {
          const rounds = 10;
          const hash = await bcrypt.hash(user.password, rounds);
          user.password = hash;
        }
        user.isActive = true;
        return user;
  } catch (error) {
    return error;
  }
});

/**
 * Methods
 */
 UserSchema.method({
  transform() {
    const transformed = {};
    const fields = ['_id', 'userName', 'email', 'phoneNumber', 'fullName', 'role', 'activationToken', 'isActive'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

/**
 * Statics
 */
// employeesSchema.statics = {

//   roles,

//   /**
//    * Get employees
//    *
//    * @param {ObjectId} id - The objectId of employees.
//    * @returns {Promise<employees, APIError>}
//    */
//   async get(id) {
//     try {
//       let employees;

//       if (mongoose.Types.ObjectId.isValid(id)) {
//         employees = await this.findById(id).exec();
//       }
//       if (employees) {
//         return employees;
//       }

//       throw new APIError({
//         message: 'employees does not exist',
//         status: httpStatus.NOT_FOUND,
//       });
//     } catch (error) {
//       throw error;
//     }
//   },

//   /**
//    * List employees in descending order of 'createdAt' timestamp.
//    *
//    * @param {number} skip - Number of employees to be skipped.
//    * @param {number} limit - Limit number of employees to be returned.
//    * @returns {Promise<User[]>}
//    */
//   list({
//     page = 1, perPage = 30, name, email, role,
//   }) {
//     const options = omitBy({ name, email, role }, isNil);

//     return this.find(options)
//       .sort({ createdAt: -1 })
//       .skip(perPage * (page - 1))
//       .limit(perPage)
//       .exec();
//   },

//   /**
//    * Return new validation error
//    * if error is a mongoose duplicate key error
//    *
//    * @param {Error} error
//    * @returns {Error|APIError}
//    */
//   checkDuplicate(error) {
//     if (error.name === 'MongoError' && error.code === 11000) {
//       return new APIError({
//         message: 'Validation Error',
//         errors: [{
//           field: 'firstName',
//           location: 'body',
//           messages: ['"FirstName" already exists'],
//         }],
//         status: httpStatus.CONFLICT,
//         isPublic: true,
//         stack: error.stack,
//       });
//     }
//     return error;
//   },
// };
// /**
//  * @typedef Employees
//  */
module.exports = mongoose.model('User', UserSchema);

