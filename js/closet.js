/*
	ShopSense API:
		Products:
			Uses filtering prefixes of brand, retailer, price, sale, size, and color.
			Also uses a category.
			Offers search terms as well.
		Categories:
			Structure is to let users drill down by category. Need to understand the tree!
			Shopstyle offers "fts", which lets users search by text. Treat that separate.
		Brands:
			Offer people the ability to check boxes for brands.
			Checking a box adds that reatiler to an array?
			Loop through that array with API calls to get the brand coses.
			Concatenate the brands in the API.
		Colors:
			Color icons that people can click.
			If an icon is clicked, highlight that icon and add it to the array?
			Loop thorugh that array with API calls to get the color.
			Concatenate the colors.
		Retailers:
			Do I care?
		Price:
			Slider filter. How do I do this?

		API Key: uid6976-29730676-90
		Sample API Call: http://api.shopstyle.com/api/v2/products?pid=uid6976-29730676-90&fts=red+dress&offset=0&limit=10

*/

$(document).ready(function() {

	var outfitSearch = function (searchParameter) {

		$.getJSON("http://api.shopstyle.com/api/v2/products?pid=uid6976-29730676-90&fts="+ searchParameter +"&offset=0&limit=20", function (clothesList) {

			$(".articles").html("");

			var clothingImage,clickUrl,description;

			// var clothingImage;
			// var clickUrl;
			// var description;

			//console.log(clothesList);
			for (var i = 0 ; i < 20 ; i++) {
				console.log(clothesList.products[i]);
				clothingImage = clothesList.products[i].image.sizes.Large.url;
				clickUrl = clothesList.products[i].clickUrl;
				description = clothesList.products[i].name;
				price = clothesList.products[i].priceLabel;

				$(".articles").append("<div class='clothingItem'> <a href=" + clickUrl + "> <img src=" + clothingImage + "> </a> <p>" + description + "</p> <p>" + price + "</p></div>");

			}

		});

	}

	//Select text in input box upon clicking
	$("input").click(function() {
		$(this).select();
	});

	var typingTimer;
	var timeOutLength = 800; //time in ms

	$("#article_search").keyup( function () {
		clearTimeout(typingTimer);
		typingTimer = setTimeout(function () {
			var search = stringConvert($("#article_search").val());
			outfitSearch(search);
		}, timeOutLength);
	});

	//Converts a string with spaces to a string with dashes
	var stringConvert = function(stringToConvert) {
		var spaceArray = stringToConvert.toLowerCase().split(" ");
		console.log(spaceArray.join("+"));
		return spaceArray.join("+");
	}

	//To run on page-load
	var searchString = $("#article_search").val();
	outfitSearch(stringConvert(searchString));

});