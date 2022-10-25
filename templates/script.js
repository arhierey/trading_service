class Graphic {
  constructor() {
    var array = new Array(100).fill(0).map(()=>new Array(100).fill(0));
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

    new Chart("myChart", {
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
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const graphic = new Graphic();

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