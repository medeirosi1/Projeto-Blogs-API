const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');

const authService = {
    validateBody: (data) => {
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6),
      });
  
      const { error, value } = schema.validate(data);
  
      if (error) {
          const e = new Error('Some required fields are missing');
          e.name = 'ValidationError';
          throw e;
      }
      
      return value;
    },
  
    login: async (email, senha) => {
      const user = await db.User.findOne({ 
        attributes: { exclude: ['displayName', 'image'] },
        where: { email }, 
      });
  
      if (!user || user.password !== senha) {
        const e = new Error('Invalid fields');
        e.name = 'ValidationError';
        throw e;
      }
  
      const { password, ...userWithoutPassword } = user.toJSON();
  
      const token = jwtService.createToken(userWithoutPassword);
  
      return token;
    },
  
    validateToken: (token) => {
      const data = jwtService.validateToken(token);
  
      return data;
    },
  };
  
module.exports = authService;