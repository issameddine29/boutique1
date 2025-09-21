export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Méthode non autorisée' });
  const { items, total, customer } = req.body || {};
  if (!items?.length || !total || !customer?.email) return res.status(400).json({ message: 'Commande invalide' });
  return res.status(200).json({ message: 'Commande enregistrée. Paiement accepté.' });
}
