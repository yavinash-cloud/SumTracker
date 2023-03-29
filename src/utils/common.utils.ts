export const getQueryFromUrl = (url: string) => {
  const urlObj = new URL(url);
  const query: Record<string, any> = {};
  urlObj.searchParams.forEach(function (val, key) {
    query[key] = val;
  });

  return query;
};
