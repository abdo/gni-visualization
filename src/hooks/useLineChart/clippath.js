const clippath = ({ svg, width, height }) => {
  // Add a clipPath: everything out of this area won't be drawn.
  svg
    .append('defs')
    .append('svg:clipPath')
    .attr('id', 'clip')
    .append('svg:rect')
    .attr('width', width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0);
};

export default clippath;
