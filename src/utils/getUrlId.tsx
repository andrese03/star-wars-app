// Used to retrieve resource id for data
export function getUrlId(url: string): number {
  return Number(url.split("/").reverse()[1]);
}
