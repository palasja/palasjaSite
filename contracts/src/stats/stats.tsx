import { getServicesCost, MONTH_R } from '../helpers/helper';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getChosenOrganization } from '../redux/slices/orgsSlice';
import { chooseMonth, getChoosenMonth } from '../redux/slices/servicesSlice';
import { useGetOrganizationQuery } from '../redux/slices/organizationRTKSlice';
import { useLazyGetServicesCostQuery, useLazyGetServicesByMonthQuery } from '../redux/slices/servicesRTKSlice';
import { useEffect, useRef } from 'react';
import { Chart } from "react-google-charts";
import { Organization, Service, ServiceCost } from '../helpers/contractTypes';
import { stat } from 'fs';
import SVGCan from './SVGCan';


type ServiceStat = {name: string, cost: number};
// type ServiceStat = Required<Pick<Organization, 'name'> | Pick<ServiceCost, 'cost'>>;
const Stats = () => {
  const dispatch = useAppDispatch();
  const choosenMonth = useAppSelector(getChoosenMonth);
  const [loadServices, { data: services, isLoading: isGetLoading }] =
    useLazyGetServicesByMonthQuery();
  const { data: organizations = [] } = useGetOrganizationQuery();
  const [loadServicesCost, { data: servicesCost, isLoading: isGetLoadingCost }] = useLazyGetServicesCostQuery();
  const chooseMonthHandler = (month: string) => {
    dispatch(chooseMonth(month));
    // loadServices(month);
  };

  let serviseCost:ServiceCost[] = [];
  useEffect(() => {
    if (choosenMonth) {
      loadServices(choosenMonth);
      loadServicesCost();
    }
  }, [choosenMonth]);

  const getOrganizationCost = (services: ServiceCost[]) => {
    const organisationsCost: ServiceStat[] = organizations.map((o, i) => {
      const arr = services.filter((s) => s.orgId == o.id.toString());
      return {name: o.name, cost: getServicesCost(arr)};
    })
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Group By Date
    const costWithoutOrg = getServicesCost(services.filter((s) => s.orgId === null));
    const withoutOrg = {name: 'Без организации', cost: costWithoutOrg}
    organisationsCost.push(withoutOrg);
    organisationsCost.sort( (a, b) => b.cost - a.cost );
    return organisationsCost;
  }

  const data = [
  [
    "Month",
    "Bolivia",
    "Ecuador",
    "Madagascar",
    "Papua New Guinea",
    "Rwanda",
    "Average",
  ],
  ["2004/05", 165, 938, 522, 998, 450, 614.6],
  ["2005/06", 135, 1120, 599, 1268, 288, 682],
  ["2006/07", 157, 1167, 587, 807, 397, 623],
  ["2007/08", 139, 1110, 615, 968, 215, 609.4],
  ["2008/09", 136, 691, 629, 1026, 366, 569.6],
];

const options = {
  title: "Статистика",
  vAxis: { title: "Выплата" },
  hAxis: { title: "Месяц" },
  seriesType: "bars",
  series: { 4: { type: "line" }, 2: { type: "line" } },
};

  return (
    <>
    <SVGCan />
    {servicesCost && <Can serviceStat={getOrganizationCost(servicesCost)}/>}
<Chart
      chartType="ComboChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />

      <select onChange={(e) => chooseMonthHandler(e.target.value)} defaultValue={choosenMonth}>
        {MONTH_R.map((e, i) => {
          return (
            <option value={i} key={i}>
              {e}
            </option>
          );
        })}
      </select>
      {services && (
        <>
          <h2>За месяц {getServicesCost(services)}</h2>
          {organizations.map((o, i) => {
            const arr = services.filter((s) => s.orgId == o.id.toString());
            return (
              <p key={i}>
                {o.name} - {getServicesCost(arr)}
              </p>
            );
          })}
          <p>Без организаций - {getServicesCost(services.filter((s) => s.orgId === null))}</p>
        </>
      )}
    </>
  );
};

type CanProps = {serviceStat: ServiceStat[]}
const Can = ({serviceStat}: CanProps) => {
  console.log(serviceStat);
  const canvasRef = useRef(null);
  const width = 500;
  const height = 300; 
  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const coef = 5;
    const axisStart = 10;
    const axisX = width - axisStart;
    const axisY = height - axisStart;
    const columnWidth = 30;  
    const delimStep = height / coef;
    let jkh = 1000;
    let pms = 20;
    let without = 50;

    
    //Our first draw
    context.fillStyle = '#000000'
    context.strokeRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
    context.moveTo(axisStart, axisStart);
    context.lineTo(axisStart, axisY);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.lineTo(axisStart, axisY);
    context.lineTo(axisX, axisY);
    context.closePath();
    context.stroke();

    for (let i = 1; i < delimStep; i++) {
      context.fillStyle = '#a3a3a3ff'   
      context.beginPath();
      context.moveTo(axisStart, axisY - delimStep * i);
      context.lineTo(axisX, axisY - delimStep * i);
      context.closePath();
      context.stroke();
    }

    context.fillStyle = '#ff0000ff';
    serviceStat.forEach(stat => {
      
    });
    context.fillRect(20, 290 - jkh / coef, columnWidth, jkh / coef );
    context.fillStyle = '#00fc71ff'
    context.fillRect(20, 290 - pms / coef, columnWidth, pms / coef );
    context.fillStyle = '#3700ffff'
    context.fillRect(20, 290 - without / coef, columnWidth, without / coef );

  }, [])

  return (
    <canvas ref={canvasRef} width={width} height={height}></canvas>
  )
}


export default Stats;
