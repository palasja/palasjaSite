import { DOHOD, NDS, NDS_VICHET, NDS_VICHET_LIMIT, PENSIA_NDS } from './constants';
import { ConstCount, CostByUser, Personal, Service, ServiceCostChange, ServiceForTableType } from './contractTypes';

export const toBase64 = (file: File | Blob): Promise<string> =>
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
    : `${person.firstname[0]}. ${person.middlename[0]}. ${person.lastname}`;
};

export const roundedCost = (cost: number) => {
  return Math.trunc(cost * 100) / 100;
};

export const getServicesCostWithNDS = (services: Service[]) => {
  const itogSumm = getServicesCost(services);
  const itogWithNDS = Math.trunc((itogSumm + itogSumm * (NDS / 100)) * 100) / 100;
  return roundedCost(itogWithNDS);
};

/**
 * Согласно закона 47 о налогоывых вычетов
 * 1% в пенсионный фонд считается из ЗП до всех вычетов
 *
 * 2025 год
 *  * если ЗП меньше 192р то вычитается только 1% в пенсионный фонд
 * если ЗП меньше 1164 то вычитается 192 и берётся налог от этой суммы (13% подоходный + 1% пенсионный)
 * если ЗП больше то берётся налог от всей суммы (13% подоходный + 1% пенсионный)
 *
 * 2026 год
 * если ЗП меньше 216р то вычитается только 1% в пенсионный фонд
 * если ЗП меньше 1308 то вычитается 216 и берётся налог от этой суммы (13% подоходный + 1% пенсионный)
 * если ЗП больше то берётся налог от всей суммы (13% подоходный + 1% пенсионный)
 * @param services - list of services
 * @returns cost with NDS
 */
export const getServicesCostWithNDS_47 = (services: Service[]) => {
  const itogSumm = getServicesCost(services);
  let itogSummNDS = 0;
  if (itogSumm < NDS_VICHET) {
    itogSummNDS = itogSumm + itogSumm * (PENSIA_NDS / 100);
  } else if (itogSumm < NDS_VICHET_LIMIT) {
    const pensia_nds = itogSummNDS * (PENSIA_NDS / 100);
    const summAfterVichet = itogSumm - NDS_VICHET;
    const podohod = summAfterVichet * (DOHOD / 100);
    const summNDS = (summAfterVichet * 100 + podohod * 100 + pensia_nds * 100) / 100;
    itogSummNDS = summNDS + NDS_VICHET;
  } else {
    itogSummNDS = (itogSumm * 100 + itogSumm * (NDS / 100) * 100) / 100;
  }
  return roundedCost(itogSummNDS);
};

export const getServicesCost = <T extends ConstCount>(services: T[]): number => {
  const itogSumm = services.reduce((result, s) => result + s.count * s.cost, 0);
  // services.forEach((s) => (itogSumm += s.count * s.cost));
  return itogSumm;
};
export const getServicesCostByMonth = <T extends { time: number }>(
  services: T[],
  monthPayment: number
) => {
  const WORKDAY_IN_MONTH = 20;
  const HOUR_IN_WORKDAY = 8;
  const MIN_IN_HOUR = 60;
  const dayCost = monthPayment / WORKDAY_IN_MONTH;
  const hourCost = dayCost / HOUR_IN_WORKDAY;
  const minuteCost = hourCost / MIN_IN_HOUR;
  const workTimeInMonth = services.reduce((result, s) => result + s.time, 0);
  const result = workTimeInMonth * minuteCost;
  return Math.ceil(result * 100) / 100;
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

export const getCostByUser = (
  servicesCostChange: ServiceCostChange[],
  services: Service[]
): CostByUser[] => {
  let users = new Set<string>();

  //choose all unic services and users
  servicesCostChange.forEach((s) => {
    users.add(s.user);
  });
  let costByUser = [...users].map((u) => {
    // получить стоимость по каждому пользователю. Если пользователь менял стоимость, то учитывается она, если не менял то учитывается последния стоимасть.
    let actualCostByUser: ConstCount[] = services.map((serviceFull) => {
      let allById = servicesCostChange.filter((s) => s.serviceId === serviceFull.id);
      let costByCurUser = allById.filter((s) => s.user === u);

      if (costByCurUser.length !== 0) {
        let serviceByCurUser = costByCurUser.reduce((prev, current) =>
          prev && new Date(prev.date).getTime() > new Date(current.date).getTime() ? prev : current
        );
        return { cost: serviceByCurUser.newCost, count: serviceFull.count };
      } else {
        return { cost: serviceFull.cost, count: serviceFull.count };
      }
    });

    const cost = getServicesCost(actualCostByUser);
    return { user: u, cost: cost };
  });

  return costByUser;
};

export const providesRTKTagList = <R extends { id: string | number }[], T extends string>(
  resultsWithIds: R | undefined,
  tagType: T
) => {
  return resultsWithIds
    ? [{ type: tagType, id: 'LIST' }, ...resultsWithIds.map(({ id }) => ({ type: tagType, id }))]
    : [{ type: tagType, id: 'LIST' }];
};

export const groupServiseByCostAndName = (services: Service[]): ServiceForTableType[] => {
  const grouped = Object.groupBy(services, (s) => s.name + s.cost);
  const groupedArray = Object.values(grouped).map((arr) => {
    if (arr?.length === 1) {
      return arr[0];
    } else {
      let c = 0;
      arr?.forEach((a) => (c += a.count));
      const itog = arr![0];
      return { name: itog.name, cost: itog.cost, count: c };
    }
  });
  const sortedByNameArray = groupedArray.sort((a, b) => {
    const nameA = a.name.toUpperCase().trim();
    const nameB = b.name.toUpperCase().trim();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return sortedByNameArray;
};
export const getCurentUser : (userRedux: string | undefined) => string | null = (userRedux) => {
    const userSession = sessionStorage.getItem('user');
    const user = userRedux ? userRedux : userSession;
    return user;
}