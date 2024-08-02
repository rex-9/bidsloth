const trimObjects = <T extends Record<string, unknown>>(obj: T): void => {
  Object.entries(obj).forEach(([key, value]) => {
    if (value === "" || value === null) {
      delete obj[key as keyof T];
    } else if (
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.keys(value).length === 0
    ) {
      delete obj[key as keyof T];
    } else if (Array.isArray(value) && value.length === 0) {
      delete obj[key as keyof T];
    } else if (typeof value === "object") {
      trimObjects(value as Record<string, unknown>);
      if (
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "object" && Object.keys(value).length === 0)
      ) {
        delete obj[key as keyof T];
      }
    }
  });
};

export default trimObjects;
