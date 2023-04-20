const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with the PostgreSQL connection string
const sequelize = new Sequelize('postgres://user:password@localhost/dbname', {
  dialect: 'postgres'
});

// User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  experience: {
    type: DataTypes.INTEGER
  },
  education: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  }
});

// JobListing model
const JobListing = sequelize.define('JobListing', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  requirements: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  qualifications: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  salary: {
    type: DataTypes.DOUBLE,
  },
  location: {
    type: DataTypes.STRING
  }
});

// Application model
const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  resume: {
    type: DataTypes.STRING,
  },
  cover_letter: {
    type: DataTypes.STRING,
  },
  questions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  }
});

// Message model
const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  subject: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.STRING,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
});

// Define relationships
User.hasMany(JobListing, { foreignKey: 'employer_id' });
JobListing.belongsTo(User, { as: 'employer', foreignKey: 'employer_id' });

User.hasMany(Application, { foreignKey: 'seeker_id' });
Application.belongsTo(User, { as: 'seeker', foreignKey: 'seeker_id' });

JobListing.hasMany(Application, { foreignKey: 'job_id' });
Application.belongsTo(JobListing, { foreignKey: 'job_id' });

User.hasMany(Message, { as: 'sentMessages', foreignKey: 'sender_id' });
User.hasMany(Message, { as: 'receivedMessages', foreignKey: 'receiver_id' });

Message.belongsTo(User, { as: 'sender', foreignKey: 'sender_id' });
Message.belongsTo(User, { as: 'receiver', foreignKey: 'receiver_id' });

// Export the models and sequelize instance
module.exports = {
  sequelize,
  User,JobListing,
Application,
Message
};

// Sync the database schema with the models
async function syncDatabase() {
try {
await sequelize.sync({ force: false }); // Change force to true if you want to recreate the tables
console.log('Database sync successful');
} catch (error) {
console.error('Error syncing database:', error);
}
}

// Call the syncDatabase function
syncDatabase();
 
