type ObjectDifference<T> = {
  [K in keyof T]?: T[K] extends object ? ObjectDifference<T[K]> : T[K];
};

const getObjectDifference = <T extends Record<string, unknown>>(
  obj1: T,
  obj2: T
): ObjectDifference<T> => {
  const diff: ObjectDifference<T> = {};

  for (const key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (Array.isArray(value1) && Array.isArray(value2)) {
        const arrayDiff = value1.map((item1, index) => {
          const item2 = value2[index];
          if (typeof item1 === "object" && typeof item2 === "object") {
            return getObjectDifference(
              item1 as Record<string, unknown>,
              item2 as Record<string, unknown>
            );
          } else if (item1 === undefined && item2 !== undefined) {
            return item2;
          } else if (item1 !== undefined && item2 === undefined) {
            return item1;
          } else {
            return item2;
          }
        });
        if (arrayDiff.some((item) => Object.keys(item).length > 0)) {
          //  @ts-ignore
          diff[key] = arrayDiff;
        }
      } else if (typeof value1 === "object" && typeof value2 === "object") {
        const nestedDiff = getObjectDifference(
          value1 as Record<string, unknown>,
          value2 as Record<string, unknown>
        );
        if (Object.keys(nestedDiff).length > 0) {
          //  @ts-ignore
          diff[key] = nestedDiff;
        }
      } else if (value1 === undefined && value2 !== undefined) {
        diff[key] = value2;
      } else if (value1 !== undefined && value2 === undefined) {
        diff[key] = value1;
      } else if (value1 !== value2) {
        diff[key] = value2;
      }
    }
  }

  return diff;
};

export default getObjectDifference;
