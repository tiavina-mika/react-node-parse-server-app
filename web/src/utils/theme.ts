const BLACK = '#000';
const WHITE = '#fff';
const TRANSPARENT = 'transparent';

const BLUE = {
	300: '#E7EFEF', // 1
	540: '#F5F8F8',
	550: '#E0EFF8', // 1
	560: '#C6DEEB', // 0
	565: '#ECEFEF',
	568: '#C4E3EE',
	570: '#A0D5EE', // 1
	580: '#7BC1E3', // 5
	585: '#63C3E7', // 1
	590: '#2CA4D1', // 2
	600: '#4AA9DF', // 1
	610: '#2280B7',  // 6
};

const GREEN = {
	550: '#E8F5F2', // 1
	560: '#CEECD6', // 1
	565: '#AEE5CD', // 1
	570: '#2CC9AA', // 13
	580: '#4BB39E', // 0
	595: '#45CCAB', // 1
	593: '#34AE90', // 1
	590: '#25B598', // 4
	600: '#1FA086', // 100
	605: '#469070', // 4
	610: '#0B9478', // 1
	620: '#19836E', // 1
	630: '#0A7967', // 1
	640: '#00803E', // 1
	650: '#86BC23', // 1
	655: '#789191',
	660: '#7A9EA3', // 1
	680: '#517478',
	690: '#416461',
	700: '#3A5550', // 48
	705: '#095D55', // 1
	710: '#07393E', // 17
	712: '#3A5C5D',
	715: '#7DDBC0',
	730: '#184449'
};

const GREY = {
	505: '#ECEFEF',
	510: '#F7FAFA',
	520: '#BFCBCB',
	530: '#F3F3F3', // 4
	550: '#FBFBFB', // 23
	560: '#FAFAFA', // 1
	570: '#F8F8F8', // 2
	572: '#F1ECE8',
	574: '#E5DBD2',
	575: '#F0F0F0', // 45
	580: '#EBEBEB', // 10
	585: '#E8E8E8', // 6
	590: '#E6E6E6', // 1
	593: '#E5E5E5', // 6
	595: '#DDDDDD', // 3
	600: '#D8D8D8', // 58   // greyBorder (see style.css)
	601: '#D0D0D0', // 2
	603: '#CFCFCF', // 2
	605: '#CCCCCC', // 1
	610: '#BCBCBC', // 1
	615: '#C2C2C2',
	620: '#B2B2B2', // 2
	625: '#AAAAAA', // 2
	630: '#9E9E9E', // 37
	633: '#999999', // 2
	635: '#808080', // 3    // grey color
	640: '#777777', // 45
	645: '#606060', // 3
	650: '#4C4C4C', // 13
	660: '#4A4A4A', // 96
	670: '#333333', // 1
	700: '#292929',
	800: '#1A1A1A', // 1
	900: '#1D2128', // 1
	910: '#E6EBEC',
	920: '#B5C4C5',
};

const RED = {
	540: '#FFB9B9', // 1
	550: '#FE9C9A', // 0
	560: '#FF6F6F', // 1
	565: '#FF605C', // 1
	570: '#FF5D5A', // 7
	580: '#FD6664', // 3
	590: '#EC554F', // 10   // errorColor (see style.css)
	600: '#F53531', // 15
	605: '#E63112', // 1
	610: '#E21916', // 4
	620: '#D7172C', // 2
	700: '#6D0200', // 1
};

const ORANGE = {
	200: '#F8F1EB',
	600: '#F07D00', // 1
	700: '#E7581D'  // 1
};

const YELLOW = {
	500: '#F8F1EB', // 1
	570: '#FFF2CF', // 1
	575: '#FAE9BB', // 1
	580: '#FEE39E', // 1
	583: '#FCDB50', // 1
	584: '#F6D74F',
	585: '#FFCC00', // 1
	586: '#F8CD32',
	590: '#EBA900', // 6
	600: '#F2B926', // 6
	610: '#F8AB39', // 2
	620: '#E4A605', // 4
	630: '#E4AA16', // 1
	640: '#DB960F', // 1
	700: '#A47002'  // 1
};

const RGBA = {
	100: 'rgba(255, 255, 255, 0.5)',  // 7
	105: 'rgba(255, 255, 255, 0.3)',  // 2
	106: 'rgba(255, 255, 255, 0.2)',  // 1
	110: 'rgba(255, 58, 55, 0.5)',    // 2
	120: 'rgba(31, 160, 134, 0.8)',   // 4
	125: 'rgba(31, 160, 134, 0.2)',   // 2
	130: 'rgba(0, 0, 0, 0.15)',       // 0
	135: 'rgba(0, 0, 0, 0.3)',        // 1
	140: 'rgba(233, 233, 233, 0.60)', // 0
	150: 'rgba(74, 74, 74, 0.5)',     // 2
	155: 'rgba(216, 216, 216, 0.2)',  // 5
	160: 'rgba(216, 216, 216, 0.3)',  // 1
	170: 'rgba(151, 151, 151, 0.1)',  // 3
	175: 'rgba(151, 151, 151, 0.5)',  // 4
	180: 'rgba(31, 160, 135, 0.7)',   // 1
	190: 'rgba(150, 150, 150, 0.5)',  // 1
	200: 'rgba(206, 236, 214, 0.5)',  // 1
	210: 'rgba(212, 212, 212, 0.42)',  // 1
	220: 'rgba(81, 116, 120, 0.2)',
	230: 'rgba(191, 203, 203, 0.5)'
};

