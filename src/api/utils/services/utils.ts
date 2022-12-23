import _ from "lodash";

const ripDataKey = (obj: any, key: string) => {
  if (key !== "data") return false;
  if (!obj) return true;
  if (["id", "attributes"].every((k) => k in obj)) return true;
  return true;
};

const flatten = (data: any) => {
  if (!data) return data;
  if (Array.isArray(data)) return data.map((v) => flatten(v));
  if (!_.isObjectLike(data)) return data;
  if (["id", "attributes"].every((k) => k in data))
    return {
      id: data.id,
      ...flatten(data.attributes),
    };
  if (data.data && Array.isArray(data.data))
    return data.data.map((item) => flatten(item));
  // if it's not an object just return it
  return Object.keys(data).reduce(
    (prev, k) =>
      ripDataKey(data[k], k)
        ? {
            ...prev,
            ...(flatten(data[k]) || {}),
          }
        : {
            ...prev,
            [k]: flatten(data[k]),
          },
    {}
  );
};

const stripIDs = (data: any) => {
  if (!data) return data;
  if (Array.isArray(data)) return data.map((v) => flatten(v));
  if (!_.isObjectLike(data)) return data;
  return Object.keys(data).reduce(
    (prev, k) =>
      k !== "id"
        ? {
            ...prev,
            [k]: stripIDs(data[k]),
          }
        : prev,
    {}
  );
};

export default () => ({
  flatten,
  stripIDs,
});
