import { Organization, OrganizationCost } from '../helpers/contractTypes';
import style from './SVGCan.module.css';

type ServiseCostByMonthProps = {
  serviseCostByMonth: {
    date: string;
    services: OrganizationCost[];
  }[];
  orgs: Organization[];
};
const SVGCan = ({ serviseCostByMonth, orgs }: ServiseCostByMonthProps) => {
  const scale = 2;
  const width = 1400;
  const height = 350;
  const startX = 40;
  const startY = 10;
  const endX = 1000;
  const endY = 300;

  const maxCost = 1500;
  const costStep = 250;
  const costSubStep = 50;

  const orgColorMap = new Map();
  orgColorMap.set(0, 0);
  orgs.forEach((o, i) => orgColorMap.set(o.id, i + 1));
  const coef = endY / (maxCost * scale);
  const getColHeightFromStart = (cost: number) => endY - cost * coef;
  const getColHeight = (cost: number) => cost * coef;
  const getAxis = () => {
    const arrAxisLine = [];
    const YAxisStep = 50;
    const YAxisSubStep = 10;
    const YAxisSubCount = 5;
    const countLine = endY / YAxisStep;

    const textMiddleFix = 5;
    for (let i = 1; i < countLine; i++) {
      const tmp = endY - YAxisStep * i;
      const subLineArr = [];
      for (let e = 0; e < YAxisSubCount; e++) {
        subLineArr.push(
          <g key={e}>
            <path
              d={`M ${startX} ${tmp + e * YAxisSubStep} L ${endX} ${tmp + e * YAxisSubStep} `}
              className={style.axisSubLine}
            />
            <text x={textMiddleFix} y={tmp + e * YAxisSubStep} className={style.axisSubText}>
              {(costStep * i - e * costSubStep) * scale}
            </text>
          </g>
        );
      }
      arrAxisLine.push(
        <g key={i}>
          {subLineArr.map((e) => e)}
          <path d={`M ${startX} ${tmp} L ${endX} ${tmp} `} className={style.axisLine} />
          <text x="0" y={tmp + textMiddleFix} className={style.axisText}>
            {i * costStep * scale}
          </text>
        </g>
      );
    }

    return (
      <g stroke="#000000ff" fill="none">
        <path d={`M${startX} ${startY} L ${startX} ${endY} L ${endX} ${endY} `} />
        {arrAxisLine.map((e) => e)}
      </g>
    );
  };
  const getColumn = () => {
    const columnWidth = 40;
    const axisXGap = 20;

    const axisXWidth = endX - startX;
    const freeSpace = axisXWidth - (axisXGap * 2 + columnWidth * serviseCostByMonth.length);
    const monthGag = freeSpace / (serviseCostByMonth.length - 1);
    const startXpos = startX + axisXGap;
    const getColumns = (startXpos: number, monthGag: number) => {
      const columns = serviseCostByMonth.map((oc, i) => {
        const colStartXPos = startXpos + i * monthGag + i * columnWidth;
        const maxCol = oc.services.sort((a, b) => b.cost - a.cost)[0].cost;
        const summ = oc.services.reduce((a, c) => a + c.cost, 0);
        return (
          <g key={i}>
            {getOrgColumn(oc.services, colStartXPos)}
            <text x={colStartXPos + 5} y={endY + 20} className={style.axisText}>
              {oc.date}
            </text>
            <text
              x={colStartXPos + 5}
              y={getColHeightFromStart(maxCol) - 30}
              className={style.axisText}
            >
              {summ}
            </text>
          </g>
        );
      });

      return columns;
    };

    const getOrgColumn = (serviceCost: OrganizationCost[], startXpos: number) => {
      const YText = getColHeightFromStart(serviceCost[0].cost) - 10;
      serviceCost.sort((a, b) => b.cost - a.cost);
      let costPosSumm = endY;
      const showZeroValue = false;
      const isNested = false;
      const serviceCostByOtion = showZeroValue
        ? serviceCost
        : serviceCost.filter((sc) => sc.cost !== 0);
      const cols = serviceCostByOtion.map((sc, i, arr) => {
        const colHeight = getColHeightFromStart(sc.cost);
        // console.log(`${colStartYPos} - ${getColHeight(sc.cost)}`);
        if (i !== 0) costPosSumm -= getColHeight(arr[i - 1].cost);
        console.log(costPosSumm);
        return (
          <g
            key={i}
            className={`${style.column} ${style[`column__${orgColorMap.get(parseInt(sc.orgId ?? '0'))}`]}`}
          >
            {isNested ? (
              <>
                <path
                  d={`M ${startXpos} ${endY} L ${startXpos} ${colHeight} L ${startXpos + columnWidth} ${colHeight} L ${startXpos + columnWidth} ${endY}`}
                />
                <text x={startXpos} y={YText} className={style.columnText}>
                  {sc.cost}
                </text>
              </>
            ) : (
              <>
                <path
                  d={`M ${startXpos} ${costPosSumm} L ${startXpos} ${costPosSumm - getColHeight(sc.cost)} L ${startXpos + columnWidth} ${costPosSumm - getColHeight(sc.cost)} L ${startXpos + columnWidth} ${costPosSumm}`}
                />
                <text
                  x={startXpos + columnWidth}
                  y={costPosSumm - getColHeight(sc.cost) + 10}
                  className={style.columnText}
                >
                  {sc.cost}
                </text>
              </>
            )}
          </g>
        );
      });
      return cols;
    };
    return getColumns(startXpos, monthGag);
  };

  const showAllOrgData = (className: string) => {
    [...document.getElementsByClassName(className)].forEach((e) => {
      e.classList.toggle(style.visible);
    });
  };

  const getLegend = () => {
    const axisXGap = 20;
    const axisYGap = 50;
    const textGap = 10;
    const fontSize = 14;
    const startXLegend = endX + axisXGap;
    const startYLegend = startY + axisYGap;
    const legendOrg = orgs.map((o, i) => {
      const y = startYLegend + i * fontSize + i * textGap;
      return (
        <text
          x={startXLegend}
          y={y}
          className={`${style[`column__${orgColorMap.get(o.id)}`]}`}
          key={i}
          onMouseEnter={() => showAllOrgData(style[`column__${orgColorMap.get(o.id)}`])}
          onMouseLeave={() => showAllOrgData(style[`column__${orgColorMap.get(o.id)}`])}
        >
          {o.name}
        </text>
      );
    });
    const y = startYLegend + legendOrg.length * fontSize + legendOrg.length * textGap;
    legendOrg.push(
      <text
        x={startXLegend}
        y={y}
        className={`${style[`column__${orgColorMap.get(0)}`]}`}
        key={orgs.length}
        onMouseEnter={() => showAllOrgData(style[`column__${orgColorMap.get(0)}`])}
        onMouseLeave={() => showAllOrgData(style[`column__${orgColorMap.get(0)}`])}
      >
        Без орги
      </text>
    );
    return <g>{legendOrg.map((l) => l)}</g>;
  };

  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      // viewBox="-300 -300 600 600"
      xmlns="http://www.w3.org/2000/svg"
      // xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      {getAxis()};{getColumn()};{getLegend()};
    </svg>
  );
};

export default SVGCan;
