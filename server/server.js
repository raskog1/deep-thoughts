const express = require('express');

// Import ApolloServer
const { ApolloServer } = require("apollo-server-express");

// Import our typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// Integrate our Apollo server with the Express application as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
