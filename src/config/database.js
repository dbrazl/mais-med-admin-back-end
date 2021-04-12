const defaultMongoURL = "http://localhost:27017";

const databaseConfig = {
  mongoURL: process.env.MONGO_URL || defaultMongoURL,
};

export { databaseConfig };
