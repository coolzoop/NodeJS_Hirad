/*
96-11-10
//! save current setting (x,y, back color, font color ,...)
echo off in bat - > nodejs -> hide cursor
create menu with click
table items's border
disable the Math.floor to increase performance
*/

///////////////////////////////////////////// <Draw Tools>
///Font Colors
//End flag of font color
var m_endFontColorFlag = "[39m";
//Current index of font color
var m_fontColorIndex = 7;
//The buffer of font color	 Black		Red		Green		Yellow		Blue		Magenta		Cyan		White		Crimson		Gray
var m_fontColors            = ["[30m",	"[31m",	"[32m", "[33m", "[34m", "[35m", "[36m", "[37m", "[38m", "[90m"];
//Returns the index of color in the font color buffer
function GetFontColorIndex(_colorName) {
	_colorName = _colorName.toLowerCase();

	if ("black" == _colorName)
		return 0;
	else if ("red" == _colorName)
		return 1;
	else if ("green" == _colorName)
		return 2;
	else if ("yellow" == _colorName)
		return 3;
	else if ("blue" == _colorName)
		return 4;
	else if ("magenta" == _colorName)
		return 5;
	else if ("cyan" == _colorName)
		return 6;
	else if ("white" == _colorName)
		return 7;
	else if ("crimson" == _colorName)
		return 8;
	else if ("gray" == _colorName)
		return 9;
}
//Sets the current font color
function SetFontColor(_colorName) {
	m_fontColorIndex = GetFontColorIndex(_colorName);
}

///Font Colors
//End flag of back color
var m_endBackColorFlag = "[49m";
//Current index of back color
var m_backColorIndex = 0;
//The buffer of back color		Black		Red			Green		Yellow		Blue		Magenta		Cyan		White		Crimson
var m_backColors			= ["[40m",		"[41m",		"[42m",		"[43m",		"[44m",		"[45m",		"[46m",		"[47m",		"[48m"];
//Returns the index of color in the back color buffer
function GetBackColorIndex(_colorName) {
	_colorName = _colorName.toLowerCase();

	if ("black" == _colorName)
		return 0;
	else if ("red" == _colorName)
		return 1;
	else if ("green" == _colorName)
		return 2;
	else if ("yellow" == _colorName)
		return 3;
	else if ("blue" == _colorName)
		return 4;
	else if ("magenta" == _colorName)
		return 5;
	else if ("cyan" == _colorName)
		return 6;
	else if ("white" == _colorName)
		return 7;
	else if ("crimson" == _colorName)
		return 8;
}
//Sets the current back color
function SetBackColor(_colorName) {
	m_backColorIndex = GetBackColorIndex(_colorName);
}

//Resets the font and back colors
function ResetColors() {
	SetBackColor("black");
	SetFontColor("White");
}

///////////////////////////////////////////////
////Structure of colors
//const Color = {
//	Reset:			"\x1b[0m",
//	Bright:			"\x1b[1m",
//	Dim:			"\x1b[2m",
//	Underscore:		"\x1b[4m",
//	Blink:			"\x1b[5m",
//	Reverse:		"\x1b[7m",
//	Hidden:			"\x1b[8m",
//	m_fontColor: {
//		Black:		"\x1b[30m",
//		Red:		"\x1b[31m",
//		Green:		"\x1b[32m",
//		Yellow:		"\x1b[33m",
//		Blue:		"\x1b[34m",
//		Magenta:	"\x1b[35m",
//		Cyan:		"\x1b[36m",
//		White:		"\x1b[37m",
//		Crimson:	"\x1b[38m",
//		Gray:		"[90m"
//	},
//	m_backColor: {
//		Black:		"\x1b[40m",
//		Red:		"\x1b[41m",
//		Green:		"\x1b[42m",
//		Yellow:		"\x1b[43m",
//		Blue:		"\x1b[44m",
//		Magenta:	"\x1b[45m",
//		Cyan:		"\x1b[46m",
//		White:		"\x1b[47m",
//		Crimson:	"\x1b[48m"
//	}
//};

//Cursor position
var m_cursorX = 0;
var m_cursorY = 0;

//Clears the screen
function ClearScreen() {
	ResetColors();
	Print("\x1Bc");
	Print("\x1Bc");
}

//Moves the writing cursor to (_x, _y)
function GotoXY(_x, _y) {
	_x = Math.floor(_x);
	_y = Math.floor(_y);

	process.stdout.cursorTo(_x, _y);
	m_cursorX = _x;
	m_cursorY = _y;
}

//Prints the text on screen
function Print(_text) {
	process.stdout.write(m_backColors[m_backColorIndex] + m_fontColors[m_fontColorIndex]/* + Color.Bright*/ + _text/* + Color.Reset*/);
}

