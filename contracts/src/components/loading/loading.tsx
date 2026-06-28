import style from './loading.module.css';

const Loading = () => {
  return (
    <div className={style.loading} data-testid="loading">
      <svg viewBox="-20 -20 100 80">
        <path
          d="M 0 0 L 15 40 "
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="3"
          style={{ stroke: '#009eb9ff', fill: 'none' }}
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 7.5 20"
            to="360 7.5 20"
            dur="1s"
            id="first"
            begin="0s;fourth.end"
          />
        </path>
        <path
          d="M 15 40 L 30 0"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="3"
          style={{ stroke: '#009eb9ff', fill: 'none' }}
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 22.5 20"
            to="360 22.5 20"
            dur="1s"
            id="second"
            begin="first.end"
          />
        </path>
        <path
          d="M 30 0 L 45 40"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="3"
          style={{ stroke: '#009eb9ff', fill: 'none' }}
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="360 37.5 20"
            to="0 37.5 20"
            dur="1s"
            id="third"
            begin="second.end"
          />
        </path>
        <path
          d="M 45 40 L 60 0"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="3"
          style={{ stroke: '#009eb9ff', fill: 'none' }}
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="360 52.5 20"
            to="0 52.5 20"
            dur="1s"
            id="fourth"
            begin="third.end"
          />
        </path>

        <path
          d="M 15 0 L 22 20"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="3"
          style={{ stroke: '#009eb9ff', fill: 'none' }}
        ></path>
        <path
          d="M 23 20 L 37 20"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="3"
          style={{ stroke: '#009eb9ff', fill: 'none' }}
        ></path>

        <path
          d="M 26 0 L 34 0"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="3"
          style={{ stroke: '#009eb9ff', fill: 'none' }}
        ></path>
        <path
          d="M 11 40 L 19 40"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="3"
          style={{ stroke: '#009eb9ff', fill: 'none' }}
        ></path>
      </svg>
    </div>
  );
};

export default Loading;
