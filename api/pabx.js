export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { endpoint, method = 'GET', body } = req.body;
  const BASE = 'https://pabx2.integravoip.com.br/suite/api';

  try {
    const headers = {
      'accept': 'application/json',
      'usuario': 'gestao-fitness-brasil-api',
      'token': 'be6e3c68-9013-4701-b09e-e828466f9238',
    };
    if (method === 'POST') headers['Content-Type'] = 'application/json';

    const r = await fetch(BASE + endpoint, {
      method,
      headers,
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    const text = await r.text();
    try {
      res.status(200).json(JSON.parse(text));
    } catch {
      res.status(200).send(text);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
