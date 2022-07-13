const categorieService = require('../services/categorieService');

const categorieController = {
    create: async (req, res) => {
        const { name } = await categorieService.validationName(req.body);
        const categorie = await categorieService.create({ name });

        res.status(201).json(categorie);
    },
};

module.exports = categorieController;