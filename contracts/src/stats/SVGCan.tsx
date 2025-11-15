import { Organization, OrganizationCost } from '../helpers/contractTypes';
import style from './SVGCan.module.css';

type ServiseCostByMonthProps = {
  serviseCostByMonth: {
    date: string;
    services: OrganizationCost[];
  }[];
  orgs: Organization[];
};

type Point = {x: number, y: number};
type Line = {startPoint: Point, endPoint: Point};
type AxisLine = {value: string | number} & Line;
type AxisLines = { mainLine: AxisLine, subLines?: AxisLine[]}[]

const Line = ({linePorp, lineStyle = style.axisLine, textStyle = style.axisText} : {linePorp: AxisLine, lineStyle?: string, textStyle?: string} ) => {
  const textMiddleFix = 5;
  const {startPoint, endPoint} = linePorp;
  const getSVGLine :(start: Point, end: Point)=> string = (start: Point, end: Point) => {
    return `M ${start.x} ${start.y} L ${end.x} ${end.y} `;
  }
  return (
    <g>
      <path
        d={getSVGLine(startPoint, endPoint)}
        className={lineStyle}
      />
      <text x={textMiddleFix} y={startPoint.y} className={textStyle}>
        {linePorp.value}
      </text>
    </g>
  ) 
}

const Column = ({points, textPoint, value, colStyle} : {points: Point[], textPoint: Point, value: number, colStyle: string}) => {
  const colSVGStr = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} L ${points[3].x} ${points[3].y}`
  return (
    <g className={`${style.column} ${colStyle}`}>
       <path d={colSVGStr} />
       <text x={textPoint.x} y={textPoint.y} className={style.columnText}>
         {value}
       </text>
    </g>
  )
}
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

      const showZeroValue = false;
      const isNested = false;

  const orgColorMap = new Map();
  orgColorMap.set(0, 0);
  orgs.forEach((o, i) => orgColorMap.set(o.id, i + 1));
  const coef = endY / (maxCost * scale);
  const getColHeightFromStart = (cost: number) => endY - cost * coef;
  const getColHeight = (cost: number) => cost * coef;

  const getAxis = () => {
    const YAxisStep = 50;
    const YAxisSubCount = 5;
    const YAxisSubStep = YAxisStep / YAxisSubCount;
    const countMainLine = endY / YAxisStep;
    const axis = `M${startX} ${startY} L ${startX} ${endY} L ${endX} ${endY}`;
    
    const getAxisLine = (value: number, startPoint: Point, endPoint: Point) => {
      return {
          value: value,
          startPoint: startPoint,
          endPoint: endPoint
        }
    }
    const getSublines: (startYPos: number, skipZeroValueFix: number) => AxisLine[] = (startYPos: number, skipZeroValueFix: number) => {
      return [...new Array(YAxisSubCount)].map((_el, e) => {
        const yPos = startYPos + e * YAxisSubStep;
        const value: number = (costStep * skipZeroValueFix - e * costSubStep) * scale;
        const startPoint: Point = {x: startX, y: yPos};
        const endPoint: Point = {x: endX, y: yPos};

        return getAxisLine(value, startPoint, endPoint);
      })
    }
    const arrAxisLines: AxisLines =[...new Array(countMainLine)].map( (_al, i) => {
      const skipZeroValueFix = i + 1;
      const sublineYPos = endY - YAxisStep * skipZeroValueFix;
      const subLineArr = getSublines(sublineYPos, skipZeroValueFix);

      return {
        mainLine: getAxisLine(
          skipZeroValueFix * costStep * scale,
          {x: startX, y: sublineYPos},
          {x: endX, y: sublineYPos}
        ),
        subLines: subLineArr
      }
    })      

    return (
      <g className={style.axis}>
        <path d={axis} />
        {arrAxisLines.map( (al, i) => {
          const {subLines, mainLine} = al;
          return  <g key={i}>
           {subLines?.map((sl, i) => <Line linePorp={sl} lineStyle={style.axisSubLine} textStyle={style.axisSubText} key={i} />)}
           <Line linePorp={mainLine} lineStyle={style.axisLine} textStyle={style.axisText} key={i} />
         </g>
        })}
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

      const serviceCostByOtion = showZeroValue
        ? serviceCost
        : serviceCost.filter((sc) => sc.cost !== 0);

      const cols = serviceCostByOtion.map((sc, i, arr) => {
        const colHeight = getColHeightFromStart(sc.cost);
        if (i !== 0) costPosSumm -= getColHeight(arr[i - 1].cost);

        let colPoints: Point[] = [];
        let textPoint = {x: startXpos, y: YText};
        if( isNested ){
          colPoints = [
            {x: startXpos, y: endY},
            {x: startXpos, y: colHeight},
            {x: startXpos + columnWidth, y: colHeight},
            {x: startXpos + columnWidth, y: endY},
          ];
          textPoint = {x: startXpos, y: YText};
        } else {
          colPoints = [
            {x: startXpos, y: costPosSumm},
            {x: startXpos, y: costPosSumm - getColHeight(sc.cost)},
            {x: startXpos + columnWidth, y: costPosSumm - getColHeight(sc.cost)},
            {x: startXpos + columnWidth, y: costPosSumm},
          ];
          textPoint = {x: startXpos + columnWidth, y: costPosSumm - getColHeight(sc.cost) + 10};
        }
        const colStyle = style[`column__${orgColorMap.get(parseInt(sc.orgId ?? '0'))}`];

        return <Column points={colPoints} textPoint={textPoint} value={sc.cost} colStyle={colStyle} key={i}/>
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
