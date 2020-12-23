const { User, Thought } = require("../models");

// Resolver that serves the response for helloWorld query
const resolvers = {
    Query: {
        // Parent parameter is a placeholder to be able to access second parameter
        // Resolvers accept four arguments in order:
        // parent: if we used nested resolvers for more complicate actions
        // args: object of all values passed into a query or mutation request as parameters
        // context: used if we need the same data to be accessible by all resolvers (login status, etc.)
        // info: extra information about operation's current state
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },
        users: async () => {
            return User.find()
                .select("-__v -password")
                .populate("friends")
                .populate("thoughts");
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select("-__v -password")
                .populate("friends")
                .populate("thoughts");
        },
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        }
    }
};

module.exports = resolvers;