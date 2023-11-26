/*const config = {
env: process.env.NODE_ENV || 'development', 
port: process.env.PORT || 3000,
jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
mongoUri: process.env.MONGODB_URI ||
process.env.MONGO_HOST ||
'mongodb://' + (process.env.IP || 'localhost') + ':' + 
(process.env.MONGO_PORT || '27017') +
'/mernproject' 
}
export default config*/

const config = {
  env: "development",
  port: 3000,
  jwtSecret: "YOUR_secret_key",
  mongoUri:
    "mongodb+srv://lriches1:elKfSPwQX7osZJV7@cluster0.lghk0pa.mongodb.net/OnlineShop?retryWrites=true&w=majority",
};
export default config;
