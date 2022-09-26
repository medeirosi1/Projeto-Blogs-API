const Joi = require('joi');
const db = require('../database/models');
const { validateToken } = require('./jwtService');

const postService = {
    validateBody: (data) => {
        const schema = Joi.object({
          title: Joi.string().required(),
          content: Joi.string().required(),
          categoryIds: Joi.array().not().empty(),
        });
    
        const { error, value } = schema.validate(data);
    
        if (error) {
            const e = new Error('Some required fields are missing');
            e.name = 'ValidationError';
            return e;
        }
        
        return value;
    },

    create: async (title, content, categoryId, authorization) => {
        const { data: { id } } = validateToken(authorization);
        const userId = id;
        const allId = await db.BlogPost.findAll();
        const arrayId = allId.map((el) => el.id);
        const postId = arrayId[arrayId.length - 1];
        await db.BlogPost.create({ title, content, userId });
        await db.PostCategory.create({ postId, categoryId });
    },
    list: async () => {
        const post = db.BlogPost.findAll({
            include: [{ model: db.User, as: 'user', attributes: { exclude: ['password'] } }, 
            { model: db.Category, as: 'categories' }],
        });
        return post;
    },
    findById: async (id) => {
        const blogPosts = await db.BlogPost.findAll();
        const notId = blogPosts.some((el) => Number(el.id) === Number(id));
        console.log(notId);
        if (!notId) {
          const e = new Error('Post does not exist');
          e.name = 'NotFoundError';
          throw e;
        }
        const postId = db.BlogPost.findByPk(id, {
            include: [{ model: db.User, as: 'user', attributes: { exclude: ['password'] } }, 
            { model: db.Category, as: 'categories' }],
        });
        return postId;
    },
    // updated: async ({ title, content }, authorization) => {
    //     const { data: { id } } = validateToken(authorization);
    //     console.log(id);
    // },
};

module.exports = postService;