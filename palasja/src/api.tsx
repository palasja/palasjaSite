import { base64ToFile } from "./helper";
import { ActInfo, Contract, Organization, Personal } from "./types";

export const fetchContractsByOrgId = (orgId:  string): Promise<Contract[]> => {
  return fetch(`http://127.0.0.1:3000/getContractsByOrg/${orgId}`, {
  method: 'GET', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  }
  }).then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось загрузить договора. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const addContract = (newContract: Contract) => {
  fetch(`http://127.0.0.1:3000/addContracts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contract: newContract }),
      }).then(async (res) => {
        if (res.status == 200) {
          console.log("Create");
        } 
      });
}
  
export const fetchContractsScan = (orgId:  string) => {
  return fetch(`http://127.0.0.1:3000/contractScan/${orgId}`, {
    method: 'GET',
  })
  .then(async (res) => {
     if (res.status == 200) {
      let str64 = await res.json();
        return base64ToFile(str64, 'application/pdf', 'laod.pdf');
      } else {
        throw new Error(`Не удалось загрузить скар договора. ErrorCode = ${res.status}`);
      }
    
  });
}

export const removeContract = (id: { id: number }): Promise<{ isRemove: boolean }> => {
  return fetch(`http://127.0.0.1:3000/removeContract`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось удалить договор. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const fetchPersonalsByOrgId = (orgId:  string): Promise<Personal[]> => {
  return fetch(`http://127.0.0.1:3000/getPersonalByOrgId/${orgId}`, {
  method: 'GET', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  }
  }
).then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось загрузить список сотрудников. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const removePerson = (id: { id: number }): Promise<{ isRemove: boolean }> => {
  return fetch(`http://127.0.0.1:3000/removePersonal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось удалить сотрудника. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const fetchAllOrganizations = (): Promise<Organization[]> => {
  return fetch(`http://127.0.0.1:3000/getOrganizations`, {
  method: 'GET', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  }
).then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось загрузить список организаций. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};
export const addOrganisation = (organization: Organization) => {
    fetch(`http://127.0.0.1:3000/addOrganization`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ organization: organization }),
    }).then(async (res) => {
      if (res.status == 200) {
        console.log("Create");
      } 
    })
}
export const removeOrg = (id: { id: number }): Promise<{ isRemove: boolean }> => {
  return fetch(`http://127.0.0.1:3000/removeOrganization`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось удалить организацию. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

export const fetchActInfo = (orgId:  string, month: number): Promise<ActInfo> => {
  return fetch(`http://127.0.0.1:3000/getActInfo/${orgId}/${month-1}`, {
  method: 'GET', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  }
  }
).then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error(`Не удалось загрузить информацию по договору. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};
