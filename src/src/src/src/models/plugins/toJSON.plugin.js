let t = (e, o, s) => {
  if (s === o.length - 1) {
    delete e[o[s]];
    return;
  }
  t(e[o[s]], o, s + 1);
};
export default (e) => {
  let o;
  e.options.toJSON &&
    e.options.toJSON.transform &&
    (o = e.options.toJSON.transform),
    (e.options.toJSON = Object.assign(e.options.toJSON || {}, {
      transform(s, i, n) {
        if (
          (Object.keys(e.paths).forEach((o) => {
            e.paths[o].options &&
              e.paths[o].options.private &&
              t(i, o.split('.'), 0);
          }),
          (i.id = i._id.toString()),
          delete i._id,
          delete i.__v,
          delete i.createdAt,
          delete i.updatedAt,
          o)
        )
          return o(s, i, n);
      },
    }));
};