//Draws a filled rectangle with a border
function DrawRectangle(_x1, _y1, _x2, _y2) {
	_x1 = Math.floor(_x1);
	_y1 = Math.floor(_y1);
	_x2 = Math.floor(_x2);
	_y2 = Math.floor(_y2);

	var tmpX = m_cursorX;
	var tmpY = m_cursorY;

	for (var j = 0; j < _y2 - _y1; j++) {
		GotoXY(_x1, _y1 + j);
		for (var i = 0; i < _x2 - _x1; i++) {
			Print(" ");
		}
	}

	//Move cursor to previous position
	GotoXY(tmpX, tmpY);
}

//Draws an empty rectangle
function DrawEmptyRectangle(_x1, _y1, _x2, _y2) {
	_x1 = Math.floor(_x1);
	_y1 = Math.floor(_y1);
	_x2 = Math.floor(_x2);
	_y2 = Math.floor(_y2);

	var tmpX = m_cursorX;
	var tmpY = m_cursorY;

	for (var j = 0; j < _y2 - _y1; j++) {
		for (var i = 0; i < _x2 - _x1; i++) {
			if (0 == j || (_y2 - _y1 - 1) == j || 0 == i || (_x2 - _x1 - 1) == i) {
				GotoXY(_x1 + i, _y1 + j);
				Print(" ");
			}
		}
	}

	//Move cursor to previous position
	GotoXY(tmpX, tmpY);
}

//Draws a box with a text on center
function DrawButton(_x1, _y1, _x2, _y2, _caption) {
	var tmpX = m_cursorX;
	var tmpY = m_cursorY;

	DrawRectangle(_x1, _y1, _x2, _y2);

	var textLength = _caption.length;
	GotoXY(_x1 + (_x2 - _x1) / 2 - textLength / 2, _y1 + (_y2 - _y1) / 2);
	Print(_caption);

	//Move cursor to previous position
	GotoXY(tmpX, tmpY);
}
///////////////////////////////////////////// </Draw Tools>

///////////////////////////////////////////// <Progress Bar>
var m_progressBarX = 0;
var m_progressBarY = 0;
var m_progressBarWidth = 0;
var m_progressBarHeight = 0;
var m_lastProgressBarValue = -1;
var m_direction = "horizontal";

//Updates the progress bar
function DrawProgressBar(_x1, _y1, _x2, _y2, _value, _direction) {
	_direction = _direction.toLowerCase();
	
	var oldBackColor = m_backColorIndex;
	m_progressBarX = _x1;
	m_progressBarY = _y1;
	m_progressBarWidth = _x2 - _x1;
	m_progressBarHeight = _y2 - _y1;

	//Clamping
	if (_value > 100)
		_value = 100;
	else if (_value < 0)
		_value = 0;

	////Prevent the refreshing
	//if (m_lastProgressBarValue == _value)
	//	return;

	//Progress bar area
	//if (_value < m_lastProgressBarValue || -1 == m_lastProgressBarValue) {
		DrawRectangle(m_progressBarX, m_progressBarY, _x2, _y2);//Draw empty progress bar
		//m_lastProgressBarValue = 0;
	//}

	if ("horizontal" == _direction) {
		//if (_value > m_lastProgressBarValue) {
			var backColorIndex = m_backColorIndex;
			m_backColorIndex = m_fontColorIndex;//!
			DrawRectangle(m_progressBarX , m_progressBarY,
				(m_progressBarX + m_progressBarWidth * _value / 100), _y2);	//Draw value of progress bar
			m_backColorIndex = backColorIndex;
		//}
	} else {
		//if (_value > m_lastProgressBarValue) {
			var backColorIndex = m_backColorIndex;
			m_backColorIndex = m_fontColorIndex;//!
			DrawRectangle(m_progressBarX , m_progressBarY,
				_x2, (m_progressBarY + m_progressBarHeight * _value / 100));	//Draw value of progress bar
			m_backColorIndex = backColorIndex;
		//}
	}

	//Percent text
	var text = _value.toString();
	SetBackColor("black");
	var xTextRectangle = m_progressBarX + m_progressBarWidth / 2 - text.length / 2;
	var yTextRectangle = m_progressBarY + m_progressBarHeight / 2;
	DrawRectangle(xTextRectangle - 1, yTextRectangle, xTextRectangle + 5, 1);

	var fontColorIndex = m_fontColorIndex;
	SetFontColor("white");
	GotoXY(xTextRectangle, yTextRectangle);
	Print(text + "%");
	m_fontColorIndex = fontColorIndex;

	//m_lastProgressBarValue = _value;
	m_backColorIndex = oldBackColor;
}

