class Graphic {
  constructor(ChartForUpdating) {
    var array = new Array(100).fill(0).map(()=>new Array(100).fill(0));
    this.chart = ChartForUpdating
    console.log(this.chart.data.labels)
    this.points = array;
    this.current_row = new Array(100).fill(0);
  }

  change_row(row_num) {
    for (let i = 0; i < 100; i++){
        this.current_row[i] = this.points[row_num-1][i];
    }
  }

  set_graphic() {
    var xValues = new Array(100);
    var yValues = new Array(100);
    for (let i = 0; i < 100; i++){
        xValues[i] = i;
        yValues[i] = this.current_row[i];
    }
    removeData(this.chart);
    addData(this.chart, xValues, yValues);
  }
}


function addData(chart, label, data) {
  console.log(chart.data.labels)
  for (let i = 0; i < 100; i++){
    chart.data.labels.push(label[i]);
  }
  chart.data.datasets.forEach((dataset) => {
    for (let i = 0; i < 100; i++){
        dataset.data.push(data[i]);
    }
  });
  chart.update();
}


function removeData(chart) {
  console.log(chart.data.labels)
  for (let i = 0; i < 100; i++){
    chart.data.labels.pop();
  }
  console.log(chart.data.labels)
  chart.data.datasets.forEach((dataset) => {
        for (let i = 0; i < 100; i++){
          dataset.data.pop();
        }
  });
  chart.update();
}


const numberButtons = document.querySelectorAll("[data-number]");

var xValues = new Array(100);
var yValues = new Array(100);
for (let i = 0; i < 100; i++){
    xValues[i] = i;
}

for (let i = 0; i < 100; i++){
    yValues[i] = Math.random();
}

const myChart = new Chart("myChart", {
    type: "line",
    data: {
       labels: xValues,
       datasets: [{
       data: yValues,
       borderColor: "red",
       fill: false
            }]
        },
        options: {
            legend: {display: false}
        }
        });

console.log(myChart.data.labels);
const graphic = new Graphic(myChart);

for (let i = 0; i < 100; i++){
    for (let j = 0; j < 100; j++){
    graphic.points[i][j] = Math.random();
    }
}

numberButtons.forEach(button =>
button.addEventListener(
'click', () => {
    graphic.change_row(Number(button.innerText));
    graphic.set_graphic();
  })
);