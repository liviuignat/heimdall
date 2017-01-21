import * as React from 'react';
import {SvgIcon} from 'universal/common/components';

const defaultIconStyle = {
  height: 25,
  width: 45,
  marginTop: 6,
  pointer: 'cursor',
};

const path = `M90 1683 c-19 -10 -45 -33 -57 -52 l-23 -34 0 -639 0 -640 26 -66
  c15 -37 33 -72 40 -78 8 -6 14 -16 14 -21 0 -16 75 -80 122 -104 96 -49 86
  -49 1023 -49 l880 0 -150 150 -150 150 -710 0 c-692 0 -711 1 -743 20 -18 11
  -37 32 -42 46 -6 15 -10 226 -10 530 l0 504 1134 0 c1018 0 1136 -2 1150 -16
  30 -30 16 -304 -16 -304 -4 0 -8 -7 -8 -15 0 -9 -8 -19 -17 -22 -10 -4 -20 -9
  -23 -12 -3 -3 -27 -17 -55 -31 l-50 -25 -912 -3 -913 -2 0 -161 0 -161 645 3
  645 4 327 -327 328 -328 228 0 c144 0 227 4 225 10 -1 5 -143 153 -315 328
  l-312 319 63 6 c220 21 426 201 471 414 17 79 20 256 5 333 -23 122 -88 210
  -190 259 l-55 26 -1270 3 c-1194 2 -1272 1 -1305 -15z`;

export const AppIcon = (props) => (
  <SvgIcon {...props} width="300pt" height="170pt" viewBox="0 0 300 170" version="1.1">
    <g transform="translate(0.000000,170.000000) scale(0.100000,-0.100000)" stroke="none">
      <path d={path} />
    </g>
  </SvgIcon>
);

export default ({iconStyle = defaultIconStyle}) => {
  const css = require('./AppLogo.scss');
  return (
    <div className={css.AppLogo}>
      <div className={css.AppLogo_icon}><AppIcon style={iconStyle} /></div>
      <span className={css.AppLogo_text}>EVER<b>REAL</b></span>
    </div>
  );
};
