import addAxes from './addAxes';
import addLine from './addLine';
import clippathAndBrush from './clippathAndBrush';
import reinitializeChart from './reinitializeChart';
import { useEffect } from 'react';

const useLineChart = ({ containerRef, data, width: passedWidth = 460 }) => {
  useEffect(() => {
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = passedWidth - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    d3.select('#line-chart-svg').remove();

    // Append new svg
    const svg = d3
      .select(containerRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('id', 'line-chart-svg')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    //Read the data
    d3.csv(data).then((allData) => {
      const chosenRow = allData.find((row) => row['Country Name'] === 'World');
      const data = Object.entries(chosenRow)
        .filter(
          (columnData) =>
            columnData.every((value) => value) &&
            !Number.isNaN(Number(columnData[0]))
        )
        .map((columnData) => {
          const year = d3.timeParse('%Y')(columnData[0]);
          return {
            date: year,
            value: columnData[1],
          };
        });

      const { xAxis, x, y } = addAxes({ svg, data, width, height });

      var { brush } = clippathAndBrush({ svg, width, height, updateChart });

      const line = addLine({ svg, data, brush, x, y });

      // A function that set idleTimeOut to null
      let idleTimeout;
      const idled = () => {
        idleTimeout = null;
      };
      // A function that update the chart for given boundaries
      function updateChart(event) {
        // What are the selected boundaries?
        const extent = event.selection;
        // If no selection, back to initial coordinate. Otherwise, update X axis domain
        if (!extent) {
          if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350)); // This allows to wait a little bit
          x.domain([4, 8]);
        } else {
          x.domain([x.invert(extent[0]), x.invert(extent[1])]);
          line.select('.brush').call(brush.move, null); // This remove the grey brush area as soon as the selection has been done
        }
        // Update axis and line position
        xAxis.transition().duration(1000).call(d3.axisBottom(x));
        line
          .select('.line')
          .transition()
          .duration(1000)
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
      }
      // If user double click, reinitialize the chart
      svg.on('dblclick', () => {
        reinitializeChart({ data, xAxis, line, x, y });
      });
    });
  }, []);
};

export default useLineChart;
