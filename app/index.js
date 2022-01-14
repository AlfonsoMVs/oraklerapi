import app from "./app.js";
import bootstrap from "./bootstrap.js";"./bootstrap.js";


const init = async () => {
    // Server is listening
    app.listen(app.get("port"));
    
    console.log("Server on port", app.get("port"));
    console.log("Environment:", process.env.NODE_ENV);
}

bootstrap(init)
