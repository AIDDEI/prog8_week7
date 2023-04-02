const nn = ml5.neuralNetwork({ task: 'regression', debug: true });

nn.load('./model/model.json', modelLoaded);

function modelLoaded() {
    let input1 = document.createElement("input");
    input1.type = "text";
    input1.id = "weight";
    input1.placeholder = "weight";
    input1.required = true;

    let input2 = document.createElement("input");
    input2.type = "text";
    input2.id = "battery";
    input2.placeholder = "battery";
    input2.required = true;

    let input3 = document.createElement("input");
    input3.type = "text";
    input3.id = "thickness";
    input3.placeholder = "thickness";
    input3.required = true;

    let result = document.createElement("p");
    result.id = "result";
    result.innerHTML = "";

    let lineBreak1 = document.createElement("br");
    let lineBreak2 = document.createElement("br");
    let lineBreak3 = document.createElement("br");

    let btn = document.createElement("button");
    btn.innerHTML = "Voorspel de prijs!";
    btn.type = "submit";
    btn.onclick = async function () {
        const phoneWeight = document.getElementById("weight").value;
        const phoneBattery = document.getElementById("battery").value;
        const phoneThickness = document.getElementById("thickness").value;

        let numberWeight = Number(phoneWeight);
        let numberBattery = Number(phoneBattery);
        let numberThickness = Number(phoneThickness);

        let testData = [
            {
                "weight": numberWeight,
                "battery": numberBattery,
                "thickness": numberThickness
            }
        ];

        const testPhone = { weight: testData[0].weight, battery: testData[0].battery, thickness: testData[0].thickness };
        const pred = await nn.predict(testPhone);

        const price = pred[0].price;
        const fmt = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' });

        document.getElementById("result").innerHTML = fmt.format(price);
    }

    document.body.appendChild(input1);
    document.body.appendChild(lineBreak1);
    document.body.appendChild(input2);
    document.body.appendChild(lineBreak2);
    document.body.appendChild(input3);
    document.body.appendChild(lineBreak3);
    document.body.appendChild(btn);
    document.body.appendChild(result);
}