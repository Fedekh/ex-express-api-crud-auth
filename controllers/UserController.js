const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hash, compare } = require("../utility/hashPassword");
const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");


const index = async function (req, res) {
    const users = await prisma.user.findMany({
        select: {
            user: true
        }
    });

    res.json({ users });
}

const register = async (req, res) => {
    const data = matchedData(req);

    data.password = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            ...data
        }, 
        select: { //escludo la password nella risposta json
            id: true,
            email: true,
            name: true,
            role: true,
        }

    })

    res.json({ user: user, message: "Utente " + user.name + " creato correttamente" })
}


const login = async (req, res, next) => { res.send("Ciao sono logi") }

module.exports = { index, login, register }