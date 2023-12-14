const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const usersAuthError = require("../exceptions/userAuth");
const { password } = require("../validations/userLogin");

const index = async function (req, res) {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                password: true
            },
        });

        res.json({ users });
    } catch (error) {
        console.error("Errore durante il recupero degli utenti:", error);
        res.status(500).json({ error: "Errore durante la richiesta degli utenti" });
    }
};

const register = async (req, res) => {
    try {
        const data = matchedData(req);
        data.password = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });

        const token = jsonwebtoken.sign({ userId: user.id, email: user.email }, process.env.JWT_KEY, {
            expiresIn: "1000000h",
        });

        res.json({ user, token });
    } catch (error) {
        console.error("Errore durante la registrazione dell'utente:", error);
        res.status(500).json({ error: "Errore durante la registrazione dell'utente" });
    }
};

const login = async (req, res, next) => {
    try {
        console.log("Richiesta di login ricevuta", req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            console.log("Email o password mancanti");
            return next(new usersAuthError("Email e password sono obbligatorie"));
        }

        const user = await prisma.user.findUnique({
            where: { email: email },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                password: true,
            },
        });

        if (!user) {
            console.log("Utente non trovato");
            return next(new usersAuthError("Utente non trovato"));
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            console.log("Password errata");
            return next(new usersAuthError("Password errata"));
        }

        const token = jsonwebtoken.sign({ userId: user.id, email: user.email }, process.env.JWT_KEY, {
            expiresIn: "10000h",
        });

        console.log("Login riuscito");

        res.json({ user, token });
    } catch (error) {
        console.error("Errore durante il login dell'utente:", error);
        res.status(500).json({ error: "Errore durante il login dell'utente" });
    }
};


module.exports = { index, login, register };