////Updates the progress bar
//function DrawProgressBar(_x1, _y1, _x2, _y2, _value) {
//	m_progressBarX		= _x1;
//	m_progressBarY		= _y1;
//	m_progressBarWidth	= _x2 - _x1;
//	m_progressBarHeight	= _y2 - _y1;

//	//Clamping
//	if (_value > 100)
//		_value = 100;
//	else if (_value < 0)
//		_value = 0;

//	//Prevent the refreshing
//	if (m_lastProgressBarValue == _value)
//		return;
	
//	//Progress bar area
//	if (_value < m_lastProgressBarValue || -1 == m_lastProgressBarValue) {
//		DrawRectangle(m_progressBarX, m_progressBarY, _x2, _y2);//Draw empty progress bar
//		m_lastProgressBarValue = 0;
//	}

//	if (_value > m_lastProgressBarValue) {
//		var backColorIndex = m_backColorIndex;
//		m_backColorIndex = m_fontColorIndex;//!
//		DrawRectangle((m_progressBarX + m_progressBarWidth * Math.round(m_lastProgressBarValue / 100)), m_progressBarY,
//			(m_progressBarX + m_progressBarWidth * (_value - m_lastProgressBarValue) / 100), _y2);	//Draw value of progress bar
//		m_backColorIndex = backColorIndex;
//	}

//	//Percent text
//	var text = _value.toString();
//	SetBackColor("black");
//	var xTextRectangle = m_progressBarX + m_progressBarWidth / 2 - text.length / 2;
//	var yTextRectangle = m_progressBarY + m_progressBarHeight / 2;
//	DrawRectangle(xTextRectangle - 1, yTextRectangle, xTextRectangle + 5, 1);
//	SetFontColor("white");
//	GotoXY(xTextRectangle, yTextRectangle);
//	Print(text + "%");

//	m_lastProgressBarValue = _value;
//}
///////////////////////////////////////////// </Progres Bar>

///////////////////////////////////////////// <Table>
var m_tableItems;
var m_tableColumnCount	= 0;
var m_tableRowCount		= 0;
var m_tableX			= 0;
var m_tableY			= 0;
var m_tableItemWidth	= 0;
var m_tableItemHeight	= 0;

//Initialize the array (row size, column size)
function InitializeTable(_rowCount, _columnCount, _defaultValue){
	m_tableItems = [];
	for (var j = 0; j < _rowCount; j++) {
		m_tableItems[j] = [];
		for (var i = 0; i < _columnCount; i++) {
			m_tableItems[j][i] = _defaultValue.toString();
		}
	}

	m_tableColumnCount	= _columnCount;
	m_tableRowCount		= _rowCount;
}

//Change the value of item (row, column)
function SetTableItemText(_row, _column, _value) {
	if (_row < 0 || _row >= m_tableRowCount || _column < 0 || _column >= m_tableColumnCount)
		return;

	m_tableItems[_row][_column] = _value.toString();
}

//Draws the table
function PrintTable(_x1, _y1, _x2, _y2) {
	m_tableX			= _x1;
	m_tableY			= _y1;
	m_tableItemWidth	= (_x2 - _x1) / m_tableColumnCount;
	m_tableItemHeight	= (_y2 - _y1) / m_tableRowCount;

	for (var j = 0; j < m_tableRowCount; j++) {
		for (var i = 0; i < m_tableColumnCount; i++) {
			DrawButton(
				m_tableX + m_tableItemWidth * i,
				m_tableY + m_tableItemHeight * j,
				m_tableX + m_tableItemWidth * (i + 1),
				m_tableY + m_tableItemHeight * (j + 1),
				m_tableItems[j][i]);
			//Draw border of each field
			var backColorIndex = m_backColorIndex;
			m_backColorIndex = m_fontColorIndex;
			DrawEmptyRectangle(
				m_tableX + m_tableItemWidth * i,
				m_tableY + m_tableItemHeight * j,
				m_tableX + m_tableItemWidth * (i + 1),
				m_tableY + m_tableItemHeight * (j + 1));
			m_backColorIndex = backColorIndex;

		}
	}

}

///////////////////////////////////////////// </Table>

///////////////////////////////////////////// <Chart>
var m_chartValues = [];
var m_chartLength = 10;
var m_tmpChartBackColor;
var m_tmpChartfontColor;
var m_chartX;
var m_chartY;
var m_chartWidth;
var m_chartHeight;
var m_chartMaxValue;
var m_chartItemWidth;

//Initializes the chart's structure
function ChartInitialize(_x, _y, _width, _height, _maxValue){
	m_chartX			= Math.floor(_x);
	m_chartY			= Math.floor(_y);
	m_chartWidth		= Math.floor(_width);
	m_chartHeight		= Math.floor(_height);
	m_chartMaxValue		= Math.floor(_maxValue);
	m_chartItemWidth	= m_chartWidth / m_chartLength;
	for (var index = 0; index < m_chartLength; index++) {
		m_chartValues[index] = 0;
	}

}

