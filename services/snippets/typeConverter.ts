const numberToBoolean = (value: number) => {
  const newValue = Number(value);
  switch (newValue) {
    case 0:
      return false;

    case 1:
      return true;

    default:
      return true;
  }
};

const booleanToNumber = (value: boolean) => {
  const newValue = Boolean(value);
  switch (newValue) {
    case false:
      return 0;

    case true:
      return 1;

    default:
      return 1;
  }
};

export { numberToBoolean, booleanToNumber };
