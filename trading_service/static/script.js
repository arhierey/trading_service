class Graphic {
  constructor(ChartForUpdating) {
    var array = new Array(100).fill(0).map(()=>new Array(100).fill(0));
    this.chart = ChartForUpdating
    console.log(this.chart.data.labels)
    this.points = array;
    this.current_row = 0;
  }

  set_graphic() {
    var xValues = new Array(100);
    var yValues = new Array(100);
    for (let i = 0; i < 100; i++){
        xValues[i] = i;
        yValues[i] = this.points[this.current_row][i];
    }
    removeData(this.chart);
    addData(this.chart, xValues, yValues);
  }

  update_data(yValues) {
    console.log(yValues)
    var index = yValues[0];
    for (let i=0; i<100; i++){
        this.points[i][index] = yValues[i+1];
    }
    this.set_graphic();
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

var socket = new WebSocket('ws://localhost:8000/ws/some_url/');

var xValues = new Array(100);
var yValues = new Array(100);
for (let i = 0; i < 100; i++){
    xValues[i] = i;
    yValues[i] = 0;
}

const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: "line",
    data: {
       labels: xValues,
       datasets: [{
       data: yValues,
       borderColor: "red",
       fill: false }]
       },
       options: { legend: {display: false} }
       });

const graphic = new Graphic(myChart);

socket.onmessage = function(event){
    var data = JSON.parse(event.data);
    console.log(data);
    graphic.update_data(data.message);
    }

numberButtons.forEach(button =>
button.addEventListener(
'click', () => {
    document.getElementById('current').innerText = button.innerText;
    graphic.current_row = Number(button.innerText);
    graphic.set_graphic();
  })
);