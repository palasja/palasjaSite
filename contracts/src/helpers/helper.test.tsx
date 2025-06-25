import { downloadFile, getServicesCost, getServicesCostWithNDS, getServicesCostWithNDS_47, getShortName } from "./helper";
import { Personal, Service } from "./contractTypes";
import { NDS } from "./constants";
describe('calculate services cost', () => {
  it('empty services', () => {
    const services: Service[] = [];
    expect(getServicesCost(services)).eq(0);
  })
  it('empty services', () => {
    const services = [
      {cost: 10, count: 4}, 
      {cost: 20, count: 3}
    ] as Service[];
    
    expect(getServicesCost(services)).eq(100);
  })
})

describe('calculate services cost with NDS',() => {
  it('empty services for NDS', () => {
    const services: Service[] = [];
    expect(getServicesCostWithNDS(services)).eq(0);
  })

  it('cost with NDS', () =>{
    const services = [
      {cost: 10, count: 4},  
      {cost: 20, count: 3}
    ] as Service[];

    expect(getServicesCostWithNDS(services)).eq(100 * (NDS / 100) + 100);
  })
})

describe('cost with NDW by 47 law', () => {
  it('empty services 47 law', () =>{
    const services: Service[] = [];
    expect(getServicesCostWithNDS(services)).eq(0);
  })
  it('low sallary < 192', () => {
    const services = [
      {cost: 10, count: 4},  
      {cost: 20, count: 3}
    ] as Service[];

    expect(getServicesCostWithNDS_47(services)).eq(101);
  })
    it('middle sallary > 192 and < 1164', () => {
    const services = [
      {cost: 10, count: 8},  
      {cost: 20, count: 6}
    ] as Service[];

    expect(getServicesCostWithNDS_47(services)).eq(201.12);
  })
  it('sallary > 1164', () => {
    const services = [
      {cost: 100, count: 8},  
      {cost: 200, count: 6}
    ] as Service[];

    expect(getServicesCostWithNDS_47(services)).eq(2000 * (NDS / 100) + 2000);
  })
})

describe('short name', () => {
  it('undefined person', () => {
    expect(getShortName(undefined)).toBe('')
  })

  it('valid name', () => {
    const prson = {firstName: 'Иван', middleName: 'Александрович', lastName: 'Якубенко' } as Personal;
    expect(getShortName(prson)).toBe('И. А. Якубенко')
  })
})

describe('downloadFile load file', () => {
  it('call create URL', () => {
    const test = () => 'blob:mock-url'
    URL.createObjectURL = vi.fn(() => '');
    URL.revokeObjectURL = vi.fn(() => '');
    using spyCreateObject = vi.spyOn(URL, 'createObjectURL');
    downloadFile({ scan: 'string' }, 'application/pdf', 'laod.pdf');
    expect(spyCreateObject).toHaveBeenCalled();
  })

  it('call remove URL', () => {
    URL.createObjectURL = vi.fn(() => '');
    URL.revokeObjectURL = vi.fn(() => '');
    using spyRevokeObjectURL = vi.spyOn(URL, 'revokeObjectURL');
    downloadFile({ scan: 'string' }, 'application/pdf', 'laod.pdf');
    expect(spyRevokeObjectURL).toHaveBeenCalled();
  })
})