

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { DataProps } from "../../interface";

export interface GraphProps {
  data: Array<DataProps>;
}

export function Graph({ data }: GraphProps) {
  const graphRef = useRef();

  useEffect(() => {
    if (!data) return;

    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const legendWidth = 300; // Width of the legend

    const svg = d3
      .select(graphRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right + legendWidth) // Add legend width to SVG width
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([0, 55]).range([0, width]);
    const y = d3.scaleLinear().domain([0, 50]).range([height, 0]);

    const xAxis = d3.axisBottom(x).ticks(7);
    const yAxis = d3.axisLeft(y);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg
      .append('text')
      .attr('class', 'x-label')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10) // Adjusted the position for better visibility
      .attr('text-anchor', 'middle')
      .text('Time');

    svg
      .append('g')
      .call(yAxis);

    svg
      .append('text')
      .attr('class', 'y-label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 10) // Adjusted the position for better visibility
      .attr('text-anchor', 'middle')
      .text('Value');

    const colors = d3.scaleOrdinal(d3.schemeCategory10);


    data.forEach((metricData) => {
      const line = d3
        .line()
        .x((d, i) => x(metricData.times[i]))
        .y((d) => y(d))
        .curve(d3.curveMonotoneX);

      svg
        .append('path')
        .datum(metricData.values)
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', colors(metricData.label))
        .attr('stroke-width', 2)
        .attr('d', line);
    });

    const legend = svg
      .selectAll('.legend')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (_, i) => `translate(${width + margin.right},${i * 20})`); // Position legend to the right

    legend
      .append('rect')
      .attr('x', 0)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', (d) => colors(d.label));

    legend
      .append('text')
      .attr('x', 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text((d) => d.label);

    return () => {
      d3.select(graphRef.current).select('svg').remove();
    };
  }, [data]);

  return <div ref={graphRef}></div>;
}

export default Graph;
