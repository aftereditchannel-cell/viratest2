export default function handler(req, res) {
  const user = encodeURIComponent(JSON.stringify({
    email: "demo@gmail.com",
    name: "Demo User",
  }));

  res.writeHead(302, {
    Location: `${process.env.FRONT_URL}/home.html?user=${user}`
  });
  res.end();
}
