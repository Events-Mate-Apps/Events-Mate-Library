export const textToDomainText = (text: string, domain: string): string => {
  const domainTranslationMap: Map<string, Map<string, string>> = new Map([
    ['www.nase-svatba.cz', new Map([['WeddMate', 'Naše svatba']])],
    ['www.weddmate.com', new Map([['WeddMate', 'WeddMate']])],
    ['www.our-wedding.com', new Map([['WeddMate', 'WeddMate']])],
    ['www.our-wedding.app', new Map([['WeddMate', 'WeddMate']])],
    ['localhost', new Map([['WeddMate', 'Localhost']])],
    ['www.nas-den.sk', new Map([['WeddMate', 'Náš deň']])],
    ['www.nasza-wesele.pl', new Map([['WeddMate', 'Nasza wesele']])],
    ['www.xil-nostro-matrimonio.it', new Map([['WeddMate', 'Il nostro matrimonio']])]
  ]);
  
  const translation = domainTranslationMap.get(domain);
  if (translation && translation.has(text)) {
    return translation.get(text)!;
  }
  return text;
};

