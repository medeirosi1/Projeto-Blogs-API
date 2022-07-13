const createBlogPost = (sequelize, DataTypes) => {
    const blogPost = sequelize.define('BlogPost', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
         },
         title: DataTypes.STRING,
         content: DataTypes.STRING,
         userId: {
            type: DataTypes.INTEGER,
         },
         published: DataTypes.DATE,
         updated: DataTypes.DATE,
    }, {
      tableName: 'BlogPosts',
    });

    blogPost.associate = (db) => {
        blogPost.belongsTo(db.User, { as: 'user', foreignKey: 'userId' });
    }

    return blogPost;
};

module.exports = createBlogPost