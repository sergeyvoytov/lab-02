'use strict';

// Jquery notes

// getter
let main = $('main');
console.log(main);
function Picture(image_url, title, description, keyword, horns) {

  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

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
  // console.log(clone);

  $('#container').append(clone);
};
var arrOfKeywords = [];
let uniqueKeyWords = [];



const handleData = (data) => {

  // console.log(data);
  data.forEach(pictureObjFromFile => {
    let picture = new Picture(pictureObjFromFile.image_url, pictureObjFromFile.title, pictureObjFromFile.description, pictureObjFromFile.keyword, pictureObjFromFile.horns);
    arrOfKeywords.push(pictureObjFromFile.keyword) //puts all keywords in an array
    picture.renderWithJqueryClone();
    renderUniqueImages22(pictureObjFromFile.keyword);
  });
  populate();

  /// Handling click

  $('select').on('click', function () {
    const keywordValue = $(this).val();
    $('div').hide();

    //have to show divs
    $('p').each(function (currentValue, index, array) {
      if ($(this).text() === keywordValue) {

        // if the p is right make the parent 
        $(this).parent().show();
      }
    });
  });

};

$.get('./data/page-1.json', 'json').then(handleData);

function renderUniqueImages22(keyword) {

  if (!uniqueKeyWords.includes(keyword)) {
    uniqueKeyWords.push(keyword);
  }
  console.log(uniqueKeyWords);
}

function populate() {
  uniqueKeyWords.forEach(function (value) {
    let selectdrop = $('select');
    let element = document.createElement('option');
    element.value = value;
    element.text = value;
    selectdrop.append(element);
  });
}
