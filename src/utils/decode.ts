

export const decodeJWT = (token: string) => {
  const [headerB64, payloadB64] = token.split('.');
    
  return {
    header: JSON.parse(base64UrlDecode(headerB64)),
    payload: JSON.parse(base64UrlDecode(payloadB64))
  };
};
export const base64UrlDecode = (str: string): string => {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  
  switch (output.length % 4) {
    case 2: output += '=='; break;
    case 3: output += '='; break;
  }
  
  return atob(output);
};
export const toSnakeCase = (obj: Record<string, any>): Record<string, any> => {
  if (!obj || typeof obj !== 'object') return obj;
    
  return Object.keys(obj).reduce((acc, key) => {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    acc[snakeKey] = toSnakeCase(obj[key]);  
    return acc;
  }, {} as Record<string, any>);
};
  