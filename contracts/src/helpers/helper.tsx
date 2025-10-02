import { NDS, NDS_VICHET, NDS_VICHET_LIMIT, PENSIA } from './constants';
import { Personal, Service } from './contractTypes';

export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const getURLByBase64File = (scanStr: string, mimeType: string) => {
  // Remove data URL scheme if present
  const base64Data = scanStr.replace(/^data:.+;base64,/, '');
  const byteCharacters = atob(base64Data); // Decode Base64 string
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });
  const url = URL.createObjectURL(blob);
  return url;
};
// export const downloadFile = (
//   base64String: { scan: string },
//   mimeType: string,
//   fileName: string
// ) => {
//   const url = getURLByBase64File(base64String.scan, mimeType);
//   // Create a link element to download the file
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = fileName;
//   link.click();

//   // Cleanup
//   URL.revokeObjectURL(url);
// };

export const getShortName = (person: Personal | undefined): string => {
  return person === undefined || person === null
    ? ''
    : `${person.firstName[0]}. ${person.middleName[0]}. ${person.lastName}`;
};

export const circleCost = (cost: number) => {
  return Math.trunc(cost * 100) / 100;
};

export const getServicesCostWithNDS = (services: Service[]) => {
  const itogSumm = getServicesCost(services);
  const itogWithNDS = Math.trunc((itogSumm + itogSumm * (NDS / 100)) * 100) / 100;
  return circleCost(itogWithNDS);
};

/**
 * Согласно закона 47 о налогоывых вычетов
 * если ЗП меньше 192р то вычитается только 1% в пенсионный фонд
 * если ЗП меньше 1164 то вычитается 192 и берётся налог от этой суммы (13% подоходный + 1% пенсионный)
 * если ЗП больше то берётся налог от всей суммы (13% подоходный + 1% пенсионный)
 * @param services - list of services
 * @returns cost with NDS
 */
export const getServicesCostWithNDS_47 = (services: Service[]) => {
  const itogSumm = getServicesCost(services);
  let itogSummNDS = 0;
  if (itogSumm < NDS_VICHET) {
    itogSummNDS = itogSumm + itogSumm * (PENSIA / 100);
  } else if (itogSumm < NDS_VICHET_LIMIT) {
    const summWithouVichet = itogSumm - NDS_VICHET;
    const summNDS = (summWithouVichet * 100 + summWithouVichet * (NDS / 100) * 100) / 100;
    itogSummNDS = summNDS + NDS_VICHET;
  } else {
    itogSummNDS = (itogSumm * 100 + itogSumm * (NDS / 100) * 100) / 100;
  }
  return itogSummNDS;
};

export const getServicesCost = (services: Service[]) => {
  const itogSumm = services.reduce((result, s) => result + s.count * s.cost, 0);
  // services.forEach((s) => (itogSumm += s.count * s.cost));
  return itogSumm;
};

export const currencyOption: ConvertOptions = {
  currency: {
    currencyNameCases: ['белорусский рубль', 'белорусских рубля', 'белорусских рублей'], // [1 рубль, 2-4 рубля, 5-9 рублей]
    fractionalPartNameCases: ['копейка', 'копейки', 'копеек'],
    currencyNounGender: {
      integer: 0, // 0 => Мужской род ('один', 'два'...)
      fractionalPart: 1, // 1 => Женский род ('одна', 'две'...)
    },
    fractionalPartMinLength: 2,
  },
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

export function NotNullubleValue<T>(
  argument: T | undefined | null,
  message: string = 'This value was promised to be there.'
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

export const getIdNum = (strId: string): number => {
  const numId = parseInt(strId);
  if (isNaN(numId)) throw new Error(`${strId} can't parse to Int`);
  return numId;
};

export const trimObjectProperty: <T extends object>(obj: T) => T = (obj) => {
  Object.keys(obj).forEach((key) => {
    //@ts-ignore
    if (typeof obj[key] == 'string') obj[key] = obj[key].trim();
  });

  return obj;
};

export const providesRTKTagList = <R extends { id: string | number }[], T extends string>(
  resultsWithIds: R | undefined,
  tagType: T
) => {
  return resultsWithIds
    ? [{ type: tagType, id: 'LIST' }, ...resultsWithIds.map(({ id }) => ({ type: tagType, id }))]
    : [{ type: tagType, id: 'LIST' }];
};
