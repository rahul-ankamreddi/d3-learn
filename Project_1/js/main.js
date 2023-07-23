const SVG = { WIDTH: 400, HEIGHT: 400 };
const MARGIN = { TOP: 10, BOTTOM: 100, RIGHT: 10, LEFT: 100 };
const WIDTH = SVG.WIDTH - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = SVG.HEIGHT - MARGIN.TOP - MARGIN.BOTTOM;

const svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", SVG.WIDTH)
  .attr("height", SVG.HEIGHT);

const g = svg
  .append("g")
  .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`);

// X Label
g.append("text")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 60)
  .attr("text-anchor", "middle")
  .attr("font-size", "15px")
  .text("Months");

// Y Label
g.append("text")
  .attr("x", -HEIGHT / 2)
  .attr("y", -60)
  .attr("transform", `rotate(-90)`)
  .attr("text-anchor", "middle")
  .attr("font-size", "15px")
  .text("Revenue");

d3.csv("data/revenues.csv").then((data) => {
  console.log(data);
  data.forEach((d) => {
    d.revenue = Number(d.revenue);
  });

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.revenue)])
    .range([0, HEIGHT]);

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.month))
    .range([0, WIDTH])
    .paddingInner(0.3)
    .paddingOuter(0.5);

  const leftAxis = d3
    .axisLeft(y)
    .ticks(5)
    .tickFormat((d) => d + " $");
  g.append("g").attr("class", "left axis").call(leftAxis);

  const bottomAxis = d3.axisBottom(x);
  g.append("g")
    .attr("class", "bottom axis")
    .attr("transform", `translate(0,${HEIGHT})`)
    .call(bottomAxis)
    .selectAll("text")
    .attr("x", -5)
    .attr("y", 10)
    .attr("text-anchor", "end")
    .attr("transform", `rotate(-30)`);

  const rects = g.selectAll("rect").data(data);

  rects
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.month))
    .attr("y", (d) => HEIGHT - y(d.revenue))
    .attr("width", x.bandwidth())
    .attr("height", (d) => y(d.revenue))
    .attr("fill", "gray");
});

// PROFITS

// const SVG = { WIDTH: 400, HEIGHT: 400 };
// const MARGIN = { TOP: 10, BOTTOM: 100, RIGHT: 10, LEFT: 100 };
// const WIDTH = SVG.WIDTH - MARGIN.LEFT - MARGIN.RIGHT;
// const HEIGHT = SVG.HEIGHT - MARGIN.TOP - MARGIN.BOTTOM;

// const svg = d3
//   .select("#chart-area2")
//   .append("svg")
//   .attr("width", SVG.WIDTH)
//   .attr("height", SVG.HEIGHT);

// const g = svg
//   .append("g")
//   .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`);

// // X Label
// g.append("text")
//   .attr("x", WIDTH / 2)
//   .attr("y", HEIGHT + 60)
//   .attr("text-anchor", "middle")
//   .attr("font-size", "15px")
//   .text("Months");

// // Y Label
// g.append("text")
//   .attr("x", -HEIGHT / 2)
//   .attr("y", -60)
//   .attr("transform", `rotate(-90)`)
//   .attr("text-anchor", "middle")
//   .attr("font-size", "15px")
//   .text("Profit");

// d3.csv("data/revenues.csv").then((data) => {
//   console.log(data);
//   data.forEach((d) => {
//     d.profit = Number(d.profit);
//   });

//   const y = d3
//     .scaleLinear()
//     .domain([0, d3.max(data, (d) => d.profit)])
//     .range([0, HEIGHT]);

//   const x = d3
//     .scaleBand()
//     .domain(data.map((d) => d.month))
//     .range([0, WIDTH])
//     .paddingInner(0.3)
//     .paddingOuter(0.5);

//   const leftAxis = d3
//     .axisLeft(y)
//     .ticks(5)
//     .tickFormat((d) => d + " $");
//   g.append("g").attr("class", "left axis").call(leftAxis);

//   const bottomAxis = d3.axisBottom(x);
//   g.append("g")
//     .attr("class", "bottom axis")
//     .attr("transform", `translate(0,${HEIGHT})`)
//     .call(bottomAxis)
//     .selectAll("text")
//     .attr("x", -5)
//     .attr("y", 10)
//     .attr("text-anchor", "end")
//     .attr("transform", `rotate(-30)`);

//   const rects = g.selectAll("rect").data(data);

//   rects
//     .enter()
//     .append("rect")
//     .attr("x", (d) => x(d.month))
//     .attr("y", (d) => HEIGHT - y(d.profit))
//     .attr("width", x.bandwidth())
//     .attr("height", (d) => y(d.profit))
//     .attr("fill", "gray");
// });
