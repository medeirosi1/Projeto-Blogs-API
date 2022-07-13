const createPostCategory = (sequelize, DataTypes) => {
    const postCategory = sequelize.define('PostCategory', {
        postId: {
            type: DataTypes.INTEGER,
            primaryKey: true
         },
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
}, {
    tableName: 'PostCategories',
    timestamps: false
});

    postCategory.associate = (db) => {
        db.BlogPost.belongsToMany(db.Category, {
            as: 'categories',
            through: postCategory,
            foreignKey: 'postId',
            otherKey: 'categoryId'
        });
        db.Category.belongsToMany(db.BlogPost, {
            as: 'blogPost',
            through: postCategory,
            foreignKey: 'categoryId',
            otherKey: 'postId'
        });
    }

    return postCategory;
};

module.exports = createPostCategory