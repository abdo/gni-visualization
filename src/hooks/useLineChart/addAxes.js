const addAxes = ({ svg, data, width, height }) => {
  // Add X axis --> it is a date format
  const x = d3
    .scaleTime()
    .domain(
      d3.extent(data, (d) => {
        return d.date;
      })
    )
    .range([0, width]);
  const xAxis = svg
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, (d) => {
        return +d.value;
      }),
    ])
    .range([height, 0]);
  const yAxis = svg.append('g').call(d3.axisLeft(y));

  return { xAxis, yAxis, x, y };
};

export default addAxes;
