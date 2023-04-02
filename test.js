import { createChart, updateChart } from "./scatterplot.js";
const nn = ml5.neuralNetwork({ task: 'regression', debug: true })

function loadData(){
    Papa.parse("./data/cars.csv", {
        download:true,
        header:true,
        dynamicTyping:true,
        complete: results => checkData(results.data)
    })
}

function checkData(data) {
    console.table(data);
    drawData(data);
}

loadData();

function drawData(data) {
    const chartData = data.map(car => ({
        x: car.horsepower,
        y: car.mpg,
    }));

    createChart(chartData, "Horsepower", "MPG");
    shuffle(data);
}

function shuffle(data) {
    data.sort(() => (Math.random() - 0.5));

    for (let car of data) {
        nn.addData({ horsepower: car.horsepower }, { mpg: car.mpg });
    }

    nn.normalizeData();

    startTraining();
}

function startTraining() {
    nn.train({ epochs: 10 }, () => finishedTraining())
}

async function finishedTraining(){
    let predictions = []
    for (let hp = 40; hp < 250; hp += 2) {
        const pred = await nn.predict({horsepower: hp})
        predictions.push({x: hp, y: pred[0].mpg})
    }
    updateChart("Predictions", predictions)
}