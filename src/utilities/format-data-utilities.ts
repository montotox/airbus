export function nullToEmpty(data: any) {
  if (data === null) data = "";
  return data;
}

export function nullToCero(data: any) {
  if (!data) return 0;
  return data;
}

export function nanToCero(result: any) {
  if (isNaN(result)) return 0;
  return result;
}

export function infinityToCero(result: any) {
  if (isFinite(result)) return result;
  return 0;
}

export function isEmptyOrSpaces(str: string) {
  if (str === null || str.match(/^\s*$/) !== null) return null;
  return str;
}
