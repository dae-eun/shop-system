export default defineEventHandler((event) => {
  if (!event.node.req.url?.startsWith('/api')) return;

  const jwtToken = getCookie(event, 'token');

  const target = new URL(event.node.req.url, 'http://localhost:4000');

  if (jwtToken) {
    event.node.req.headers['Authorization'] = `Bearer ${jwtToken}`;
  }

  return proxyRequest(event, target.toString(), {
    headers: {
      host: target.host,
      origin: target.origin,
    },
  });
});
