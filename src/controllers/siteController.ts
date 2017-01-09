export async function index(req, res) {
  res.status(200).send(`Hello from Heimdall`);
}

export async function loginForm(req, res) {
  res.status(200).send(`login form`);
}

export async function login(req, res) {
  res.status(200).send(`login`);
}

export async function logout(req, res) {
  res.status(200).send(`logout`);
}

export async function account(req, res) {
  res.status(200).send(`account`);
}
