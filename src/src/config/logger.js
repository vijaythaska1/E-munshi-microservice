import r from "winston";
let o = r.format((r)=>(r instanceof Error && Object.assign(r, {
        message: r.stack
    }), r)), t = r.createLogger({
    level: "info",
    format: r.format.combine(o(), r.format.uncolorize(), r.format.splat(), r.format.printf(({ level: r, message: o })=>`${r}: ${o}`)),
    transports: [
        new r.transports.Console({
            stderrLevels: [
                "error"
            ]
        })
    ]
});
export default t;
