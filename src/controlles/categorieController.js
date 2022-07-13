const categorieService = require('../services/categorieService');

const categorieController = {
    create: async (req, res) => {
        const { name } = await categorieService.validationName(req.body);
        const categorie = await categorieService.create({ name });

        res.status(201).json(categorie);
    },
    list: async (_req, res) => {
        const categories = await categorieService.list();
        res.status(200).json(categories);
    },
};

module.exports = categorieController;