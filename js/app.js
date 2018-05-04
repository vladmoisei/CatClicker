// var catList = {
// 	1: "img/cat1.jpg",
// 	2: "img/cat2.jpg",
// 	3: "img/cat3.jpg",
// 	4: "img/cat4.jpg",
// 	5: "img/cat5.jpg"
// };

/*function Cat(name = "", img = "", clickCounter = 0) {
	this.name = name;
	this.img = img;
	this.clickCounter = clickCounter;
};

//let pisica = new Cat("Gigi", "imag 1");
var catList = [new Cat('Tom', 'img/cat1.jpg'), new Cat('Baghera','img/cat2.jpg'), new Cat('Bila','img/cat3.jpg'), new Cat('Ben','img/cat4.jpg'), new Cat('Blacky','img/cat5.jpg')];

let asideMenu = document.querySelector('.nav .nav__list');
let catName = document.querySelector('.catName');
let catImage = document.querySelector('.catImage');
let catClicks = document.querySelector('.catClicks');

for(let i = 0; i < catList.length; i++) {
	 var cat = catList[i];
	 var contentImag = document.createElement('li');
	 contentImag.textContent = `Cat: ${catList[i].name}`;

	  // ... artificiu pentru a retine obiectul pe care s-a dat click
	  // si pentru a putea sa ii adaugam event listener
    contentImag.addEventListener('click', (function(catCopy) {
        return function() {
            //alert(numCopy.name);
            catName.textContent = catCopy.name;
            catImage.src = catCopy.img;
            catClicks.textContent = catCopy.clickCounter;
        };
    })(cat));

	 asideMenu.appendChild(contentImag);

};

catImage.addEventListener('click', function() {
	catList.forEach(cat => {
		//alert(`${catName.textContent} - ${cat.name}`);
		if (catName.textContent === cat.name) {
			//alert(catName);
			cat.clickCounter++;
			catClicks.textContent = cat.clickCounter;
			//break;
		};
	});
});*/

/* ====== Model ====== */
var model = {

	curentCat: null,
	cats: [
		{
			clickCounter: 0,
			name: 'Tom',
			imgSrc: 'img/cat1.jpg'
		},
		{
			clickCounter: 0,
			name: 'Bila',
			imgSrc: 'img/cat2.jpg'
		},
		{
			clickCounter: 0,
			name: 'Baghera',
			imgSrc: 'img/cat3.jpg'
		},
		{
			clickCounter: 0,
			name: 'Ben',
			imgSrc: 'img/cat4.jpg'
		},
		{
			clickCounter: 0,
			name: 'Blacky',
			imgSrc: 'img/cat5.jpg'
		}
	]
};

/* ======= Octopus ======= */
var octopus = {

	init: function() {
		// set our current cat to the first one in the list
		model.curentCat = model.cats[0];

		// tell our views to initialize
		catListView.init();
        catView.init();
        adminView.init();
	},

	getCurrentCat: function() {
		return model.curentCat;
	},

	getCats: function() {
		return model.cats;
	},

	// set the currently-selected cat to the object passed in
	setCurrentCat: function(cat) {
		model.curentCat = cat;
	},

	// increments the counter for the currently-selected cat
	incrementCounter: function() {
		model.curentCat.clickCounter++;
		catView.render();
	},

	// update model with data from inpu form
	updateModel: function() {
		model.cats.forEach(cat => {
			if (model.curentCat.name === cat.name) {
				cat.name = document.querySelector('#inputName').value;
				cat.imgSrc = document.querySelector('#inputimgURL').value;
				cat.clickCounter = parseInt(document.querySelector('#inputNrOfClicks').value);
			};
		});
		model.curentCat.name = document.querySelector('#inputName').value;
		model.curentCat.imgSrc = document.querySelector('#inputimgURL').value;
		model.curentCat.clickCounter = parseInt(document.querySelector('#inputNrOfClicks').value);
	},
};

/* ======= View ======= */
var catView = {

	init: function() {
		// store pointers to our DOM elements for easy access later
		this.asideMenu = document.querySelector('.nav .nav__list');
		this.main = document.querySelector('main');
		this.catName = document.querySelector('.catName');
		this.catImage = document.querySelector('.catImage');
		this.catClicks = document.querySelector('.catClicks');

		// on click, increment the current cat's counter
		this.catImage.addEventListener('click', function() {
			octopus.incrementCounter();
		});

		// render this view (update the DOM elements with the right values)
        this.render();
	},

	render: function() {
		// update the DOM elements with values from the current cat
		var currentCat = octopus.getCurrentCat();
		this.catName.textContent = currentCat.name;
		this.catClicks.textContent = currentCat.clickCounter;
		this.catImage.src = currentCat.imgSrc;
	}
};

var catListView = {
	init: function() {
		// store the DOM element for easy access later
		this.catListElem = document.querySelector('.nav .nav__list');

		// render this view (update the DOM elements with the right values)
		this.render();
	},

	render: function() {
		var cat, elem, i;
		// get the cats we'll be rendering from the octopus
		var cats = octopus.getCats();

		// empty the cat list
		this.catListElem.innerHTML = "";

		// loop over the cats
		for (let cat of cats) {
			// this is the cat we're currently looping over
			// make a new cat list item and set its text
			var elem = document.createElement('li');
	 		elem.textContent = cat.name;

	 		// on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
            	return function() {
            		octopus.setCurrentCat(catCopy);
            		catView.render();
            	};
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
		}
	}
};

var adminView = {
	init: function() {
		// store pointers to our DOM elements for easy access later
		var adminButton = document.querySelector('#buttonAdmin');
		var saveButton = document.querySelector('#buttonSave');
		var cancelButton = document.querySelector('#buttonCancel');
		var adminForm = document.querySelector('#form');

		// on click, render input form
		adminButton.addEventListener('click', function() {
			adminForm.className = "swow";
		});

		// on click, hide input form
		cancelButton.addEventListener('click', function(event) {
			adminForm.className = "hidden";
			event.preventDefault();
		});

		// on click, update model
		saveButton.addEventListener('click', function(event) {
			octopus.updateModel();
			catView.render();
			catListView.render();
			adminForm.className = "hidden";
			event.preventDefault();
		});

	}
}

// make it go!
octopus.init();