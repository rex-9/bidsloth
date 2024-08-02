const handleRating = (ratingArray: any[]) => {
  const cloneRates: any[] = [];
  ratingArray.map((arr) => cloneRates.push(arr?.rating));
  return (
    cloneRates.reduce((a: number, b: number) => a + b, 0) / cloneRates.length
  );
};

export default handleRating;
