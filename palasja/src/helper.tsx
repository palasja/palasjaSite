import { Personal } from './types';

export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const base64ToFile = (
  base64String: { scan: string },
  mimeType: string,
  fileName: string
) => {
  // Remove data URL scheme if present
  const base64Data = base64String.scan.replace(/^data:.+;base64,/, '');
  const byteCharacters = atob(base64Data); // Decode Base64 string
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });
  const url = URL.createObjectURL(blob);

  // Create a link element to download the file
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();

  // Cleanup
  URL.revokeObjectURL(url);
};

export const getShortName = (person: Personal | undefined): string => {
  return person === undefined || person === null
    ? ''
    : `${person.firstName[0]}. ${person.middleName[0]}. ${person.lastName}`;
};
