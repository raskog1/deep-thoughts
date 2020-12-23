// Resolver that serves the response for helloWorld query
const resolvers = {
    Query: {
        helloWorld: () => {
            return "Hello world!";
        }
    }
};

module.exports = resolvers;