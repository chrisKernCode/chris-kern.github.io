let w = 768,
  h = 1024,
  circleWidth = 5;

let palette = {
  lightgray: "#E5E8E8",
  gray: "#708284",
  mediumgray: "#536870",
  blue: "#3B757F",
};

let colors = d3.scale.category20();

let nodes = [
  { name: "Projekte" },
  { name: "Java", target: [0] },
  { name: "Jakarta EE", target: [0, 1], value: 65},
  { name: "Todo App", target: [0, 1, 2], value: 85, url: "github.com/chrisKernCode/Jakarta-EE-Todo-App" },
  { name: "Booking App", target: [0, 1], value: 85, url: "github.com/chrisKernCode/Hotel-Reservation-Console-App" },
  { name: "Spring", target: [0] },
  { name: "Gästebuch", target: [0, 1, 5], value: 90, url: "github.com/chrisKernCode/Guestbook-Spring-Microservices" },
  { name: "Python", target: [0] },
  { name: "Quiz", target: [0, 7], value: 85, url: "github.com/chrisKernCode/Fill-In-The-Blanks-Quiz" },
];

let links = [];

for (let i = 0; i < nodes.length; i++) {
  if (nodes[i].target !== undefined) {
    for (let x = 0; x < nodes[i].target.length; x++)
      links.push({
        source: nodes[i],
        target: nodes[nodes[i].target[x]],
      });
  }
}

let myChart = d3
  .select("body")
  .append("div")
  .classed("svg-container", true)

  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 768 1024")
  .classed("svg-content-responsive", true);

let force = d3.layout
  .force()
  .nodes(nodes)
  .links([])
  .gravity(0.1)
  .charge(-1000)
  .size([w, h]);

let link = myChart
  .selectAll("line")
  .data(links)
  .enter()
  .append("line")
  .attr("stroke", palette.lightgray)
  .attr("strokewidth", "1");

let node = myChart
  .selectAll("circle")
  .data(nodes)
  .enter()
  .append("g")
  .call(force.drag);

node
  .append("circle")
  .attr("cx", function (d) {
    return d.x;
  })
  .attr("cy", function (d) {
    return d.y;
  })
  .attr("r", function (d, i) {
    // console.log(d.value);
    if (i > 0) {
      return circleWidth + d.value;
    } else {
      return circleWidth + 45;
    }
  })
  .attr("fill", function (d, i) {
    if (i > 0) {
      return colors(i);
    } else {
      return "#fff";
    }
  })
  .attr("strokewidth", function (d, i) {
    if (i > 0) {
      return "0";
    } else {
      return "2";
    }
  })
  .attr("stroke", function (d, i) {
    if (i > 0) {
      return "";
    } else {
      return "black";
    }
  })
  .on("click", click)
  .on("mouseover", function (d, i) {
    if (i > 0 &&  d.url !== undefined) {
      d3.select(this).style("opacity", 0.9).style("cursor", "pointer");
    }
  })
  .on("mouseout", function (d) {
    d3.select(this).style("opacity", 1);
  });

force.on("tick", function (e) {
  node.attr("transform", function (d, i) {
    return "translate(" + d.x + "," + d.y + ")";
  });

  link
    .attr("x1", function (d) {
      return d.source.x;
    })
    .attr("y1", function (d) {
      return d.source.y;
    })
    .attr("x2", function (d) {
      return d.target.x;
    })
    .attr("y2", function (d) {
      return d.target.y;
    });
});

node
  .append("text")
  .text(function (d) {
    return d.name;
  })
  .attr("font-family", "Raleway", "Helvetica Neue, Helvetica")
  .attr("fill", function (d, i) {
    // console.log(d.value);
    if (i > 0 && d.value < 90) {
      return palette.mediumgray;
    } else if (i > 0 && d.value > 91) {
      return palette.lightgray;
    } else {
      return palette.blue;
    }
  })
  .attr("text-anchor", function (d, i) {
    return "middle";
  })
  .attr("font-size", function (d, i) {
    if (i > 0) {
      return "3.5em";
    } else {
      return "2.8em";
    }
  });

function click(d) {
  let url = "https://" + d.url;
  if (d.url !== undefined) {
    window.open(url, "_blank");
  }
}

force.start();
