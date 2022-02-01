// Source: https://dev.to/cagatayunal/how-to-use-css-media-query-breakpoint-in-styled-components-9of
const size = {
  sm: "641px",
  md: "769px",
  lg: "1025px",
  xl: "1281px",
  "2xl": "1537px",
};
const device = {
  sm: `@media (min-width: ${size.sm})`,
  md: `@media (min-width: ${size.md})`,
  lg: `@media (min-width: ${size.lg})`,
  xl: `@media (min-width: ${size.xl})`,
  "2xl": `@media (min-width: ${size["2xl"]})`,
};

const breakpoints = { size, device };
export default breakpoints;
