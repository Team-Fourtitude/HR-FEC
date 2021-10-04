export const averageRating = (scores) => {
  let total = 0;
  let divider = 0;
  for (let score of Object.keys(scores)) {
    total += Number(score) * Number(scores[score]);
     divider += Number(scores[score]);
  }
  return total/divider;
};

export const ratingWidth = (rating) => {
  const integer = Math.floor(rating);
  return integer * 16 + 2 + (rating - integer) * 12;
};

export const imageZoomPosition = (event) => {
  let img = document.getElementById("imgRatio");
  let imgRatio = img.clientHeight / img.clientWidth;
  let scaleY = 3125 / 600 * imgRatio - 1;
  event.target.style.backgroundPositionX = (-event.nativeEvent.offsetX * 1.5) + "px";
  event.target.style.backgroundPositionY = (-event.nativeEvent.offsetY * scaleY) + "px";
};

export const closeSelect = (event) => {
  if (event) {
    event.target.removeAttribute('size');
    event.target.style.position = 'static';
    event.target.style.height = '50px';
  }
};

export const promptSelectSize = (callback) => {
  let sizeSelector = document.getElementById('size');
  let totalSizes = sizeSelector.children.length;
  callback('true'); // set prompt = 'true'
  sizeSelector.setAttribute('size', totalSizes);
  sizeSelector.style.position = 'absolute';
  sizeSelector.style.height = 'max-content';
  sizeSelector.focus();
};
