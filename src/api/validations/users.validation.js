const Joi = require('joi');

module.exports = {

  // POST /v1/employees
  createUser: {
    body: {
      userName: Joi.string().required().label('User name'),
      email: Joi.string().required().label('Email'),
      phoneNumber: Joi.string().optional().allow('').label('Phone number'),
      fullName: Joi.string().required().label('Full name'),
      password: Joi.string().required().min(8).max(20).label('Password'),
      address: Joi.string().optional().allow('').label('Address'),
      role: Joi.string().optional().label('Role').valid('admin', 'manager', 'user')
        .default('user'),
    },
  },

  // PATCH /v1/employees/:userId
  updateUser: {
    body: {
    //   firstName: Joi.string().required().label('First Name'),
    //   lastName: Joi.string().required().label('Last Name'),
    //   designation: Joi.string().optional().allow('').label('Designation'),
    //   salary: Joi.string().optional().allow('').label('Salary'),
    //   dateOfJoining: Joi.string().optional().allow('').label('Date Of Joining'),
    //   address: Joi.string().optional().allow('').label('Address'),
    //   gender: Joi.string().optional().allow('').label('Gender')
    //     .valid('Female', 'Male')
    //     .default('Male'),
    //   age: Joi.string().optional().allow('').label('Age'),
    //   maritalStatus: Joi.string().optional().label('Marital Status').valid('Unmarried', 'Married')
    //     .default('Unmarried'),
    },
  },

  // POST /v1/employees/list
  listUser: {
    body: {
    //   term: Joi.string().optional().allow('').empty()
    //     .trim()
    //     .label('Searching term'),
    //   fieldToSort: Joi.string().trim().label('Filed to sort'),
    //   order: Joi.string().trim().label('Order'),
    //   page: Joi.number().min(1).label('Page'),
    //   perPage: Joi.number().min(1).max(100).label('Per page'),
    },
  },
};
