const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
/**
 * @type {import ("express-validator").Schema;}
 */
module.exports = {
    name: {
        in: ["body"],
        isString: true,
        notEmpty: {
            errorMessage: "Il nome non puo essere vuoto",
            bail: true, //blocca tutto
            options: {
                ignore_whitespace: true
            }
        },
        isLength: {
            options: {
                min: 4,
                max: 10
            }
        },
        errorMessage: "Il nome inserito non è valido"
    },
    email: {
        in: ["body"],
        isEmail: true,
        notEmpty: {
            errorMessage: "L'email non puo essere vuoto",
            bail: true, //blocca tutto
            options: {
                ignore_whitespace: true
            }
        },
        isLength: {
            options: {
                min: 5,
                max: 10,
            },
            errorMessage: "Email non rispecchia la lunghezza"
        },
        custom: {  //validatore custom
            options: async (value) => {
                const alreadyExists = await prisma.user.findUnique({
                    where: {
                        email: value,
                    },
                });

                if (alreadyExists) return Promise.reject("Email gia in uso");

                return true;
            },
        }
    },
    password: {
        in: ["body"],
        isStrongPassword: {
            options: {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minSymbols: 1,
                minNumbers: 1
            }
        },
        notEmpty: {
            errorMessage: "La password non puo essere vuota",
            bail: true, //blocca tutto
            options: {
                ignore_whitespace: true
            }
        },
        isLength: {
            max: 12
        },
        errorMessage: "Almeno 6 caratteri, 1 simbolo 1 numero 1 maiuscola"
    }
}