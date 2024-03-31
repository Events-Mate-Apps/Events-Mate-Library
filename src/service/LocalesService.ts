export function extractLanguageISOCodesFromObject(obj: object): string[] {
    let langs: string[] = [];
  
    function extractLanguages(obj: any) {
      if (obj !== null && typeof obj === 'object') {
        Object.entries(obj).forEach(([key, value]) => {
          if (key === 'languageISO' && typeof value === 'string') {
            !langs.includes(value) && langs.push(value);
          } else if (typeof value === 'object') {
            extractLanguages(value);
          }
        });
      }
    }
  
    extractLanguages(obj);
    return langs;
}