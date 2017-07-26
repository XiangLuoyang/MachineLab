const ml = require('ml-regression');
const csv = require('csvtojson');
const SLR = ml.SLR; // 简单线性回归
const csvFilePath = './advertising.csv'; // 数据
let csvData = [], // 已解析的数据
    X = [], // 输入
    y = []; // 输出
let regressionModel;
const readline = require('readline'); // 同时预测用户的输入值
const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});
csv()
    .fromFile(csvFilePath)
    .on('json', (jsonObj) => {
        csvData.push(jsonObj);
    })
    .on('done', () => {
        dressData(); // 从 JSON 对象中获取数据点
        performRegression(); 
    });
function performRegression() {
    regressionModel = new SLR(X, y); // 基于训练数据来训练模型
    console.log(regressionModel.toString(3));
    predictOutput();
}
function dressData() {
    /**
     * 一个数据对象应该这样：
     * {
     *   TV: "10",
     *   Radio: "100",
     *   Newspaper: "20",
     *   "Sales": "1000"
     * }
     *
     * 因此，在添加数据点的同时，
     * 我们需要将 String 类型的值解析为 Float 类型。
     */
    csvData.forEach((row) => {
        X.push(f(row.Radio));
        y.push(f(row.Sales));
    });
}
function f(s) {
    return parseFloat(s);
}
function predictOutput() {
    rl.question('Enter input X for prediction (Press CTRL+C to exit) : ', (answer) => {
        console.log(`At X = ${answer}, y =  ${regressionModel.predict(parseFloat(answer))}`);
        predictOutput();
    });
}