import r from 'winston';
let e = r.format(
    (r) => (
      r instanceof Error &&
        Object.assign(r, {
          message: r.stack,
        }),
      r
    )
  ),
  o = r.createLogger({
    level: 'info',
    format: r.format.combine(
      e(),
      r.format.uncolorize(),
      r.format.splat(),
      r.format.printf(({ level: r, message: e }) => `${r}: ${e}`)
    ),
    transports: [
      new r.transports.Console({
        stderrLevels: ['error'],
      }),
    ],
  });
export default o;
