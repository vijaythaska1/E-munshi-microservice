function t(t, r, e) {
  return (
    r in t
      ? Object.defineProperty(t, r, {
          value: e,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (t[r] = e),
    t
  );
}
class r extends Error {
  constructor(t, r, e = !0, s = '') {
    super(r),
      (this.statusCode = t),
      (this.isOperational = e),
      s ? (this.stack = s) : Error.captureStackTrace(this, this.constructor);
  }
}
t(r, 'isOperational', void 0), t(r, 'statusCode', void 0);
export default r;
