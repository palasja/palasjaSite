import { downloadFile } from './helper';
import { Contract, Organization, Personal, Service, User } from './contractTypes';

const env = import.meta.env;

const fetchData = async (
  endpont: string,
  method: string,
  errorMessage: string,
  body?: any
): Promise<any> => {
  const res = await fetch(`${env.VITE_API_SERVER_URL}/${endpont}`, {
    method: method, // or 'PUT'
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status == 200) {
    return res.json();
  } else if (res.status == 401) {
    window.location.href = `${env.VITE_APP_URL}/logout`;
  } else {
    throw new Error(`${errorMessage}. ErrorCode = ${res.status}`);
  }
};

const fetchAuth = async (endpont: string, method: string, body?: any): Promise<number> => {
  const res = await fetch(`${env.VITE_API_SERVER_URL}/${endpont}`, {
    method: method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.status;
};

export const fetchContractsScan = (orgId: number) => {
  return fetch(`${env.VITE_API_SERVER_URL}/contractScan/${orgId}`, {
    method: 'GET',
    credentials: 'include',
  }).then(async (res) => {
    if (res.status == 200) {
      const str64 = await res.json();
      return downloadFile(str64, 'application/pdf', 'laod.pdf');
    } else if (res.status == 401) {
      window.location.href = `${env.VITE_APP_URL}/logout`;
    } else {
      throw new Error(`Не удалось загрузить скар договора. ErrorCode = ${res.status}`);
    }
  });
};

export const fetchSignIn = (data: User): Promise<number> => {
  return fetchAuth('signIn', 'POST', data);
};

export const fetchLogIn = async (data: User): Promise<number> => {
  return fetchAuth('logIn', 'POST', data);
};
export const fetchСheckAuth = async (): Promise<number> => {
  return fetchAuth('checkAuth', 'POST');
};

export const fetchLogOut = async (): Promise<number> => {
  return await fetchAuth('logout', 'GET');
};

export const fetchAllOrganizations = (): Promise<Organization[]> => {
  return fetchData('getOrganizations', 'GET', 'Не удалось загрузить список организаций');
};
export const addOrganisation = (organization: Organization): Promise<Organization> => {
  return fetchData('addOrganization', 'PUT', 'Не удалось добавить организацию', {
    organization: organization,
  });
};
export const updateOrganisation = (organization: Organization): Promise<number[]> => {
  return fetchData(
    'updateOrganization',
    'PATCH',
    `Не удалось сохранить изменения для ${organization.name}`,
    { organization: organization }
  );
};
export const removeOrg = (id: number): Promise<boolean> => {
  return fetchData('removeOrganization', 'DELETE', `Не удалось удалить организацию`, { id: id });
};
export const fetchContractsByOrgId = (orgId: number): Promise<Contract[]> => {
  return fetchData(`getContractsByOrg/${orgId}`, 'GET', `Не удалось загрузить договора`);
};
export const fetchContractsByOrgIdMonth = (orgId: number, month: string): Promise<Contract> => {
  return fetchData(
    `getContractByOrgIdMonth/${orgId}/${month}`,
    'GET',
    `Не удалось загрузить информацию по договору`
  );
};

export const addContract = (newContract: Contract): Promise<Contract> => {
  return fetchData(`addContracts`, 'PUT', `Не удалось добавить договор`, { contract: newContract });
};

export const updateContract = (contract: Contract): Promise<Contract> => {
  return fetchData(`updateContract`, 'PATCH', `Не удалось обновить договор`, {
    contract: contract,
  });
};


export const removeContract = (id: number): Promise<{ isRemove: boolean }> => {
  return fetchData(`removeContract`, 'DELETE', `Не удалось удалить договор`, { id: id });
};

export const fetchPersonalsByOrgId = (orgId: number): Promise<Personal[]> => {
  return fetchData(`getPersonalByOrgId/${orgId}`, 'GET', `Не удалось загрузить список сотрудников`);
};

export const addPerson = (person: Personal): Promise<Personal> => {
  return fetchData(`addPersonal`, 'PUT', `Не удалось загрузить список сотрудников`, {
    personal: person,
  });
};
export const updatePerson = (person: Personal): Promise<Personal> => {
  return fetchData(`updatePersonal`, 'PATCH', `Не удалось сохранить изменения для пользователя`, {
    personal: person,
  });
};
export const removePerson = (id: number): Promise<{ isRemove: boolean }> => {
  return fetchData(`removePersonal`, 'DELETE', `Не удалось удалить сотрудника`, { id: id });
};

export const fetchServices = (orgId: string): Promise<Service[]> => {
  return fetchData(`getServicesByOrgId/${orgId}`, 'GET', `Не удалось загрузить список организаций`);
};
export const fetchServicesByOrgIdMonth = (orgId: number, month: string): Promise<Service[]> => {
  return fetchData(
    `getServicesByOrgIdMonth/${orgId}/${month}`,
    'GET',
    `Не удалось загрузить услуги`
  );
};

export const addService = (service: Service): Promise<Service> => {
  return fetchData(`addService`, 'PUT', `Не удалось добавить услуги`, { service: service });
};

export const removeService = (id: number): Promise<{ isRemove: boolean }> => {
  return fetchData(`removeService`, 'DELETE', `Не удалось удалить услугу`, { id: id });
};

export const updateService = (service: Service): Promise<Service> => {
  return fetchData(`updateService`, 'PATCH', `Не удалось обновить услугу`, { service: service });
};
