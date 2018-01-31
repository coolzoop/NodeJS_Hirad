var hiradPlugin = require('./HiradPlugin');

hiradPlugin.ClearScreen();
hiradPlugin.ResetColors();

hiradPlugin.ChartInitialize(5, 4, 50, 13, 100);
//m_chartValues[0] = 100;
//m_chartValues[1] = 34;
//m_chartValues[4] = 84;
//m_chartValues[6] = 64;
//m_chartValues[7] = 92;
//m_chartValues[9] = 100;

var rand = [0, 98, 45, 13, 78, 68];
var counter = 0;
function ChartAnimation() {
	hiradPlugin.SetBackColor("Red");
	hiradPlugin.SetFontColor("White");
	if (counter >= rand.length)
		counter = 0;
	hiradPlugin.SetChartValue(rand[counter]);
	counter++;
}

setInterval(ChartAnimation, 700);