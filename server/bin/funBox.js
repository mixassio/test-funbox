import getApp from '..';

const port = process.env.PORT || 3000;
// eslint-disable-next-line no-console
getApp().listen(port, '0.0.0.0', () => console.log(`port: ${port}`));
