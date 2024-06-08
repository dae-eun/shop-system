import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({
  target: 'http://localhost:4000/', // change to your backend api url
  changeOrigin: true,
});

export default defineEventHandler((event) => {
  return new Promise((resolve) => {
    const options = {};
    console.log(event)
    const origEnd = event.node.res.end;
    event.node.res.end = function () {
      resolve(null);
      return origEnd.call(event.node.res);
    }
    console.log(event.node.req)
    proxy.web(event.node.req, event.node.res, options); // proxy.web() works asynchronously
  });
});