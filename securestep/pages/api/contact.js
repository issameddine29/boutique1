export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Méthode non autorisée' });
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) return res.status(400).json({ message: 'Champs manquants' });
  return res.status(200).json({ message: 'Merci, votre message a bien été reçu.' });
}
