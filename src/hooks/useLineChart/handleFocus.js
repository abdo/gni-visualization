import formatMoneyAmount from 'helpers/formatMoneyAmount';

const handleFocus = ({ svg, width, height, data, x, y }) => {
  var focus = svg
    .append('g')
    .style('display', 'none')
    .attr('class', 'focusArea');

  var bisectDate = d3.bisector(function (d) {
    return d.date;
  }).left;

  // append the text at the intersection
  focus
    .append('rect')
    .attr('class', 'descContainer')
    .attr('width', '160px')
    .attr('height', '40px');

  focus.append('text').attr('class', 'desc').style('fill', 'none').attr('r', 4);

  // append the rectangle to capture mouse
  svg
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .on('mouseover', function () {
      focus.style('display', null);
    })
    .on('mouseout', function () {
      focus.style('display', 'none');
    })
    .on('mousemove', mousemove);

  function mousemove(event) {
    var x0 = x.invert(d3.pointer(event, this)[0]),
      i = bisectDate(data, x0, 1),
      d0 = data[i - 1],
      d1 = data[i],
      d = x0 - d0.date > d1.date - x0 ? d1 : d0;

    focus
      .select('rect')
      .attr('transform', 'translate(' + x(d.date) + ',' + y(d.value) + ')')
      .text(`${d.value} (${new Date(d.date).getFullYear()})`);

    focus
      .select('text.desc')
      .attr('transform', 'translate(' + x(d.date) + ',' + y(d.value) + ')')
      .text(
        `${formatMoneyAmount(d.value)}$ in ${new Date(d.date).getFullYear()}`
      )
      .attr('x', '8px')
      .attr('y', '25px');
  }
};

export default handleFocus;
