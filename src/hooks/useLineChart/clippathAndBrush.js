const clippathAndBrush = ({ svg, width, height, updateChart }) => {
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

  // Add brushing
  const brush = d3
    .brushX() // Add the brush feature using the d3.brush function
    .extent([
      [0, 0],
      [width, height],
    ]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
    .on('end', updateChart); // Each time the brush selection changes, trigger the 'updateChart' function

  return { brush };
};

export default clippathAndBrush;
