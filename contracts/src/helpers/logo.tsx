const Logo = () => {
  return (
    <svg width="10%" height="10%" viewBox="-5 -2 70 45">
      <path
        d="M 0 0 L 15 40 "
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="3"
        style={{ stroke: '#009eb9ff', fill: 'none' }}
      >
        <animate
          attributeName="d"
          from="M -15 0 L 0 40"
          to="M 0 0 L 15 40"
          dur=".5s"
          values="M -15 0 L 0 40;M 0 0 L 15 40"
          repeatCount="1"
        />
      </path>
      <path
        d="M 15 40 L 30 0"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="3"
        style={{ stroke: '#009eb9ff', fill: 'none' }}
      >
        <animate
          attributeName="d"
          from="M 60 40 L 75 0"
          to="M 15 40 L 30 0"
          dur=".5s"
          values="M 60 40 L 75 0;M 15 40 L 30 0"
          repeatCount="1"
        />
      </path>
      <path
        d="M 45 40 L 60 0"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="3"
        style={{ stroke: '#009eb9ff', fill: 'none' }}
      >
        <animate
          attributeName="d"
          from="M 60 40 L 75 0"
          to="M 45 40 L 60 0"
          dur=".5s"
          values="M 60 40 L 75 0;M 45 40 L 60 0"
          repeatCount="1"
        />
      </path>
      <path
        d="M 30 0 L 45 40"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="3"
        style={{ stroke: '#009eb9ff', fill: 'none' }}
      >
        <animate
          attributeName="d"
          from="M -15 0 L 0 40"
          to="M 30 0 L 45 40"
          dur=".5s"
          values="M -15 0 L 0 40;M 30 0 L 45 40"
          repeatCount="1"
        />
      </path>

      <path
        d="M 15 0 L 22 20"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="3"
        style={{ stroke: '#009eb9ff', fill: 'none' }}
      >
        <animate
          attributeName="d"
          from="M 15 0 L 15 0"
          to="M 15 0 L 22 20"
          dur=".5s"
          repeatCount="1"
        />
      </path>
      <path
        d="M 23 20 L 37 20"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="3"
        style={{ stroke: '#009eb9ff', fill: 'none' }}
      >
        <animate
          attributeName="d"
          from="M 23 20 L 23 20"
          to="M 23 20 L 37 20"
          dur=".5s"
          repeatCount="1"
        />
      </path>

      <path
        d="M 26 0 L 34 0"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="3"
        style={{ stroke: '#009eb9ff', fill: 'none' }}
      >
        <animate
          attributeName="d"
          from="M 28 0 L 28 0"
          to="M 26 0 L 34 0"
          dur=".5s"
          repeatCount="1"
        />
      </path>
      <path
        d="M 11 40 L 19 40"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="3"
        style={{ stroke: '#009eb9ff', fill: 'none' }}
      >
        <animate
          attributeName="d"
          from="M 11 40 L 11 40"
          to="M 11 40 L 19 40"
          dur=".5s"
          repeatCount="1"
        />
      </path>
    </svg>
  );
};

export default Logo;
