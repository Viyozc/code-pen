// listToTree
const list = [
  { id: -1, parentId: null },
  { id: 1, parentId: -1 },
  { id: 2, parentId: -1 },
  { id: 3, parentId: null },
  { id: 4, parentId: 2 },
  { id: 5, parentId: 4 },
];

function listToTree(list) {
  const obj = [];
  const map = new Map();
  list.map((item) => map.set(item.id, item));
  list.map((item) => {
    if (item.parentId) {
      map.get(item.parentId).children = (
        map.get(item.parentId).children || []
      ).concat(item);
    } else {
      obj.push(item);
    }
  });
  return obj;
}

console.log(JSON.stringify(listToTree(list)));

// {a: {b: c}} => {'a.b': c}

const obj1 = {
  name: "test",
  list: [1, 2, { c: 3 }],
  obj: {
    hello: "world",
  },
};

const objFlat = (obj) => {
  const result = {};
  const fn = (ob, prefix) => {
    for (let k in ob) {
      if (typeof ob[k] !== "object") {
        result[`${prefix}${prefix ? `.${k}` : k}`] = ob[k];
      } else {
        fn(ob[k], Array.isArray(ob) ? `${prefix}[${k}]` :`${prefix}.${k}`);
      }
    }
  };
  fn(obj, "");
  return result;
};

console.log("objflat", objFlat(obj1));

// 