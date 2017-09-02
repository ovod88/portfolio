'use strict';
$(function() {
	var $search_box = $('.search_box');
	var $search_input = $search_box.find('input');
	var clavier;
	var watchInputInterval = setInterval(watchTextbox, 300);

	var activateSearchLine = function(e) {
		$search_box.addClass('highlighted');
		$search_box.removeClass('hovered');
		e.stopPropagation();
	};

	$search_input.click(activateSearchLine).focus(activateSearchLine);

	$(window).click(function() {
		$search_box.removeClass('highlighted');
	});

	$search_box.hover(function() {
		if($(this).hasClass('highlighted')) {
			return;
		} else {
			$(this).addClass('hovered');
		}
	}, function() {
		$(this).removeClass('hovered');
	});

	function askBing() {
		var azureKey = btoa(':8IyMlq81z0M+RY63ZD4TyXP2Il8Fye8c83AgkXxM1NE');
    	var myUrl = 'https://api.datamarket.azure.com/Bing/Search/v1/Web?Query=%27' + $search_input.val() + '%27' + '&$format=json';

    	if($search_input.val() && $search_input.val().trim().length) {
			$.ajax({
	      		method: 'post',
		     	url: myUrl,
		      	headers: {
		        	'Authorization': 'Basic ' + azureKey
		      	},
		      	success: function(data) {
		      		var ul, results = data.d.results;

		      		if($('.result').length) {
		      			ul = $('.result');
		      			ul.html('');
		      			ul = ul[0];
		      		} else {
						ul = document.createElement("ul");
						ul.className = 'result';
					}
					if(results.length) {

						$.each(data.d.results, function(i, val){
							var li = document.createElement("li");
							li.innerHTML = '<p class="title">' + '<a href="' + val.Url + '">'+ val.Title +
									'</a>' + '</p>' + '<p class = "url">' +
									val.Url +'</p>' + '<p class="description">' + val.Description + '</p>';

							ul.appendChild(li);
						});
						$('#nothing').remove();
						$('body').append(ul);

					} else {
						$('body').append('<span id="nothing"> Nothing found </span>');
					}

				}
			});
    	}
	}

	function watchTextbox() {
		if($search_input.val()) {
			var $default_search = $('#default_search');
			$default_search.removeAttr('id').attr('id', 'search').attr('class', 'clearfix');
			$default_search.find('.logo img, .logo span').remove();
			$default_search.find('.buttons button').html('<span></span>');
			clearInterval(watchInputInterval);
			$(document).keypress(function(e) {
    			if(e.which == 13) {
        			askBing();
    			}
			});

			$('.buttons').click(function(e) {
        		askBing();
			});
		}
	}

	$('.transliteracja').hover(function() {
        	$(this).find("em").show();
    	}, function() {
        	$(this).find("em").hide();
    });

	$('.transliteracja a').click(function(event) {
		event.stopPropagation();
		if(!$('.vClavier').length) {
			new VirtualClavier($search_input, $search_box, 'uk').init();
		}
	});
});