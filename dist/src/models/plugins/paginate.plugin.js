"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: function() {
        return e;
    }
});
const e = (e)=>{
    e.statics.paginate = async function(e, t) {
        let s = '';
        if (t.sortBy) {
            let e = [];
            t.sortBy.split(',').forEach((t)=>{
                let [s, r] = t.split(':');
                e.push(('desc' === r ? '-' : '') + s);
            }), s = e.join(' ');
        } else s = 'createdAt';
        let r = t.limit && parseInt(t.limit, 10) > 0 ? parseInt(t.limit, 10) : 10, i = t.page && parseInt(t.page, 10) > 0 ? parseInt(t.page, 10) : 1, l = this.countDocuments(e).exec(), p = this.find(e).sort(s).skip((i - 1) * r).limit(r);
        return t.populate && t.populate.split(',').forEach((e)=>{
            p = p.populate(e.split('.').reverse().reduce((e, t)=>`${t}.${e}`));
        }), Promise.all([
            l,
            p = p.exec()
        ]).then((e)=>{
            let [t, s] = e, l = Math.ceil(t / r);
            return Promise.resolve({
                results: s,
                page: i,
                limit: r,
                totalPages: l,
                totalResults: t
            });
        });
    };
};
