var hiradPlugin = require('./HiradPlugin');

hiradPlugin.ClearScreen();
hiradPlugin.ClearScreen();
hiradPlugin.ClearScreen();

hiradPlugin.ResetColors();
hiradPlugin.GotoXY(10, 10);
hiradPlugin.Print("Default");

//Draw Shape
hiradPlugin.SetBackColor("Red");
hiradPlugin.SetFontColor("Yellow");
hiradPlugin.DrawButton(30, 5, 50, 10, "Item");

//Draw Table
hiradPlugin.SetBackColor("Magenta");
hiradPlugin.SetFontColor("Yellow");
hiradPlugin.InitializeTable(4, 2, "Item");
hiradPlugin.SetTableItemText(2, 1, "hello");
hiradPlugin.SetTableItemText(3, 0, "sample");
hiradPlugin.SetTableItemText(4512, -234, "--");//Handle the error
hiradPlugin.PrintTable(70, 3, 110, 20);

var value = 100;
function MainTimer() {
	value -= 22;

	//Draw ProgressBar
	hiradPlugin.SetBackColor("Magenta");
	hiradPlugin.SetFontColor("Yellow");
	hiradPlugin.DrawProgressBar(10, 20, 60, 23, value, "horizontal");

	hiradPlugin.DrawProgressBar(60, 3, 66, 20, 100 - value, "vertical");

	hiradPlugin.SetTableItemText(1, 1, value);
	hiradPlugin.PrintTable(70, 3, 110, 20);

	if (0 >= value) {
		clearInterval(MainTimer);//Stops the timer
		//Call the event handler
		hiradPlugin.ClearScreen();
		hiradPlugin.ResetColors();
		hiradPlugin.GotoXY(10, 10);
		hiradPlugin.Print("End");
		process.exit();
	}
}

setInterval(MainTimer, 500);

