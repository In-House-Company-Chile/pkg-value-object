"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPasswordStrong = void 0;
function isPasswordStrong(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= minLength;
    const commonPatterns = /^(password|12345|qwerty|letmein|abc123|admin|admin123|123456|654321|pass123)$/i;
    const noCommonPatterns = !commonPatterns.test(password);
    return isLongEnough && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars && noCommonPatterns;
}
exports.isPasswordStrong = isPasswordStrong;
