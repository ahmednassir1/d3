import React, { useEffect } from 'react';
import * as d3 from 'd3';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import './App.css';

const App = () => {
  useEffect(() => {
    const url =
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

    d3.json(url).then((data) => {
      const dataset = data.data;

      const svgWidth = '100%'; // Make the SVG container responsive
      const svgHeight = 400;
      const padding = 40;

      const xScale = d3
        .scaleTime()
        .domain([d3.min(dataset, (d) => new Date(d[0])), d3.max(dataset, (d) => new Date(d[0]))])
        .range([padding, svgWidth - padding]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset, (d) => d[1])])
        .range([svgHeight - padding, padding]);

      const svg = d3.select("#chart").attr("width", svgWidth).attr("height", svgHeight);

      // Rest of the D3 code...

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      svg
        .append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0, ${svgHeight - padding})`)
        .call(xAxis);

      svg
        .append("g")
        .attr("id", "y-axis")
        .attr("transform", `translate(${padding}, 0)`)
        .call(yAxis);
    });
  }, []);

  return (
    <div className="container">
    <div className="row">
      <div className="col">
        <div className="chart-container">
          <h1 id="title">U.S. GDP Data</h1>
          <svg id="chart"></svg>
          <div id="tooltip"></div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default App;
