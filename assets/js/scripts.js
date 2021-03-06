

$(document).ready(function() {


	// $(window).on('load', function() {
    //     $('.modal').modal('show');
    // });

	
    $('.Select').selectpicker();

	$('.BurgerIcon').click(function(e){
		e.stopPropagation();
		e.preventDefault();
		$('body').toggleClass('ShowSidebar');
	}); 

    $('#WhiteMode').on('change', function(e){
		if ($(this).is(':checked')) {
			$('body').addClass('WhiteMode'); 
		} else {
			$('body').removeClass('WhiteMode'); 
		}
	})

	$('.LogOutPopup').click(function(e){
		e.stopPropagation();
		e.preventDefault();
		$('.LogOut').toggleClass('Show'); 
		$('body').toggleClass('BodyScroll'); 
	});

	$('.ShowHide').click(function(e){
		e.stopPropagation();
		e.preventDefault();
		$('.LangDiv').toggleClass('Show'); 
		//$('body').toggleClass('BodyScroll'); 
	});

});
 

$(document).ready(function() {
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
	
	/*  className colors
	
	className: default(transparent), important(red), chill(pink), success(green), info(blue)
	
	*/		
	
	  
	/* initialize the external events
	-----------------------------------------------------------------*/
	let start = '';
	let className = '';
	let end = '';
	let title = '';
	$('#external-events div.external-event').each(function() {
	
		// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
		// it doesn't need to have a start or end
		var eventObject = {
			title: $.trim($(this).text()) // use the element's text as the event title
		};
		
		// store the Event Object in the DOM element so we can get to it later
		$(this).data('eventObject', eventObject);
		
		// make the event draggable using jQuery UI
		$(this).draggable({
			zIndex: 999,
			revert: true,      // will cause the event to go back to its
			revertDuration: 0  //  original position after the drag
		});
		
	});


	/* initialize the calendar
	-----------------------------------------------------------------*/
	
	var calendar =  $('#calendar').fullCalendar({
		header: {
			left: 'title',
			//center: 'agendaDay,agendaWeek,month',
			right: 'prev,next today' //today
		},
		editable: true,
		firstDay: 1, //  1(Monday) this can be changed to 0(Sunday) for the USA system
		selectable: true,
		defaultView: 'month',
		start : '',
		axisFormat: 'h:mm',
		columnFormat: {
			month: 'ddd',    // Mon
			week: 'ddd d', // Mon 7
			day: 'dddd M/d',  // Monday 9/7
			agendaDay: 'dddd d'
		},
		titleFormat: {
			month: 'MMMM yyyy', // September 2009
			week: "MMMM yyyy", // September 2009
			day: 'MMMM yyyy'                  // Tuesday, Sep 8, 2009
		},
		allDaySlot: false,
		selectHelper: true,
		select: function(start, end, allDay) {
			// var title = prompt('Event Title:');
			$('#staticBackdrop').modal('show');
			
			$('.addEvent').click(function(e){
				e.preventDefault();
				var title = $('input[name="title"]').val();
				var comment = $('textarea[name="comment"]').val();
				var className = $('.className:checked').val();
				var time = $('input[name="time"]').val();
				console.log(calendar)
				if (title) {
					calendar.fullCalendar('renderEvent',
						{
							title: title,
							start: start,
							end: end,
							allDay: true,
							className: className,
							comment: comment,
							time: time
						},
						true // make the event "stick"
					);
					
				}
				calendar.fullCalendar('unselect');
				$('#staticBackdrop').modal('hide');
				$('.FormEvent').trigger("reset");
			})
			
		},
		droppable: true, // this allows things to be dropped onto the calendar !!!
		drop: function(date, allDay) { // this function is called when something is dropped
		
			// retrieve the dropped element's stored Event Object
			var originalEventObject = $(this).data('eventObject');
			
			// we need to copy it, so that multiple events don't have a reference to the same object
			var copiedEventObject = $.extend({}, originalEventObject);
			
			// assign it the date that was reported
			copiedEventObject.start = date;
			copiedEventObject.allDay = allDay;
			
			// render the event on the calendar
			// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
			$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
			
			// is the "remove after drop" checkbox checked?
			if ($('#drop-remove').is(':checked')) {
				// if so, remove the element from the "Draggable Events" list
				$(this).remove();
			}
			
		},
		eventClick: function(info) {
			console.log(info)
			// alert('Event: ' + info.title);
			// alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
			// alert('View: ' + info.view.type);
			$('#staticBackdrop').modal('show');
			$('input[name="title"]').val(info.title);
			$('textarea[name="comment"]').val(info.comment);
			$('#' + info.className[0]).attr('checked', true)
			$('input[name="time"]').val(info.time);
			// change the border color just for fun
			// info.el.style.borderColor = 'red';
		  },
		events: [
			{
				title: 'All Day Event',
				start: new Date(y, m, 1),
				allDay: false,
				comment: 'test',
				className: ['blue'],
				time: '12:00PM'
				
			},
			{
				id: 1,
				title: 'Repeating Event',
				start: new Date(y, m, 5),
				allDay: false,
				comment: 'test',
				className: ['red'],
				time: '12:00PM'
			},
			{
				id: 2,
				title: 'Event 2',
				start: new Date(y, m, 9),
				allDay: false,
				comment: 'test',
				className: ['yellow'],
				time: '12:00PM'
			}
		],			
	});

	

	
	
});

