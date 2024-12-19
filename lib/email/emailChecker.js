"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailExists = void 0;
const promises_1 = __importDefault(require("node:dns/promises"));
function emailExists(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const domain = email.split('@')[1];
        if (!domain) {
            console.error('Invalid email format');
            return false;
        }
        try {
            const mxRecords = yield promises_1.default.resolveMx(domain);
            return mxRecords && mxRecords.length > 0;
        }
        catch (error) {
            const systemError = error;
            if (systemError.code === 'ENOTFOUND') {
                console.error(`Domain not found: ${domain}`);
            }
            else if (systemError instanceof Error) {
                console.error(`Error verifying email domain: ${systemError.message}`);
            }
            else {
                console.error('An unknown error occurred while verifying the email domain', error);
            }
            return false;
        }
    });
}
exports.emailExists = emailExists;
