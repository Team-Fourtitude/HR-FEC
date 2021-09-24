export const averageRating = (scores) => {
  let total = 0;
  let divider = 0;
  for (let score of Object.keys(scores)) {
    total += Number(score) * Number(scores[score]);
     divider += Number(scores[score]);
  }
  return total/divider;
};