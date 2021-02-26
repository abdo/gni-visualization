const addLine = ({ svg, data, brush, x, y }) => {
  // Create the line variable: where both the line and the brush take place
  const line = svg.append('g').attr('clip-path', 'url(#clip)');

  // Add the line
  line
    .append('path')
    .datum(data)
    .attr('class', 'line') // I add the class line to be able to modify this line later on.
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1.5)
    .attr(
      'd',
      d3
        .line()
        .x((d) => {
          return x(d.date);
        })
        .y((d) => {
          return y(d.value);
        })
    );
  // Add the brushing
  line.append('g').attr('class', 'brush').call(brush);
  return line;
};

export default addLine;
