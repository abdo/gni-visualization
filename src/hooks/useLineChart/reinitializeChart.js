const reinitializeChart = ({ data, xAxis, line, x, y }) => {
  x.domain(
    d3.extent(data, (d) => {
      return d.date;
    })
  );
  xAxis.transition().call(d3.axisBottom(x));
  line
    .select('.line')
    .transition()
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
};

export default reinitializeChart;
