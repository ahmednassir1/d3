import React, { useEffect } from 'react';
import * as d3 from 'd3';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  useEffect(() => {
    const url =
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

    d3.json(url).then((data) => {
      const dataset = data.data;

      const containerWidth = document.querySelector(".container").offsetWidth;
      const svgHeight = 400;
      const padding = 40;

      const xScale = d3
        .scaleTime()
        .domain([d3.min(dataset, (d) => new Date(d[0])), d3.max(dataset, (d) => new Date(d[0]))])
        .range([padding, containerWidth - padding]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset, (d) => d[1])])
        .range([svgHeight - padding, padding]);

      const svg = d3.select("#chart").attr("width", containerWidth).attr("height", svgHeight);

      // Create and style bars
      svg
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("data-date", (d) => d[0])
        .attr("data-gdp", (d) => d[1])
        .attr("x", (d) => xScale(new Date(d[0])))
        .attr("y", (d) => yScale(d[1]))
        .attr("width", (containerWidth - 2 * padding) / dataset.length)
        .attr("height", (d) => svgHeight - padding - yScale(d[1]))
        .attr("fill", "#6fa5fc") // Light blue color
        .on("mouseover", (event, d) => {
          const tooltip = d3.select("#tooltip");
          tooltip.style("display", "block");
          tooltip.html(`${d[0]}<br>${d[1]} Billion USD`).attr("data-date", d[0]);
        })
        .on("mouseout", () => {
          const tooltip = d3.select("#tooltip");
          tooltip.style("display", "none");
        });

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
        <div className="col-12">
          <h1 id="title">U.S. GDP Data</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <svg id="chart"></svg>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div id="tooltip"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
