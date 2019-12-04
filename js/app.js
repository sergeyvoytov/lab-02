// How are we implementing it ?
//     Use AJAX, specifically $.get(), to read the provided JSON file.
// Each object should become a new instance of a constructor function.Refer to the data to determine the necessary properties.
// Use jQuery to make a copy of the HTML template of the photo component.For each object, fill in the duplicated template with its properties, then append the copy to the DOM.


'use strict';

// Jquery notes

// getter
let main = $('main');
console.log(main);

// setters
main.append(`
<h2>Hello class</h2>
<p>today rocks</p>
`);

// getter then a setter
// we can write either css or custom jquery selectors to select things
//text() is used as a setter
$('h1').text('Ginger is da bomb diggity dawg');
// text() is used as a getter
console.log($('h2').text());

function Dog(name, img, hobbies){
  this.name = name;
  this.img = img;
  this.hobbies = hobbies;
}

Dog.prototype.renderWithJquery = function(){
  $('#dogs').append(`
    <div>
      <h2>${this.name}</h2>
      <img src="${this.img}"></img>
      <p>${this.hobbies}</p>
    </div>
  `);
};

Dog.prototype.renderWithJqueryClone = function(){
  let clone = $('#dog-template').clone();

  //change the h2, p, and image
  // find looks in the targeted jquery object
  clone.find('h2').text(this.name);
  clone.find('img').attr('src', this.img);
  clone.find('p').text(this.hobbies);
  clone.removeAttr('id');
  console.log(clone);

  $('#dogs').append(clone);
};

let odie = new Dog('Odie', 'https://vignette.wikia.nocookie.net/garfield/images/a/ac/OdieCharacter.jpg/revision/latest?cb=20161218045212', 'annoying garfield, loving jon');

odie.renderWithJquery();
// odie.renderWithJqueryClone();
// odie.renderWithJqueryClone();
// odie.renderWithJqueryClone();
// odie.renderWithJqueryClone();
// odie.renderWithJqueryClone();

// $('#dog-template').hide();

$.get('data.json').then(
  (data) => {
    console.log(data);
    data.forEach(dogObjFromFile => {
      let dog = new Dog(dogObjFromFile.name, dogObjFromFile.image_url, dogObjFromFile.hobbies);
      dog.renderWithJqueryClone();
    });
  });