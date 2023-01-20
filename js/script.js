var brixBarColor = '';

function openPopup(popupName) {
	var modalWrap = document.getElementById('modalWrap');
	var popup = document.getElementById('popup' + popupName);
	modalWrap.classList.add('on');
	popup.classList.add('on');
}

function closePopup(popupName) {
	var modalWrap = document.getElementById('modalWrap');
	var popup = document.getElementById('popup' + popupName);

	popup.classList.remove('on');
	modalWrap.classList.remove('on');		
}

function closePopup(popupName) {
	var modalWrap = document.getElementById('modalWrap');
	var popup = document.getElementById('popup' + popupName);

	popup.classList.remove('on');
	modalWrap.classList.remove('on');		
}

function changeBrixMapColor(){
	$('.brixSec .brixMap td').each(function(){
		var brixMapTdText = $(this).text();
		if (brixMapTdText) {
			$(this).addClass('active');
			$(this).css('background-color', brixBarColor);
		} else {
			$(this).removeClass('active');
			$(this).css('background-color','#fafafa');
		}
	});
}

/*************************************
*                Chart               *
*************************************/
//////////////////// 온도 그래프 ////////////////////
var temperature_chart = document.getElementById('temperature').getContext('2d');
var temperature = new Chart(temperature_chart, {
	type: 'line',
	data: {
		labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
		datasets: [{
			label: '온도 변화 측정값',
			data: [11, 11, 10, 10, 9, 9, 8, 8, 9, 10, 14, 16, 17, 19, 18, 18, 17, 16, 15, 14, 13, 13, 12, 12, 11, 11],
			fill: false,
			borderColor: 'red',
			tension: 0.1
		}]
	},
	options: {
		scales: {
				y: {
						beginAtZero: true
				}
		},
		maintainAspectRatio: false,
	}
});

//////////////////// 습도 그래프 ////////////////////
var humidty_chart = document.getElementById('humidty').getContext('2d');
var humidty = new Chart(humidty_chart, {
	type: 'line',
	data: {
		labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
		datasets: [{
			label: '습도 변화 측정값',
			data: [61, 60, 66, 60, 59, 57, 58, 62, 49, 40, 44, 56, 57, 49, 68, 68, 57, 46, 75, 74, 83, 73, 62, 60, 57, 51],
			fill: false,
			borderColor: 'cornflowerblue',
			tension: 0.1
		}]
	},
	options: {
		scales: {
				y: {
						beginAtZero: true
				}
		},
		maintainAspectRatio: false,
	}
});

//////////////////// 일사량 그래프 ////////////////////
var insolation_chart = document.getElementById('insolation').getContext('2d');
var insolation = new Chart(insolation_chart, {
	type: 'line',
	data: {
		labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
		datasets: [{
			label: '일사량 변화 측정값',
			data: [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 5, 6, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0],
			fill: false,
			borderColor: 'orange',
			tension: 0.1
		}]
	},
	options: {
		scales: {
				y: {
						beginAtZero: true
				}
		},
		maintainAspectRatio: false,
	}
});

//////////////////// 당도 그래프 ////////////////////
var brix_chart = document.getElementById('brix').getContext('2d');
var brix = new Chart(brix_chart, {
	type: 'bar',
	data: {
		labels: ['9 미만', '9~9.9', '10~10.9', '11~11.9', '12~12.9', '13~13.9', '14~14.9', '15~15.9', '16~16.9', '17~17.9', '18~18.9', '19 이상'], 
		datasets: [{
			label: 'Brix 측정치',
			data: [5, 7, 13, 14, 16, 12, 9, 4, 3, 2, 1, 1],
			backgroundColor: ['#ffeec6', '#ffe6ad', '#ffda84', '#ffcf60', '#ffc747', '#ffc132', '#ffbb1d', '#fdb100', '#e29e00', '#ca8000', '#c57000', '#b17000'],
			borderColor: ['#ffeec6', '#ffe6ad', '#ffda84', '#ffcf60', '#ffc747', '#ffc132', '#ffbb1d', '#fdb100', '#e29e00', '#ca8000', '#c57000', '#b17000'],
			borderWidth: 1
		}]
	},
	options: {
		TType: {
			align: 'end'
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 2
				}
			}
		},
		onClick : function(point, event){
			if(event[0]){
				brixBarColor = event[0]._view.backgroundColor;
				changeBrixMapColor();
			}
		}
	}
});

/*************************************
*               jQuery               *
*************************************/
$(document).ready(function(){
	$('#userId').focus();

	$('.select').select2();
	
	$('.dateNavigation li').click(function(){
		var navIdx = $(this).index();
		var navHasOn = $(this).hasClass('on');
		var selectWrap = $('.datePickerWrap .wrapper');

		if(!navHasOn) {
			$('.dateNavigation li').removeClass('on');
			$(this).addClass('on');
			selectWrap.removeClass('on');
			selectWrap.eq(navIdx).addClass('on');
		} else {

		}
	});
	

	$('.viewType').click(function(){
		var btnIdx = $(this).index();
		var hasActive = $(this).hasClass('active');
		var content = $('.dataTab .chartSec .contWrap');

		if(!hasActive) {
			$('.viewType').removeClass('active');
			$(this).addClass('active');
			content.removeClass('on');
			content.eq(btnIdx).addClass('on');
		} else {
			
		}
	});

	$('.dataDivision li').click(function(){
		liIndex = $(this).index();
		$('.dataDivision li').removeClass('on')
		$('.tabSection').removeClass('on');
		$(this).addClass('on');
		$('.tabSection').eq(liIndex).addClass('on');
	});

	// var brixMapHeight = $('.brixSec .brixMap').width()
	// $('.brixSec .brixMap th, .brixSec .brixMap td').css('width', brixMapHeight / 21);
	// $('.brixSec .brixMap th, .brixSec .brixMap td').css('height', brixMapHeight / 21);
});



