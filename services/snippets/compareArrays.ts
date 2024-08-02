export default function compareArrays<T>(array1: T[], array2: T[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    const item1 = array1[i];
    const item2 = array2[i];

    if (typeof item1 === "object" && typeof item2 === "object") {
      const keys1 = Object.keys(item1);
      const keys2 = Object.keys(item2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      for (const key of keys1) {
        if (
          item1[key as keyof typeof item1] !== item2[key as keyof typeof item2]
        ) {
          return false;
        }
      }
    } else {
      if (item1 !== item2) {
        return false;
      }
    }
  }

  return true;
}
