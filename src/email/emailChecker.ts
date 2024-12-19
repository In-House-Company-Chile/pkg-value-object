import dns from 'node:dns/promises';

interface NodeJsErrnoException extends Error {
  code?: string;
}

export async function emailExists(email: string): Promise<boolean> {
  const domain = email.split('@')[1];
  
  if (!domain) {
    console.error('Invalid email format');
    return false;
  }

  try {
    const mxRecords = await dns.resolveMx(domain);
    return mxRecords && mxRecords.length > 0;
  } catch (error) {
    const systemError = error as NodeJsErrnoException;
    if (systemError.code === 'ENOTFOUND') {
      console.error(`Domain not found: ${domain}`);
    } else if (systemError instanceof Error) {
      console.error(`Error verifying email domain: ${systemError.message}`);
    } else {
      console.error('An unknown error occurred while verifying the email domain', error);
    }
    return false;
  }
}