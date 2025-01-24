"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinTxt = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class JoinTxt {
    constructor(inputFolder, outputFolder) {
        this.inputFolder = inputFolder;
        this.outputFolder = outputFolder;
    }
    static create(inputFolder, outputFolder) {
        return new JoinTxt(inputFolder, outputFolder).joinTxt();
    }
    joinTxt() {
        let joined = '';
        try {
            const files = fs_1.default.readdirSync(this.inputFolder);
            const filesTxt = files.filter(elemento => {
                const rutaElemento = path_1.default.join(this.inputFolder, elemento);
                return fs_1.default.statSync(rutaElemento).isFile() && path_1.default.extname(elemento).toLowerCase() === '.txt';
            });
            filesTxt.forEach(file => {
                const pathFile = path_1.default.join(this.inputFolder, file);
                const content = fs_1.default.readFileSync(pathFile, 'utf-8');
                joined += content + '\n\n';
            });
            fs_1.default.writeFileSync(this.outputFolder, joined, 'utf-8');
        }
        catch (e) {
            const errorStatus = e.status ? e.status : common_1.HttpStatus.BAD_REQUEST;
            const errorResponse = e.response && e.response.data ? e.response.data : e;
            throw new common_1.HttpException(errorResponse, errorStatus);
        }
    }
}
exports.JoinTxt = JoinTxt;
