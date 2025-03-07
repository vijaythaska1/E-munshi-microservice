import Joi from 'joi';
import { objectId } from './custom.validation';

const createStudent = {
  body: Joi.object().keys({
    role: Joi.number().required().valid(2).messages({
      'any.only': 'invalid role value provided',
      'any.required': 'Role is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required',
    }),
    phoneNumber: Joi.object().keys({
      number: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
          'string.empty': 'Phone number is required',
          'string.pattern.base': 'Phone number must be a valid 10-digit number',
        }),
      countryCode: Joi.string()
        .pattern(/^\+[1-9]\d{1,3}$/)
        .required()
        .messages({
          'string.pattern.base':
            'Invalid country code format. It should start with "+" followed by 1 to 3 digits.',
          'any.required': 'Country code is required',
        }),
    }),

    details: Joi.object()
      .keys({
        rollNo: Joi.string().required().messages({
          'any.required': 'Roll number is required',
        }),
        name: Joi.string().required().messages({
          'any.required': 'Name is required',
        }),
        fatherName: Joi.string().required().messages({
          'any.required': "Father's name is required",
        }),
        address: Joi.string().required().messages({
          'any.required': 'Address is required',
        }),
        class: Joi.string().optional().allow('').messages({
          'string.base': 'Class must be a string',
        }),
        hostelRoomNo: Joi.string().optional().allow('').messages({
          'string.base': 'Hostel room number must be a string',
        }),
        hostelName: Joi.string().required().messages({
          'any.required': 'Hostel name is required',
        }),
        startDate: Joi.date().optional().messages({
          'date.base': 'Start date must be a valid date',
        }),
        endDate: Joi.date().optional().messages({
          'date.base': 'End date must be a valid date',
        }),
        // subscribe: Joi.number()
        //   .valid(0, 1, 2, 3)
        //   .required()
        //   .messages({
        //     'any.only': 'Subscribe must be one of: monthly, quarterly, yearly',
        //     'any.required': 'Subscription type is required',
        //   }),
        aadharCardNumber: Joi.number().integer().required().messages({
          'number.base': 'Aadhar card number must be a number',
          'any.required': 'Aadhar card number is required',
        }),
      })
      .required()
      .messages({
        'object.base': 'Details must be an object',
        'any.required': 'Details are required',
      }),
  }),
};

const getStudent = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getIdByStudent = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateStudent = {
  params: Joi.object().keys({
    userId: Joi.custom(objectId),
  }),
  body: Joi.object().keys({
    email: Joi.string().email().messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required',
    }),
    phoneNumber: Joi.object().keys({
      number: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .messages({
          'string.empty': 'Phone number is required',
          'string.pattern.base': 'Phone number must be a valid 10-digit number',
        }),
      countryCode: Joi.string()
        .pattern(/^\+[1-9]\d{1,3}$/)

        .messages({
          'string.pattern.base':
            'Invalid country code format. It should start with "+" followed by 1 to 3 digits.',
          'any.required': 'Country code is required',
        }),
    }),

    details: Joi.object()
      .keys({
        rollNo: Joi.string().messages({
          'any.required': 'Roll number is required',
        }),
        name: Joi.string()

          .messages({
            'any.required': 'Name is required',
          }),
        fatherName: Joi.string().messages({
          'any.required': "Father's name is required",
        }),
        address: Joi.string().messages({
          'any.required': 'Address is required',
        }),
        class: Joi.string().optional().allow('').messages({
          'string.base': 'Class must be a string',
        }),
        hostelRoomNo: Joi.string().optional().allow('').messages({
          'string.base': 'Hostel room number must be a string',
        }),
        hostelName: Joi.string()

          .messages({
            'any.required': 'Hostel name is required',
          }),
        startDate: Joi.date().optional().messages({
          'date.base': 'Start date must be a valid date',
        }),
        endDate: Joi.date().optional().messages({
          'date.base': 'End date must be a valid date',
        }),
        aadharCardNumber: Joi.number()
          .integer()

          .messages({
            'number.base': 'Aadhar card number must be a number',
            'any.required': 'Aadhar card number is required',
          }),
      })
      .messages({
        'object.base': 'Details must be an object',
        'any.required': 'Details are required',
      }),
  }),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createStudent,
  getIdByStudent,
  getStudent,
  updateStudent,
  deleteUser,
};
