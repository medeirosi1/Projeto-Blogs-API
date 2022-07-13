const Joi = require('joi');
const db = require('../database/models');

const categorieService = {
    validationName: (name) => {
        const schema = Joi.object({
            name: Joi.string().required(),
          });
      
          const { error, value } = schema.validate(name);
      
          if (error) throw error;
          
          return value;
    },

    create: async ({ name }) => {
        const categorie = await db.Category.create({ name });
        return categorie;
    },

    list: async () => {
        const categories = await db.Category.findAll();
        return categories;
    },
};

module.exports = categorieService;