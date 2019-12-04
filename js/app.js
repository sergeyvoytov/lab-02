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
// main.append(`
// <h2>Hello class</h2>
// <p>today rocks</p>
// `);

// getter then a setter
// we can write either css or custom jquery selectors to select things
//text() is used as a setter
// $('h1').text('Ginger is da bomb diggity dawg');
// // text() is used as a getter
// console.log($('h2').text());



function Picture(image_url, title, description, keyword, horns) {

  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

// Picture.prototype.renderWithJquery = function () {
//   $('#container').append(`
//     <div>
//       <img src="${this.image_url}"></img>
//       <h2>${this.title}</h2>
//       <p id ="description">${this.description}</p>
//       <p id="keyword">${this.keyword}</p>
//       <p id="horns">${this.horns}</p>
//     </div>
//   `);
// };





Picture.prototype.renderWithJqueryClone = function () {
  let clone = $('#image-template').clone();

  //change the h2, p, and image
  // find looks in the targeted jquery object
  clone.find('img').attr('src', this.image_url);
  clone.find('h2').text(this.title);
  clone.find('#description').text(this.description);
  clone.find('#keyword').text(this.keyword);
  clone.find('#horns').text(this.horns);
  clone.removeAttr('id');
  console.log(clone);

  $('#container').append(clone);
};

$.get('./data/page-1.json', 'json').then(
  (data) => {
    console.log(data);
    data.forEach(pictureObjFromFile => {
      let picture = new Picture(pictureObjFromFile.image_url, pictureObjFromFile.title, pictureObjFromFile.description, pictureObjFromFile.keyword, pictureObjFromFile.horns);
      picture.renderWithJqueryClone();
    });
  });



// odie.renderWithJqueryClone();



// let hornExample = new Picture('https://via.placeholder.com/150', 'title', 'description', 'keyword', 'horns');

//hornExample.renderWithJquery();
// hornExample.renderWithJqueryClone();
// odie.renderWithJqueryClone();
// odie.renderWithJqueryClone();
// odie.renderWithJqueryClone();
// odie.renderWithJqueryClone();

// $('#image-template').hide();
