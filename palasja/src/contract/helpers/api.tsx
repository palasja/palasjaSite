import { base64ToFile } from './helper';
import { ActInfo, Contract, Organization, Personal, Service, User } from './contractTypes';

const API_SERVER = 'http://127.0.0.1:3000';
const APP_URL = 'http://127.0.0.1:3001';

export const fetchSignIn = (data: User): Promise<number> => {
  return fetch(`${API_SERVER}/signIn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    return res.status;
  });
};

export const fetchLogIn = async (data: User): Promise<number> => {
  const res = await fetch(`${API_SERVER}/logIn`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.status;
};
export const fetchСheckAuth = async (): Promise<number> => {
  const res = await fetch(`${API_SERVER}/checkAuth`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.status;
};

export const fetchLogOut = async (): Promise<number> => {
  const res = await fetch(`${API_SERVER}/logout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.status;
};
export const fetchAllOrganizations = (): Promise<Organization[]> => {
  return fetch(`${API_SERVER}/getOrganizations`, {
    method: 'GET', // or 'PUT'
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else if (res.status == 401) {
        window.location.href = `${APP_URL}/logout`;
      } else {
        throw new Error(`Не удалось загрузить список организаций. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};
export const addOrganisation = (organization: Organization) => {
  fetch(`${API_SERVER}/addOrganization`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ organization: organization }),
  }).then(async (res) => {
    if (res.status == 200) {
      console.log('Create');
    } else if (res.status == 401) {
      window.location.href = `${APP_URL}/logout`;
    }
  });
};
export const updateOrganisation = (organization: Organization) => {
  fetch(`${API_SERVER}/updateOrganization`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ organization: organization }),
  }).then(async (res) => {
    if (res.status == 200) {
      console.log('Create');
    } else if (res.status == 401) {
      window.location.href = `${APP_URL}/logout`;
    }
  });
};
export const removeOrg = (id: { id: number }): Promise<{ isRemove: boolean }> => {
  return fetch(`${API_SERVER}/removeOrganization`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else if (res.status == 401) {
        window.location.href = `${APP_URL}/logout`;
      } else {
        throw new Error(`Не удалось удалить организацию. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};
export const fetchContractsByOrgId = (orgId: string): Promise<Contract[]> => {
  return fetch(`${API_SERVER}/getContractsByOrg/${orgId}`, {
    method: 'GET', // or 'PUT'
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else if (res.status == 401) {
        window.location.href = `${APP_URL}/logout`;
      } else {
        throw new Error(`Не удалось загрузить договора. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const addContract = (newContract: Contract) => {
  fetch(`${API_SERVER}/addContracts`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contract: newContract }),
  }).then(async (res) => {
    if (res.status == 200) {
      console.log('Create');
    } else if (res.status == 401) {
      window.location.href = `${APP_URL}/logout`;
    }
  });
};

export const updateContract = (contract: Contract) => {
  fetch(`${API_SERVER}/updateContract`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contract: contract }),
  }).then(async (res) => {
    if (res.status == 200) {
      console.log('Create');
    } else if (res.status == 401) {
      window.location.href = `${APP_URL}/logout`;
    }
  });
};

export const fetchContractsScan = (orgId: string) => {
  return fetch(`${API_SERVER}/contractScan/${orgId}`, {
    method: 'GET',
    credentials: 'include',
  }).then(async (res) => {
    if (res.status == 200) {
      const str64 = await res.json();
      return base64ToFile(str64, 'application/pdf', 'laod.pdf');
    } else if (res.status == 401) {
      window.location.href = `${APP_URL}/logout`;
    } else {
      throw new Error(`Не удалось загрузить скар договора. ErrorCode = ${res.status}`);
    }
  });
};

export const removeContract = (id: { id: number }): Promise<{ isRemove: boolean }> => {
  return fetch(`${API_SERVER}/removeContract`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else if (res.status == 401) {
        window.location.href = `${APP_URL}/logout`;
      } else {
        throw new Error(`Не удалось удалить договор. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const fetchPersonalsByOrgId = (orgId: string): Promise<Personal[]> => {
  return fetch(`${API_SERVER}/getPersonalByOrgId/${orgId}`, {
    method: 'GET', // or 'PUT'
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else if (res.status == 401) {
        window.location.href = `${APP_URL}/logout`;
      } else {
        throw new Error(`Не удалось загрузить список сотрудников. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const addPerson = (person: Personal) => {
  fetch(`${API_SERVER}/addPersonal`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ personal: person }),
  }).then(async (res) => {
    if (res.status == 200) {
      console.log('Create');
    }
  });
};
export const updatePerson = (personal: Personal) => {
  fetch(`${API_SERVER}/updatePersonal`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ personal: personal }),
  }).then(async (res) => {
    if (res.status == 200) {
      console.log('Create');
    } else if (res.status == 401) {
      window.location.href = `${APP_URL}/logout`;
    }
  });
};
export const removePerson = (id: { id: number }): Promise<{ isRemove: boolean }> => {
  return fetch(`${API_SERVER}/removePersonal`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else if (res.status == 401) {
        window.location.href = `${APP_URL}/logout`;
      } else {
        throw new Error(`Не удалось удалить сотрудника. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const fetchServices = (orgId: string): Promise<Service[]> => {
  return fetch(`${API_SERVER}/getServiceByOrgId/${orgId}`, {
    method: 'GET', // or 'PUT'
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else if (res.status == 401) {
        window.location.href = `${APP_URL}/logout`;
      } else {
        throw new Error(`Не удалось загрузить список организаций. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};
export const addService = (service: Service) => {
  fetch(`${API_SERVER}/addService`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ service: service }),
  }).then(async (res) => {
    if (res.status == 200) {
      console.log('Create');
    } else if (res.status == 401) {
      window.location.href = `${APP_URL}/logout`;
    }
  });
};

export const removeService = (id: { id: number }): Promise<{ isRemove: boolean }> => {
  return fetch(`${API_SERVER}/removeService`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else if (res.status == 401) {
        window.location.href = `${APP_URL}/logout`;
      } else {
        throw new Error(`Не удалось удалить услугу. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const updateService = (service: Service) => {
  fetch(`${API_SERVER}/updateService`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ service: service }),
  }).then(async (res) => {
    if (res.status == 200) {
      console.log('Create');
    } else if (res.status == 401) {
      window.location.href = `${APP_URL}/logout`;
    }
  });
};

export const fetchActInfo = (orgId: string, month: string): Promise<ActInfo> => {
  return fetch(`${API_SERVER}/getActInfo/${orgId}/${Number(month) - 1}`, {
    method: 'GET', // or 'PUT'
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else if (res.status == 401) {
        window.location.href = `${APP_URL}/logout`;
      } else {
        throw new Error(`Не удалось загрузить информацию по договору. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};
