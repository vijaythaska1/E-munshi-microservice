export default ((t)=>{
    t.statics.paginate = async function(t, e) {
        let s = "";
        if (e.sortBy) {
            let t = [];
            e.sortBy.split(",").forEach((e)=>{
                let [s, l] = e.split(":");
                t.push(("desc" === l ? "-" : "") + s);
            }), s = t.join(" ");
        } else s = "createdAt";
        let l = e.limit && parseInt(e.limit, 10) > 0 ? parseInt(e.limit, 10) : 10, i = e.page && parseInt(e.page, 10) > 0 ? parseInt(e.page, 10) : 1, a = this.countDocuments(t).exec(), p = this.find(t).sort(s).skip((i - 1) * l).limit(l);
        return e.populate && e.populate.split(",").forEach((t)=>{
            p = p.populate(t.split(".").reverse().reduce((t, e)=>`${e}.${t}`));
        }), Promise.all([
            a,
            p = p.exec()
        ]).then((t)=>{
            let [e, s] = t, a = Math.ceil(e / l);
            return Promise.resolve({
                results: s,
                page: i,
                limit: l,
                totalPages: a,
                totalResults: e
            });
        });
    };
});
