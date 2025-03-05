export default (e) => {
  e.statics.paginate = async function (e, t) {
    let s = '';
    if (t.sortBy) {
      let e = [];
      t.sortBy.split(',').forEach((t) => {
        let [s, i] = t.split(':');
        e.push(('desc' === i ? '-' : '') + s);
      }),
        (s = e.join(' '));
    } else s = 'createdAt';
    let i = t.limit && parseInt(t.limit, 10) > 0 ? parseInt(t.limit, 10) : 10,
      l = t.page && parseInt(t.page, 10) > 0 ? parseInt(t.page, 10) : 1,
      p = this.countDocuments(e).exec(),
      r = this.find(e)
        .sort(s)
        .skip((l - 1) * i)
        .limit(i);
    return (
      t.populate &&
        t.populate.split(',').forEach((e) => {
          r = r.populate(
            e
              .split('.')
              .reverse()
              .reduce((e, t) => `${t}.${e}`)
          );
        }),
      Promise.all([p, (r = r.exec())]).then((e) => {
        let [t, s] = e,
          p = Math.ceil(t / i);
        return Promise.resolve({
          results: s,
          page: l,
          limit: i,
          totalPages: p,
          totalResults: t,
        });
      })
    );
  };
};
