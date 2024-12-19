export function validateRUT(rut: string): boolean {
    const cleanedRUT = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
  
    if (cleanedRUT.length < 2) {
      return false;
    }
    const body = cleanedRUT.slice(0, -1);
    const dv = cleanedRUT.slice(-1);
  
    if (!/^\d+$/.test(body)) {
      return false;
    }
  
    let sum = 0;
    let multiplier = 2;
  
    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body.charAt(i), 10) * multiplier;
      multiplier = (multiplier === 7) ? 2 : multiplier + 1;
    }
  
    const remainder = 11 - (sum % 11);
    const expectedDV = remainder === 11 ? '0' : remainder === 10 ? 'K' : remainder.toString();
  
    return dv === expectedDV;
  }  