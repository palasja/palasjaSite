import style from './SVGCan.module.css';

const SVGCan = () => {
  const startX = 40;
  const startY = 10;
  const endX = 500;
  const endY = 300;

  const maxCost = 2000;
  const coef = (endY - startY) / maxCost
  const getAxis = () => {
    const arrAxisLine = [];
    const step = 50;

    for (let i = 1; i < 6; i++) {
      let tmp = startY - step * i;
      arrAxisLine.push(<g>
        <path d={`M ${startX} ${tmp} L ${endX} ${tmp} `} />
        <text x='0' y={tmp} className={style.axisText}>{tmp}</text>
      </g>);
      
    }

    return <g stroke='#000000ff' fill='none'>
        <path d={`M${startX} ${startY} L ${startX} ${endY} L ${endX} ${endY} `} />
        {arrAxisLine.map( e => e)}

      </g>
  }

  const getColumn = () => {
    const columnGap = 10;
    const columnWidth = 15;
    const axisXGap = 20;
    const serviceCost = [
      {name: 'pms', cost: 25},
      {name: 'jkh', cost: 1000},
      {name: 'tcson', cost: 0},
      {name: 'noOrg', cost: 100}
    ];

    const serviseCostByMonth = [
      {month: 'January', services: serviceCost },
      {month: 'February', services: serviceCost },
      {month: 'Mart', services: serviceCost }
    ]
    serviceCost.sort((a, b) => b.cost - a.cost);

    const orgWidthGap = (serviceCost.length - 1 ) * columnGap;
    const orgColWidth = serviceCost.length * columnWidth;
    const orgBlockWidth = orgWidthGap + orgColWidth;
    
    const axisXWidth = endX - startX;
    const freeSpace = axisXWidth - (axisXGap * 2 + (orgBlockWidth * serviceCost.length) );
    const monthGag = freeSpace / (serviseCostByMonth.length -1);
    const cols = serviceCost.map((sc, i) => {
      const startXpos = (startX + axisXGap) + (i * (columnWidth + columnGap));
      const colHeight = endY - sc.cost * coef;
        return <path d={`M ${startXpos} ${endY} L ${startXpos} ${colHeight} L ${startXpos + columnWidth} ${colHeight} L ${startXpos + columnWidth} ${endY}`} />
    });
    return <g fill='#cc0000ff'>
      {cols.map( e => e)}
    </g>
  }
  return(
    <svg 
      width="600px"
      height="600px"
      // viewBox="-300 -300 600 600"
      xmlns="http://www.w3.org/2000/svg"
      // xmlns:xlink="http://www.w3.org/1999/xlink"
      >
      {getAxis()};
      {getColumn()};
    </svg>
  )
}

export default SVGCan;