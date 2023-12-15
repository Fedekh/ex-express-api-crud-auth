const express = require("express");
const multer = require('multer');
require("dotenv").config();
const routerPost = require("./routers/post");
const routerTag = require("./routers/tag");
const categoryRouter = require("./routers/category");
const userRouter = require("./routers/user");
const cors = require("cors");
const app = express();
const port = +process.env.PORT || 5555;
const { log } = require("console");

app.use(cors('*'));

//middleware per parsing body
app.use(express.json());

const storage = multer.memoryStorage(); // Memorizza i file in memoria anziché sul disco
const upload = multer({ storage: storage });

// Utilizza il middleware di Multer per i dati di tipo multipart/form-data
app.use(upload.any());

const routeNotFound = require("./middleware/notFound");
const errorsHandler = require("./middleware/errorHandler");



app.use("/post", routerPost);
app.use("/tag", routerTag);
app.use("/category", categoryRouter);
app.use("/user", userRouter);


app.use(routeNotFound);

app.use(errorsHandler);





//avvio app
app.listen(port, () => {
    log(`App avviata su http://localhost:${port}`);
});
