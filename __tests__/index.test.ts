import { isValidEmail, hashPassword, comparePassword, validateRUT, emailExists, isPasswordStrong } from '../src/index';

describe('Email Validation', () => {
  it('should return true for a valid email format', () => {
    expect(isValidEmail('ejemplo@example.com')).toBe(true);
  });

  it('should return false for an invalid email format', () => {
    expect(isValidEmail('invalid-email')).toBe(false);
  });

  it('should return true for an existing email domain', async () => {
    expect(await emailExists('example@example.com')).toBe(true);
  });

  it('should return false for a non-existent email domain', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(await emailExists('example@dosntexist.com')).toBe(false);
    expect(console.error).toHaveBeenCalledWith('Domain not found: dosntexist.com');
    spy.mockRestore();
  });

  it('should return false for an invalid email format', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(await emailExists('invalid-email')).toBe(false);
    expect(console.error).toHaveBeenCalledWith('Invalid email format');
    spy.mockRestore();
  });

  it('should return false and log an error for a non-resolvable domain', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const result = await emailExists('example@nonresolvabledomain.invalid');
    expect(result).toBe(false);
    expect(console.error).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should return false and log an error for missing domain part', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const result = await emailExists('missingdomain@');
    expect(result).toBe(false);
    expect(console.error).toHaveBeenCalledWith('Invalid email format');
    spy.mockRestore();
  });
});

describe('Password Hashing', () => {
  const password = 'TuPass123!';

  it('should hash a password correctly', async () => {
    const hash = await hashPassword(password);
    expect(hash).not.toBe(password);
  });

  it('should match the correct password', async () => {
    const hash = await hashPassword(password);
    const isMatch = await comparePassword(password, hash);
    expect(isMatch).toBe(true);
  });

  it('should not match an incorrect password', async () => {
    const hash = await hashPassword(password);
    const isMatch = await comparePassword('wrongPassword', hash);
    expect(isMatch).toBe(false);
  });
});

describe('Password Strength Validation', () => {
  it('should return false for a password that is too short', () => {
    expect(isPasswordStrong('Short1!')).toBe(false);
  });

  it('should return false for a password without uppercase letters', () => {
    expect(isPasswordStrong('nouppercase1!')).toBe(false);
  });

  it('should return false for a password without lowercase letters', () => {
    expect(isPasswordStrong('NOLOWERCASE1!')).toBe(false);
  });

  it('should return false for a password without numbers', () => {
    expect(isPasswordStrong('NoNumbers!')).toBe(false);
  });

  it('should return false for a password without special characters', () => {
    expect(isPasswordStrong('NoSpecial1')).toBe(false);
  });

  it('should return false for a password with common patterns', () => {
    expect(isPasswordStrong('password')).toBe(false);
    expect(isPasswordStrong('admin123')).toBe(false);
  });

  it('should return true for a strong password', () => {
    expect(isPasswordStrong('StrongPass1!')).toBe(true);
  });

  it('should return true for a strong password with all character types', () => {
    expect(isPasswordStrong('Valid1Password!')).toBe(true);
  });

  it('should return true for another strong password with all character types', () => {
    expect(isPasswordStrong('Aa1!strongpassword')).toBe(true);
  });
});

describe('RUT Validation', () => {
  it('should return true for a valid RUT', () => {
    expect(validateRUT('16512896-6')).toBe(true); // RUT válido
    expect(validateRUT('12345678-5')).toBe(true); // RUT válido
    expect(validateRUT('76086428-5')).toBe(true); // RUT válido
  });

  it('should return false for an invalid RUT', () => {
    expect(validateRUT('12345678-9')).toBe(false); // RUT inválido
    expect(validateRUT('16512896-0')).toBe(false); // RUT inválido
    expect(validateRUT('76086428-0')).toBe(false); // RUT inválido
  });

  it('should return false for a malformed RUT', () => {
    expect(validateRUT('1234.5678-9')).toBe(false); // RUT mal formado
    expect(validateRUT('')).toBe(false); // RUT vacío
    expect(validateRUT('ABCDEF-K')).toBe(false); // RUT con caracteres no numéricos
  });
});
