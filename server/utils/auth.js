const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhh";
const expiration = "2h";

module.exports = {
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },

    authMiddleware: function ({ req }) {

        // Allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // Separate "Bearer" from "<tokenvalue>"
        if (req.headers.authorization) {
            token = token.split(" ").pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            // Decode and attach user data to request object
            // If secret on the token doesn't match our secret, error will be thrown
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log("Invalid token");
        }

        return req;
    }
}