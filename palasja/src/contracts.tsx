import { useEffect, useState } from 'react'
import './App.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { Contract } from './types';


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
        throw new Error(`Не удалось загрузить отзывы. ErrorCode = ${res.status}`);
      }
    })
    .catch((err: Error) => console.log(err.message));
};

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

function base64ToFile(base64String:{scan: string}, mimeType: string, fileName: string) {
            // Remove data URL scheme if present
            console.log(base64String);
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
        }

 const onSubmit: SubmitHandler<Contract> = async (data) => {
    //@ts-ignore
    data.scan = await toBase64(data.scan[0]);
    fetch(`http://127.0.0.1:3000/addContracts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contract: data }),
    }).then(async (res) => {
      if (res.status == 200) {
        console.log("Create");
      } 
    })
  };
const fetchContracts = (orgId:  string): Promise<Contract[]> => {
  return fetch(`http://127.0.0.1:3000/getContractsByOrg/${orgId}`, {
  method: 'GET', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  }
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

const fetchContractsScan = (orgId:  string) => {
  return fetch(`http://127.0.0.1:3000/contractScan/${orgId}`, {
    method: 'GET',
  })
  .then(async (res) => {
     if (res.status == 200) {
      let str64 = await res.json();
        return base64ToFile(str64, 'application/pdf', 'laod.pdf');
      } else {
        throw new Error(`Не удалось загрузить список организаций. ErrorCode = ${res.status}`);
      }
    
  });
}

type contractProps = {
  orgId: string
}
function Contracts({orgId}: contractProps) {
  const { register, handleSubmit } = useForm<Contract>();
  // const [org, setOrg] = useState<Organization>();
  const [contracts, setContracts] = useState<Contract[]>([]);
  useEffect(() => {
      const getContracts = () => {
        fetchContracts(orgId).then((orgs) => setContracts(orgs));
      };
      getContracts();
  }, []);
  return (
    <>
      <h3>Contracts</h3>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div >
            <input value={orgId} type='hidden'
              {...register('orgId', { required: true, maxLength: 20 })}
            />
            <label htmlFor="number">
              Number
            </label>
            <input defaultValue={123}
              {...register('number', { required: true, maxLength: 20 })}
            />
          </div>
          <div >
            <label htmlFor="signDate">
              SignDate
            </label>
            <input
            defaultValue={'2025-05-05'}
              type='date'
              {...register('signDate', { required: true})}
            />
          </div>
          <div >
            <label htmlFor="startDate">
              StartDate
            </label>
            <input
            defaultValue={'2025-05-05'}
              type='date'
              {...register('startDate', { required: true})}
            />
          </div>
          <div >
            <label htmlFor="endDate">
              EndDate
            </label>
            <input
            defaultValue={'2025-05-05'}
              type='date'
              {...register('endDate', { required: true})}
            />
            <input
              type='file'
              {...register('scan')}
            />
          </div>
          <input type="submit" value="Create Contract" />
        </form>
            <ul>const fileURL = URL.createObjectURL(blob);
        {contracts.length == 0 ? '': 
        contracts.map((con, i) => {
          return <li key={i}>{con.number}
            <button onClick={() => fetchContractsScan(con.id)}>Scan</button>
            {/* <a href={`data:application/octet-stream;charset=utf-8;blob,${con.scan}`}>Scan</a> */}
                            <button
                    onClick={async () => {
                      await removeContract({ id: Number(con.id) });
                    }}
                  >
                    Удалить
                  </button>
          </li>
        })}
      </ul>
    </>
  )
}

export default Contracts
