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
type AxisLines = { mainLine: AxisLine, subLines?: AxisLine[]}[];
type ColumnText = {textPoint: Point, value: string | number}
type ColumnPart = {points: Point[], textPoint: Point, value: number, colStyle: string}
type Legend = { styleName: string} & ColumnText;
type ColumnInfo = {
  columnSum: ColumnText,
  columnDate: ColumnText,
  columnParts: ColumnPart[]
}
type LineProp = {linePorp: AxisLine, lineStyle?: string, textStyle?: string}

const Line = ({linePorp, lineStyle = style.axisLine, textStyle = style.axisText} : LineProp ) => {
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
const LegendInfo = ({legend}:{legend: Legend}) => {
    const showAllOrgData = (className: string) => {
    [...document.getElementsByClassName(className)].forEach((e) => {
      e.classList.toggle(style.visible);
    });
  };
  return(
        <text
          x={legend.textPoint.x}
          y={legend.textPoint.y}
          className={`${style[legend.styleName]}`}
          onMouseEnter={() => showAllOrgData(style[legend.styleName])}
          onMouseLeave={() => showAllOrgData(style[legend.styleName])}
        >
          {legend.value}
        </text>
  )
}
const ColumnPart = ({points, textPoint, value, colStyle} : ColumnPart) => {
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
const ColumnDate = ({textPoint, value} : ColumnText) => {
  return (
    <text x={textPoint.x} y={textPoint.y} className={style.axisText}>
      {value}
    </text>
  )
}
const Axis = ({axis, arrAxisLines} : {axis: string, arrAxisLines: AxisLines}) => {
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
}
const ColumnSum = ({textPoint, value} : ColumnText) => {
  return (
    <text
      x={textPoint.x} y={textPoint.y}
      className={style.axisText}
    >
      {value}
    </text>
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

  const columnWidth = 40;
  const axisXGap = 20;

  const maxCost = 1500;
  const costStep = 250;
  const costSubStep = 50;

  const showZeroValue = false;
  const isNested = false;
  const axis = `M${startX} ${startY} L ${startX} ${endY} L ${endX} ${endY}`;

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
    const countMainLine = endY / YAxisStep -1;
    
    
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

    return arrAxisLines;
  };

  const getColumnInfo: () => ColumnInfo[] = () => {
    const axisXWidth = endX - startX;
    const freeSpace = axisXWidth - (axisXGap * 2 + columnWidth * serviseCostByMonth.length);
    const monthGap = freeSpace / (serviseCostByMonth.length - 1);
    const startXpos = startX + axisXGap;
    
    const columnsInfo: ColumnInfo[] = serviseCostByMonth.map((oc, i) => {
      const colStartXPos = startXpos + i * monthGap + i * columnWidth;
      const maxCol = oc.services.sort((a, b) => b.cost - a.cost)[0].cost;
      const summ = oc.services.reduce((a, c) => a + c.cost, 0);
      const columnInfo = getOrgColumnParts(oc.services, colStartXPos);
      const dateInfo:ColumnText = {textPoint: {x: colStartXPos + 5, y: endY + 20}, value: oc.date};
      const sumInfo:ColumnText = {textPoint: {x: colStartXPos + 5, y: getColHeightFromStart(maxCol) - 30}, value: summ};
      return {
        columnParts: columnInfo,
        columnDate: dateInfo,
        columnSum: sumInfo,
      }
    });

      return columnsInfo;
  };

  const getOrgColumnParts:(serviceCost: OrganizationCost[], startXpos: number) => ColumnPart[] = (serviceCost: OrganizationCost[], startXpos: number) => {
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
      return {points: colPoints, textPoint:textPoint, value: sc.cost, colStyle:colStyle }
    });
    return cols;
  };

  const getLegendInfo = () => {
  const axisXGap = 20;
    const axisYGap = 50;
    const textGap = 10;
    const fontSize = 14;
    const startXLegend = endX + axisXGap;
    const startYLegend = startY + axisYGap;
    const legendOrg: Legend[] = orgs.map((o, i) => ({
        textPoint: {
          x: startXLegend,
          y: startYLegend + i * fontSize + i * textGap
        },
        value: o.name,
        styleName: `column__${orgColorMap.get(o.id)}`
      })
    );
    const noOrg = {
        textPoint: {
          x: startXLegend,
          y: startYLegend + legendOrg.length * fontSize + legendOrg.length * textGap
        },
        value: 'Без орги',
        styleName: `column__${orgColorMap.get(0)}`
      }
    legendOrg.push(noOrg);

    return legendOrg;
  };

  const columnInfo = getColumnInfo();
  const legendInfo = getLegendInfo();
  const arrAxisLines = getAxis();
  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 1000 300"
      // viewBox=`0 0 ${width} ${height}`
      xmlns="http://www.w3.org/2000/svg"
    >
      {<Axis axis={axis} arrAxisLines={arrAxisLines} />};
      {columnInfo.map((info, i) => {
        const {columnDate, columnParts, columnSum} = info;
        return <g key={i}>
          {columnParts.map((cpi, i) => <ColumnPart points={cpi.points} textPoint={cpi.textPoint} value={cpi.value} colStyle={cpi.colStyle} key={i}/>)}
          <ColumnDate textPoint={columnDate.textPoint} value={columnDate.value} />
          <ColumnSum textPoint={columnSum.textPoint} value={columnSum.value} />
        </g>
      })}
      <g>
        { legendInfo.map((l, i) => <LegendInfo legend={l} key={i} /> )}
      </g>
    </svg>
  );
};

export default SVGCan;