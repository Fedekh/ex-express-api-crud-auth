Aggiungeremo i seguenti modelli con le relative relazioni col modello Post:

Category (one-to-many): Ogni Post deve avere una categoria associata, e una categoria può avere più Post associati.

Tags (many-to-many): Ogni Post può avere uno o più tag associati, e ogni Tag può avere uno o più Post associati.

Successivamente, aggiungete la validazione dei dati utilizzando Express Validator alle rotte del vostro blog.

Infine, assicuratevi che le richieste di lettura GET restituiscano anche la categoria e i tags di ogni singolo Post.

Piccolo suggerimento: Se avete già popolato la tabella dei posts indicate il campo categoryId come nullable o un valore di default altrimenti avreste un errore in fase di migrazione.

BONUS:
Implementare le operazioni di CRUD per il modello Category.
Implementare le operazioni di CRUD per il modello Tag.
Implementare le validazioni tramite Schema e middleware dedicato.

-------------------------------------------------------------------------------------------------------------

Aggiungiamo l’autenticazione al nostro progetto!

Create tutto il necessario (Model, Controller, rotte e validazioni) per implementare le due funzionalità principali:

Creazione nuovo utente: rotta POST /register
Login utente: rotta POST /login

Proteggete, attraverso un middleware che verifichi il token JWT passato nell’header della richiesta, le rotte di creazione, modifica e cancellazione della risorsa Post.


BONUS:
Aggiungete una relazione one-to-many fra i modelli User e Post.
Aggiungete un middleware che verifichi che un utente possa modificare o cancellare solo i Post a lui associati, altrimenti restituisca un errore 403.


----------------------------------------------------------------- 
installazioni necessarie:
npm init
npm i dotenv express @prisma/client bcrypt jsonwebtoken
npm install -D nodemon
npm install -D prisma

validazione:
npm install express-validator


inizializzazione di Prisma, utilizzando MySQL come DBMS:
npx prisma init --datasource-provider mysql

in file .env:
DATABASE_URL="mysql://root:root@localhost:8889/blog"


prima migration:
npx prisma migrate dev --name prima_migration


--------------------------------------------------------------
scaffolding iniziale:

const express = require("express");
require("dotenv").config();
const routerPost = require("./routers/post");
const app = express();
const port = +process.env.PORT || 5555;
const { log } = require("console");

//middleware riceve in input i dati e nel output json
app.use(express.json());

app.use("/posts", routerPost);


//avvio app
app.listen(port, () => {
  log(`App avviata su http://localhost:${port}`);
});


