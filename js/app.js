// var catList = {
// 	1: "img/cat1.jpg",
// 	2: "img/cat2.jpg",
// 	3: "img/cat3.jpg",
// 	4: "img/cat4.jpg",
// 	5: "img/cat5.jpg"
// };
function Cat(name = "", img = "", clickCounter = 0) {
	this.name = name;
	this.img = img;
	this.clickCounter = clickCounter;
}

let pisica = new Cat("Gigi", "imag 1");
var catList = [new Cat('Tom', 'img/cat1.jpg'), new Cat('Baghera','img/cat2.jpg'), new Cat('Bila','img/cat3.jpg'), new Cat('Ben','img/cat4.jpg'), new Cat('Blacky','img/cat5.jpg')];

let asideMenu = document.querySelector('.nav .nav__list');
let main = document.querySelector('main');
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
});