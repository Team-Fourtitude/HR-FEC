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