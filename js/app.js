// var catList = {
// 	1: "img/cat1.jpg",
// 	2: "img/cat2.jpg",
// 	3: "img/cat3.jpg",
// 	4: "img/cat4.jpg",
// 	5: "img/cat5.jpg"
// };

var catList = ['cat1', 'cat2', 'cat3', 'cat4', 'cat5'];

let asideMenu = document.querySelector('.nav');
let main = document.querySelector('main');
let catName = document.querySelector('.catName');
let catImage = document.querySelector('.catImage');
let catClicks = document.querySelector('.catClicks');

var counterElemNav = 0;
for(let imag of catList) {
	counterElemNav++;
	 var contentImag = document.createElement('div');
	 contentImag.textContent = `Cat ${counterElemNav}`;
	 contentImag.addEventListener('click', function() {
	 	catName.textContent = this.textContent;
	 	catImage.src = "";
	 });
	 asideMenu.appendChild(contentImag);

};