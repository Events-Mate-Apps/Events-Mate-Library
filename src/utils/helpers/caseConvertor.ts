export const toCamelCase = (key: string) => {
  return key.replace(/([-_][a-z])/gi, ($1) =>
    $1.toUpperCase().replace('_', '')
  );
}

export const transformResponseData = (data: any): any =>  {
  if (Array.isArray(data)) {
    return data.map(transformResponseData);
  }
  if (data && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        toCamelCase(key),
        transformResponseData(value),
      ])
    );
  }
  return data;
}