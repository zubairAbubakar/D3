//declare svg variables
const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
    
    //declare chart variables 
    const title = 'Cars: Horsepoower Vs Weight';
    const xValue = d => d.weight;
    const xAxisLabel = 'Horsepower';

    const yValue = d => d.acceleration;
    const yAxisLabel = 'Weight';

    const margin = { top: 60, right: 50, bottom: 60, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerheight = height - margin.top - margin.bottom;
    const circleRadius = 10;

    //map x axis  data to x axis
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    //map y axis  data to y axis
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([0, innerheight]);

    const g = svg.append('g')
        .attr('transform', `translate( ${margin.left}, ${margin.top} )`);
    
    const xAxisFormat = number => d3.format('.3s')(number).replace('G', 'B');
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisFormat)
        .tickSize(-innerheight);
    
    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth);

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain .tick line')
        .remove();

    //add Y axis label to chart
    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -50)
        .attr('x', -innerheight / 2 )
        .attr('fill', 'black')
        .attr('transform', `rotate( -90 )`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate( 0, ${innerheight} )`);

    xAxisG.select('.domain').remove();

    //add X axis label to chart
    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 50)
        .attr('x', innerWidth/2)
        .attr('fill', 'black')
        .text(xAxisLabel);

    g.selectAll('circle').data(data)
        .enter().append('circle')
            .attr('cy', d => yScale(yValue(d)))
            .attr('cx', d => xScale(xValue(d)))
            .attr('r', circleRadius);
    
    //add chart title
    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .attr('x', 100)
        .text(title);

};

//load csv data and convert required data to numbers
d3.csv('https://vizhub.com/curran/datasets/auto-mpg.csv').then(data => {
    data.forEach(d => {
        d.mpg = +d.mpg;
        d.cylinders = +d.cylinders;
        d.displacement = +d.displacement;
        d.horsepower = +d.horsepower;
        d.weight = +d.weight;
        d.acceleration = +d.acceleration;
        d.year = +d.year;
    });
    console.log(data);
    render(data)
});