const LINEAR = {
	100: 'linear-gradient(180deg, #F9F9F9 0%, rgba(251, 251, 251, 0) 81.54%)',         // 1
	110: 'linear-gradient(132.51deg, #2CC9AA 47.03%, #25B598 75.68%)',                 // 1
	120: 'linear-gradient(72.91deg, #2CC9AA 13.33%, #25B598 95.62%)',                  // 1
	130: 'linear-gradient(to top, rgba(255,255,255, 1) 0%, rgba(255,255,255, 0) 40%)',  // 1
	140: 'linear-gradient(271.43deg, #080D10 28.05%, #08090B 76.6%)'
};

const BOX_SHADOW = {
	100: '0px 2px 14px 0px rgba(0, 0, 0, 0.05)',        // 2
	110: '0px 2px 4px 0px rgba(0, 0, 0, 0.3)',          // 1
	115: '0px 1px 1px 0px rgba(0, 0, 0, 0.1)',         // 1
	120: '0px 1px 1px 0px rgba(0, 0, 0, 0.15)',         // 3
	130: '0px 2px 2px 0px rgba(0, 0, 0, 0.05)',         // 1
	140: '0px 0px 2px 0px rgba(0, 0, 0, 0.05)',         // 1
	150: '0px 2px 15px 0px rgba(0, 0, 0, 0.05)',        // 16
	160: '0px 5px 8px 0px rgba(0, 0, 0, 0.15)',         // 1
	170: '0px 8px 17px 0px rgba(0, 0, 0, 0.03)',        // 7
	180: '0px 2px 15px 0px rgba(0, 0, 0, 0.01)',        // 1
	190: '0px 2px 8px 0px rgba(0, 0, 0, 0.1)',          // 6
	200: 'inset 0px 2px 2px 2px rgba(0, 0, 0, 0.04)',   // 1
	210: '0px 3px 15px 0px rgba(0, 0, 0, 0.1)',         // 2
	220: '0px 1px 2px 0px rgba(0, 0, 0, 0.15)',         // 3
	230: '0px 1px 3px 0px rgba(0, 0, 0, 0.3)',          // 1
	240: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',          // 1
	250: '0px 1px 2px 0px rgba(0, 0, 0, 0.2)',          // 1
	260: '0px 1px 8px 0px rgba(0, 0, 0, 0.3)',          // 2
	270: '0px 1px 10px 0px rgba(0, 0, 0, 0.18)',        // 1
	280: '0px -2px 2px 0px rgba(130, 130, 130, 0.18)',  // 1
	290: '0px 2px 2px 0px rgba(130, 130, 130, 0.18)',   // 5
	300: '0px 2px 14px 0px rgba(0, 0, 0, 0.1)',         // 3
	310: '0px 3px 5px 0px #4a4a4a',                     // 1
	320: '0px 10px 15px 0px rgba(0, 0, 0, 0.15)',        // 1
	330: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
	340: '0px -1px 1px 0px rgba(0, 0, 0, 0.15)',
	350: '3px 5px 0px 0px rgba(86, 117, 118, 0.1)',
	360: '0px 4px 3px 0px rgba(0, 0, 0, 0.05)'
};

const TEXT_SHADOW = {
	100: '0px 2px 15px rgba(0, 0, 0, 0.05)',  // 4
	110: '0px 2px 10px rgba(0, 0, 0, 0.5)',   // 1
	120: '0px 1px 10px #00000080'             // 1
};

const getBorder = (object: any) => {
	const suffix: string = '1px solid ';
	const result: any = {};
	Object.keys(object).forEach(value => {
		result[value] = suffix + object[value];
	});
	return result;
};

export const DEFAULT = {
	/*---------------------------------------------*/
	/*-------------------- COLORS -----------------*/
	/*---------------------------------------------*/
	color: {
		black: BLACK,
		transparent: TRANSPARENT,
		white: WHITE,
		blue: {
			...BLUE
		},
		green: {
			...GREEN
		},
		grey: {
			...GREY
		},
		orange: {
			...ORANGE
		},
		red: {
			...RED
		},
		yellow: {
			...YELLOW
		},
		rgba: {
			...RGBA
		},
		linear: {
			...LINEAR
		}
	},
	/*---------------------------------------------*/
	/*---------------- BACKGROUND -----------------*/
	/*---------------------------------------------*/
	background: {
		black: BLACK,
		transparent: TRANSPARENT,
		white: WHITE,
		blue: {
			...BLUE
		},
		green: {
			...GREEN
		},
		grey: {
			...GREY
		},
		orange: {
			...ORANGE
		},
		red: {
			...RED
		},
		yellow: {
			...YELLOW
		},
		rgba: {
			...RGBA
		},
		linear: {
			...LINEAR
		}
	},
	/*---------------------------------------------*/
	/*------------------- BORDER ------------------*/
	/*---------------------------------------------*/
	border: {
		black: '1px solid ' + BLACK,
		transparent: '1px solid ' + TRANSPARENT,
		white: '1px solid ' + WHITE,
		blue: {
			...getBorder({ ...BLUE })
		},
		green: {
			...getBorder({ ...GREEN })
		},
		grey: {
			...getBorder({ ...GREY })
		},
		orange: {
			...getBorder({ ...ORANGE })
		},
		red: {
			...getBorder({ ...RED })
		},
		yellow: {
			...getBorder({ ...YELLOW })
		},
		rgba: {
			...getBorder({ ...RGBA })
		},
		linear: {
			...getBorder({ ...LINEAR })
		}
	},
	/*---------------------------------------------*/
	/*--------------- BOX SHADOW ------------------*/
	/*---------------------------------------------*/
	boxShadow: {
		...BOX_SHADOW
	},
	/*---------------------------------------------*/
	/*-------------- TEXT SHADOW ------------------*/
	/*---------------------------------------------*/
	textShadow: {
		...TEXT_SHADOW
	}
};