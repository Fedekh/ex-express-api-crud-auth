const jsonwebtoken = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token mancante" });
    }

    const token = bearer.split(" ")[1];

    try {
        const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        console.error("Errore di autenticazione:", error.message);
        return res.status(401).json({ error: "Token non valido" });
    }
};
