module.exports = function(sequelize, DataTypes) {
    //job title, professional summary, education, 3 skills
    const Resume = sequelize.define("Resume", {
        jobSeeking: {
            type:DataTypes.TEXT,
            allowNull:false
        },
        professionalSummary: {
             type:DataTypes.TEXT,
             allowNull:false
        },
        education: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        relevantSkills1: {
            type: DataTypes.TEXT,
            allowNull:false
        },
        relevantSkills2: {
            type: DataTypes.TEXT,
            allowNull:false
        },
        relevantSkills3: {
            type: DataTypes.TEXT,
            allowNull:false
        },
    });

    Resume.associate = function(models) {
        Resume.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
    }
    return Resume;
};