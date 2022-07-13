const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');

const userService = {
    validateBody: (data) => {
        const schema = Joi.object({
          displayName: Joi.string().required().min(8),
          email: Joi.string().email().required(),
          password: Joi.string().required().min(6),
          image: Joi.string().required(),
        });
    
        const { error, value } = schema.validate(data);
    
        if (error) throw error;
        
        return value;
    },

    list: async () => {
      const users = await db.User.findAll({
        attributes: { exclude: ['password'] },
      });
      return users;
    },

    create: async ({ displayName, email, password, image }) => {
      const users = await db.User.findAll();

      const repetido = users.some((el) => el.email === email);
      if (repetido) {
            const e = new Error('User already registered');
            e.name = 'ConflictError';
            throw e;
      }

      const user = await db.User.create({ displayName, email, password, image });

      // const { password, ...userWithoutPassword } = user.toJSON();
  
      const token = jwtService.createToken(user.toJSON());
  
      return token;
    },

    findById: async (id) => {
      const users = await db.User.findAll();
      const notId = users.some((el) => Number(el.id) === Number(id));
      console.log(notId);
      if (!notId) {
        const e = new Error('User does not exist');
        e.name = 'NotFoundError';
        throw e;
      }
      const user = await db.User.findByPk(id, {
        attributes: { exclude: ['password'] },
      });
      return user;
    },
};

module.exports = userService;