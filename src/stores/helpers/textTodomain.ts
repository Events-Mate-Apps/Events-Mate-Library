export const textToDomainText = (text: string, domain: string): string => {
  const domainTranslationMap: Map<string, Map<string, string>> = new Map([
    [
      'www.nase-svatba.cz',
      new Map([
        ['WeddMate', 'Naše svatba'],
        ['weddmateURL', 'nase-svatba']
      ])
    ],
    [
      'www.weddmate.com',
      new Map([
        ['WeddMate', 'WeddMate'],
        ['weddmateURL', 'weddmate']
      ])
    ],
    [
      'www.our-wedding.com',
      new Map([
        ['WeddMate', 'WeddMate'],
        ['weddmateURL', 'our-wedding']
      ])
    ],
    [
      'www.our-wedding.app',
      new Map([
        ['WeddMate', 'WeddMate'],
        ['weddmateURL', 'our-wedding']
      ])
    ],
    [
      'localhost',
      new Map([
        ['WeddMate', 'Localhost'],
        ['weddmateURL', 'localhost']
      ])
    ],
    [
      'www.nas-den.sk',
      new Map([
        ['WeddMate', 'Náš deň'],
        ['weddmateURL', 'nas-den']
      ])
    ],
    [
      'www.nasza-wesele.pl',
      new Map([
        ['WeddMate', 'Nasza wesele'],
        ['weddmateURL', 'nasza-wesele']
      ])
    ],
    [
      'www.xil-nostro-matrimonio.it',
      new Map([
        ['WeddMate', 'Il nostro matrimonio'],
        ['weddmateURL', 'il-nostro-matrimonio']
      ])
    ]
  ]);

  const translation = domainTranslationMap.get(domain);
  if (translation && translation.has(text)) {
    return translation.get(text)!;
  }
  return text;
};
