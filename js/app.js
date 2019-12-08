'use strict';

const pictures = [];

function getThings(thePage) {

  $.get(thePage, 'json').then(data => instantiatepicturesAndRenderThem(data, thePage));
}

getThings('page-1.json');

function instantiatepicturesAndRenderThem(picturesArray, page) {
  picturesArray.forEach(pictureObj => {
    const c = new Picture(pictureObj, page);
    pictures.push(c);
    c.render();
  });
}

function Picture(cObj, pageNumber) {
  this.image_url = cObj.image_url;
  this.title = cObj.title;
  this.description = cObj.description;
  this.keyword = cObj.keyword;
  this.horns = cObj.horns;
  this.page = pageNumber;
}

Picture.prototype.render = function () {
  // console.log($('#creature-template').html());
  // console.log(typeof $('#creature-template').html());

  const pictureTemplate = Handlebars.compile($('#picture-template').html());
  const newHtml = pictureTemplate(this);
  // console.log(this);
  $('main').append(newHtml);
  // console.log(newHtml);
};

let pageWeAreOn = 'page-1.json';

$('#page_switch').on('click', function () {
  $('div').hide();

  if (pageWeAreOn === 'page-1.json') {

    const divs = $('div[data-page="page-2.json"]');
    console.log(divs);

    if (!divs.length) {
      getThings('page-2.json');
    }
    divs.show();
    pageWeAreOn = 'page-2.json';
  } else {
    const divs = $('div[data-page="page-1.json"]');
    console.log(divs);

    if (!divs.length) {
      getThings('page-1.json');
    }
    divs.show();
    pageWeAreOn = 'page-1.json';

  }
});

$('#sort_horns').on('click', function(){
  pictures.sort(function(a,b) {
    // if a's horn count is bigger
    if(a.horns > b.horns) return 1;
    // or smaller
    if(b.horns > a.horns) return -1;
    // or same
    return 0;
  });

  $('div').remove();
  pictures.forEach(picture => picture.render());
  $('div').hide();
  $(`div[data-page="${pageWeAreOn}"]`).show();
});

$('#sort_title').on('click', function(){
  pictures.sort(function(a,b) {
    if(a.title > b.title) return 1;
    if(b.title > a.title) return -1;
    return 0;
  });

  $('div').remove();
  pictures.forEach(picture => picture.render());
  $('div').hide();
  $(`div[data-page="${pageWeAreOn}"]`).show();
});


