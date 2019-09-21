//import { select, csv } from 'https://unpkg.com/d3@5.9.1/dist/d3.min.js';

const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
    
    const xValue = d => d.Population;
    const yValue = d => d.Country;
    const margin = { top: 50, right: 50, bottom: 60, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerheight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0, innerWidth]);

    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerheight])
        .padding(0.1);

    const g = svg.append('g')
        .attr('transform', `translate( ${margin.left}, ${margin.top} )`);
    
    const xAxisFormat = number => d3.format('.3s')(number).replace('G', 'B');
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisFormat)
        .tickSize(-innerheight);

    g.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll('.domain .tick line')
        .remove();



    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate( 0, ${innerheight} )`);

    xAxisG.select('.domain').remove();

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 50)
        .attr('x', innerWidth/2)
        .attr('fill', 'black')
        .text('Population');

    g.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth());
    
    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .attr('x', 100)
        .text('Top 10 Most Populous Countries');

};

d3.csv('data.csv').then(data => {
    data.forEach(d => {
        d.Population = +d.Population * 1000;
    });
    console.log(data);
    render(data)
});

//document.getElementById("message-element").textContent ="Hello000000000000000";