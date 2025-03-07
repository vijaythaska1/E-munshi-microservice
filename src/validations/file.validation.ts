import Joi from 'joi';

const fileUpload = {
  body: Joi.object().keys({
    file: Joi.string().required(),
  }),
};
module.exports = {
  fileUpload,
};
