
//Initialize language bar 
window.onload = function() {
	langSelectorInit();
	getLang();
};


/* Data */
var lang;
var currentIndex;
var generatedQuotes = [];

var quotes = {
    en: [
  {text:"It usually ends in laughter and a delight in the futility of trying to understand what this atom in the universe is, this thing - atoms with curiosity - that looks at itself and wonders why it wonders.", author:"Richard Feynman"},
            {text: "Grown-ups never understand anything by themselves, and it is tiresome for children to be always and forever explaining things to them", author: "The Little Prince - Antoine de Saint-Exupéry"}, 
            {text: "What makes the desert beautiful is that somewhere it hides a well.", author: "Antoine de Saint-Exupéry"},
            {text: "I have a million ideas: they all point to certain death.", author: "Marvin, the Paranoid Android - D.Adams"}, 
            {text: "Fantasy is a place where it rains.", author: "Italo Calvino"}, 
            {text: "Sometimes one who thinks himself incomplete is merely young.", author: "Italo Calvino"},
            {text: "Time to read is always time stolen. Like time to write, for that matter, or time to love.", author: "Daniel Pennac"},			
            {text: "We human beings build houses because we're alive, but we write books because we're mortal. We live in groups because we're sociable, but we read because we know we're alone.", author: "Daniel Pennac"}		
        ],
    it: [
  {text: "Solitamente si conclude in una risata, quando ci si arrende di fronte all'impossibilità di capire che cos'è mai questo atomo dell'universo, questa cosa - un atomo curioso - che guarda se stesso e si meraviglia della propria meraviglia. ", author: "Richard Feynman"},
            {text: "I grandi non capiscono mai niente da soli e i bambini si stancano a spiegargli tutto ogni volta.", author: "Il Piccolo Principe - Antoine de Saint-Exupéry"},
            {text: "Ciò che rende bello il deserto è che da qualche parte nasconde un pozzo.", author: "Antoine de Saint-Exupéry"},
            {text: "Ho milioni di idee: conducono tutte a morte certa.", author: "Marvin l'androide paranoico - D.Adams"},
            {text: "La fantasia è un posto dove ci piove dentro.", author: "Italo Calvino"},
            {text: "Alle volte uno si crede incompleto ed è soltanto giovane.", author: "Italo Calvino"},
            {text: "Il tempo per leggere è sempre tempo rubato. Come il tempo per scrivere, d'altronde, o il tempo per amare.", author: "Daniel Pennac"},
            {text: "L'uomo costruisce case perché è vivo, ma scrive libri perché si sa mortale. Vive in gruppo perché è gregario, ma legge perché si sa solo.", author: "Daniel Pennac"}
        ]
};

/* Functions Def */
function getLang() {
	lang = document.getElementById("currentLang").innerHTML.toLowerCase();
}

function updatePageLang() {
	var bilingualItemsList = document.getElementsByClassName("bilingualItem");
	for(var i = 0; i < bilingualItemsList.length; i++) {
		bilingualItemsList[i].classList.toggle("hidden");	/*N.B.: this will only work with two languages */
	}
	printQuote(quotes[lang][currentIndex].text, quotes[lang][currentIndex].author); /* when the user changes lang, this prints the same quote in the new language */
}

/* Custom Selector */
/* Just some playing around here */
function langSelectorInit() {
	var currentLang = document.getElementById("currentLang");
	var langSelector = document.getElementById("langSelector");
	var selectorBtn = document.getElementById("dropDownBtn");
	var dropDownUl = document.getElementById("dropDownList");
	var options = dropDownUl.getElementsByTagName("li");
	
	selectorBtn.onclick = showHideOptions;
	for(var i = 0; i < options.length; i++) {
		options[i].onclick = changeOpt;
	}
	
	function showHideOptions() {
		langSelector.classList.toggle("activeDropDown");
		dropDownUl.classList.toggle("hidden");
	}
  /* REMOVE
	function hideOptions() {
		langSelector.classList.remove("activeDropDown");
		dropDownUl.classList.add("hidden");
	} */
	function changeOpt(eventObj) {
		var newSel = eventObj.target;
		var currentSel = langSelector.getElementsByClassName("selected")[0];
		if(newSel.innerHTML !== currentSel.innerHTML) {
			currentSel.classList.remove("selected");
			newSel.classList.add("selected");
			currentLang.innerHTML = newSel.innerHTML;
			showHideOptions();
			getLang();
			updatePageLang();
		}
    }
}


$(window).load(function() {
    $("#preloader").fadeOut("slow");
});

$(document).ready(function(){

    wow = new WOW({
        mobile:       false,       // default
      }
    )
    wow.init();

     $('#top-nav').onePageNav({
        currentClass: 'current',
        changeHash: true,
        scrollSpeed: 1200
    });

     
    //animated header class
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $(".navbar-default").addClass("animated");
        } else {
            $(".navbar-default").removeClass('animated');
        }
    });

    $('#countdown_dashboard').countDown({
        targetDate: {
            'day':      11,
            'month':    3,
            'year':     2017,
            'hour':     00,
            'min':      00,
            'sec':      01,
        },
        omitWeeks: true
    });

    $('.init-slider').owlCarousel({
        items:1,
        merge:true,
        loop:true,
        video:true,
        smartSpeed: 600
    });

    /*$('input, textarea').data('holder', $('input, textarea').attr('placeholder'));

    $('input, textarea').focusin(function () {
        $(this).attr('placeholder', '');
    });
    $('input, textarea').focusout(function () {
        $(this).attr('placeholder', $(this).data('holder'));
    });*/


    //contact form validation
    $("#contact-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            message: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Please enter Your Name",
                minlength: "Your name must consist of at least 2 characters"
            },
            message: {
                required: "Please Write Something",
                minlength: "Your message must consist of at least 2 characters"
            },
            email: "Please enter a valid email address"
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                type:"POST",
                data: $(form).serialize(),
                url:"mail.php",
                success: function() {
                    $('#contact-form :input').attr('disabled', 'disabled');
                    $('#contact-form').fadeTo( "slow", 0.15, function() {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find('label').css('cursor','default');
                        $('#success').fadeIn();
                    });
                },
                error: function() {
                    $('#contact-form').fadeTo( "slow", 0.15, function() {
                        $('#error').fadeIn();
                    });
                }
            });
        }
    });

});

// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 16,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(23.751945, 90.384590), // Dhaka ,
        scrollwheel: false,

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map-canvas');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(23.751945, 90.384590),
        map: map,
        icon: 'img/map.png',
        title: 'Twing!'
    });
}