import * as o from 'mongoose';
import { app as e } from './app';
import n from './config/config';
import c from './config/logger';
(async () => {
  let s;
  o.set('strictQuery', !0),
    await o
      .connect(n.mongoose.url)
      .then(() => {
        console.log('--database connection successful--');
      })
      .catch((o) => {
        console.log('--error connecting to database---', o);
      }),
    (s = e.listen(8080, () => {
      c.info('Listening to port 8080');
    }));
  let r = () => {
      s
        ? s.close(() => {
            c.info('Server closed'), process.exit(1);
          })
        : process.exit(1);
    },
    t = (o) => {
      c.error(o), r();
    };
  process.on('uncaughtException', t),
    process.on('unhandledRejection', t),
    process.on('SIGTERM', () => {
      c.info('SIGTERM received'), s && s.close();
    });
})();
