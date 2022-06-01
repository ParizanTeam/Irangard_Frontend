import React from "react";
import { render } from "react-dom";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],
  datasets: [
    {
      label: "My First dataset",
      events: ["click"],
      responsive: true,
      scales: {
        xAxes: [
          {
            type: "time",
            distribution: "series"
          }
        ]
      },
      tooltips: {
        mode: "index",
        intersect: true
      },
      plugins: {
        annotation: {
          annotations: [
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: 62,
              borderColor: "rgb(255, 192, 192)",
              borderWidth: 4
            }
          ]
        }
      },
      data: [1500000, 3900000, 3000000, 4100000, 2300000, 1800000, 2000000]
    }
  ]
};

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <Line data={data} />
  </div>
);

export default App;
