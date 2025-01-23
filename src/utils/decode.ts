

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
