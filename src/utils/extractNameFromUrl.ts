export function extractNameFromUrl(url: string): string {
  return url.split("/").pop() ?? "";
}