//Draws the border of chart
function DrawChartBorder(_x1, _y1, _x2, _y2) {
	_x1 = Math.floor(_x1);
	_y1 = Math.floor(_y1);
	_x2 = Math.floor(_x2);
	_y2 = Math.floor(_y2);

	var tmpX = m_cursorX;
	var tmpY = m_cursorY;

	for (var j = 0; j < _y2 - _y1; j++) {
		for (var i = 0; i < _x2 - _x1; i++) {
			if (0 == j || (_y2 - _y1 - 1) == j || 0 == i || (_x2 - _x1 - 1) == i) {
				GotoXY(_x1 + i, _y1 + j);
				Print(" ");
			}
		}
	}

	//Move cursor to previous position
	GotoXY(tmpX, tmpY);

}

//Updates and redraws the chart
function SetChartValue(_value){
	//Clamp the value to valid range
	if (_value < 0)
		_value = 0;
	else if (_value > m_chartMaxValue)
		_value = m_chartMaxValue;

	//Shift the values to back
	for (var index = 0; index < m_chartLength - 1; index++) {
		m_chartValues[index] = m_chartValues[index + 1];
	}
	m_chartValues[m_chartLength - 1] = _value;

	//Draw the border
	m_tmpChartBackColor = m_backColorIndex;
	DrawChartBorder(m_chartX, m_chartY, m_chartX + m_chartWidth, m_chartY + m_chartHeight);
	GotoXY(m_chartX, m_chartY);
	Print("   Chart Viewer");

	//Clear the chart
	SetBackColor("Yellow");
	DrawRectangle(m_chartX + 1, m_chartY + 1, m_chartX + m_chartWidth - 1, m_chartY + m_chartHeight - 1);

	//Draw the values
	//m_backColorIndex = m_fontColorIndex;
	SetBackColor("Black");
	var tmpChartItemWidth	= 0;
	var tmpChartItemHeight	= 0;
	for (var index = 0; index < m_chartLength; index++) {
		//GotoXY(m_chartX + 1 + index * m_chartItemWidth, m_chartY + m_chartHeight - 2);
		//Print(" ");

		tmpChartItemWidth = m_chartX + 1 + (index + 1) * m_chartItemWidth;
		if (tmpChartItemWidth >= m_chartX + m_chartWidth - 1)
			tmpChartItemWidth = m_chartX + m_chartWidth - 1;

		tmpChartItemHeight = (m_chartHeight - 1) * m_chartValues[index] / 100;

		DrawRectangle(m_chartX + 1 + index * m_chartItemWidth, m_chartY + m_chartHeight - tmpChartItemHeight,
			tmpChartItemWidth, m_chartY + m_chartHeight - 1);

		//PrintValue
		GotoXY(m_chartX + 1 + index * m_chartItemWidth, m_chartY + m_chartHeight - 2);
		Print(m_chartValues[index]);
	}
	m_backColorIndex = m_tmpChartBackColor;
}


///////////////////////////////////////////// </Chart>

//Export plugin's functions
module.exports = {
	ClearScreen: function () {
		ClearScreen();
	}
	,
	ResetColors: function () {
		ResetColors();
	}
	,
	Print: function (_text) {
		Print(_text);
	}
	,
	GotoXY: function (_x, _y) {
		GotoXY(_x, _y);
	}
	,
	SetBackColor: function (_colorName) {
		SetBackColor(_colorName);
	}
	,
	SetFontColor: function (_colorName) {
		SetFontColor(_colorName);
	}
	,
	DrawButton: function (_x1, _y1, _x2, _y2, _caption) {
		DrawButton(_x1, _y1, _x2, _y2, _caption);
	}
	,//ProgressBar
	DrawProgressBar: function (_x1, _y1, _x2, _y2, _value, _direction) {
		DrawProgressBar(_x1, _y1, _x2, _y2, _value, _direction);
	}
	,//Table
	InitializeTable: function (_rowCount, _columnCount, _defaultValue) {
		InitializeTable(_rowCount, _columnCount, _defaultValue);
	}
	,
	SetTableItemText: function (_row, _column, _value) {
		SetTableItemText(_row, _column, _value);
	}
	,
	PrintTable: function (_x1, _y1, _x2, _y2) {
		PrintTable(_x1, _y1, _x2, _y2);
	}
	,//Chart
	ChartInitialize: function (_x, _y, _width, _height, _maxValue) {
		ChartInitialize(_x, _y, _width, _height, _maxValue);
	}
	,
	SetChartValue: function (_value) {
		SetChartValue(_value);
	}


};

