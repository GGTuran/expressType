"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const router = express_1.default.Router();
const courseRoute = express_1.default.Router();
app.use("/", router);
app.use("/", courseRoute);
router.get("/api/v1/users/create-user", (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: "Successful",
        data: user,
    });
});
courseRoute.post("/api/v1/courses/create-course", (req, res) => {
    const data = req.body;
    console.log(data);
    res.json({
        success: true,
        message: "Data inserted",
        data: data,
    });
});
//middleware
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
app.get('/', logger, (req, res, next) => {
    try {
        console.log(req.query);
        res.send('Hello World!');
    }
    catch (error) {
        console.log(error);
        // res.status(400).json({
        //   success:false,
        //   message:"Go somewhere else"
        // });
        //global error handling
        next(error);
    }
});
app.post('/', (req, res) => {
    console.log(req.body);
    res.send('Data de!!');
});
app.all('*', (req, res) => {
    res.status(400).json({
        success: false,
        message: "ja vag"
    });
});
//global error handling
app.use((error, req, res, next) => {
    if (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Fraud"
        });
    }
});
exports.default = app;
