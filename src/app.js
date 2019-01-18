const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const seed = require('./seed');

const PORT = process.env.PORT || 3000;
const USE_DISTANT_DB =
  process.env.NODE_ENV === 'production' ||
  process.env.USE_DISTANT_DB === 'true';

mongoose.Promise = global.Promise;

if (!USE_DISTANT_DB) {
  mongoose.connect(
    'mongodb://localhost/demo-apollo-server',
    (err, data) => {
      if (err) {
        return err;
      }
      mongoose.connection.db.dropDatabase();
      seed();
      return true;
    },
  );
} else {
  mongoose.connect(
    'mongodb://demo-apollo-server:apollo@ds237868.mlab.com:37868/demo-apollo-server',
    err => {
      if (err) {
        return err;
      }
      return true;
    },
  );
}

const Schema = require('./schema');
const Resolvers = require('./resolvers');
const Connectors = require('./connectors');

const server = new ApolloServer({
  typeDefs: Schema,
  resolvers: Resolvers,
  context: {
    constructor: Connectors,
  },
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
