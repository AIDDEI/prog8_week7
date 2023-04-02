import { createChart, updateChart } from "./scatterplot.js";
const nn = ml5.neuralNetwork({ task: 'regression', debug: true });
// const button = document.getElementById('saveButton');

function loadData(){
        Papa.parse("./data/mobilephones.csv", {
                download:true,
                header:true,
                dynamicTyping:true,
                complete: results => checkData(results.data)
        })
}

function checkData(data) {
        shuffle(data);
}

loadData();

function shuffle(data) {
        data.sort(() => (Math.random() - 0.5));
        let trainData = data.slice(0, Math.floor(data.length * 0.8));
        let testData = data.slice(Math.floor(data.length * 0.8) + 1);

        for(let phone of trainData){
                nn.addData({ weight: phone.weight, battery: phone.battery, thickness: phone.thickness }, { price: phone.price });
        }
        nn.normalizeData();
        startTraining();

        makePrediction(testData);
}

function startTraining() {
        nn.train({ epochs: 25 }, () => finishedTraining())
}

async function finishedTraining(){
        console.log("Finished Training!");
        saveButton();
}

async function makePrediction(testData) {
        console.log(testData);
        const testPhone = { weight: testData[0].weight, battery: testData[0].battery, thickness:testData[0].thickness };
        const pred = await nn.predict(testPhone);
        console.log(pred[0].price);
}

function saveButton() {
        let btn = document.createElement("button");
        btn.innerHTML = "Save";
        btn.type = "submit";
        btn.onclick = function () {
                nn.save();
        }
        document.body.appendChild(btn);
}