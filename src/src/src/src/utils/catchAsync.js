export default ((e)=>(o, r, t)=>{
        Promise.resolve(e(o, r, t)).catch((e)=>t(e));
    });
