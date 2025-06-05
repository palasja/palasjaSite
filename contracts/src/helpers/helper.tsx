import { NDS, NDS_VICHET, NDS_VICHET_LIMIT } from './constants';
import { Personal, Service } from './contractTypes';

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

export const getServicesCostWithNDS = (services: Service[]) => {
  const itogSumm = getServicesCost(services);
  return (itogSumm * 100 + itogSumm * (NDS / 100) * 100) / 100;
};

/**
 * Согласно закона 47 о налогоывых вычетов
 * если ЗП меньше 192р то вычитается только 1% в пенсионный фонд
 * если ЗП меньше 1164 то вычитается 192 и берётся налог от этой суммы (13% подоходный + 1% пенсионный)
 * если ЗП больше то берётся налог от всей суммы (13% подоходный + 1% пенсионный)
 * @param services
 * @returns
 */
export const getServicesCostWithNDS_47 = (services: Service[]) => {
  let itogSumm = getServicesCost(services);
  let itogSummNDS = 0;
  if (itogSumm < NDS_VICHET) {
    itogSummNDS = itogSumm;
  } else if (itogSumm < NDS_VICHET_LIMIT) {
    const summWithouVichet = (itogSumm = NDS_VICHET_LIMIT);
    itogSummNDS = (summWithouVichet * 100 + summWithouVichet * (NDS / 100) * 100) / 100;
  } else {
    itogSummNDS = (itogSumm * 100 + itogSumm * (NDS / 100) * 100) / 100;
  }
  return itogSummNDS;
};

export const getServicesCost = (services: Service[]) => {
  let itogSumm = 0;
  services.forEach((s) => (itogSumm += s.count * s.cost));
  return itogSumm;
};

export const MONTH_R = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];
