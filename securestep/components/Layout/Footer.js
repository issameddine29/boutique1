import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div>
          <h3>SecureStep</h3>
          <p>Chaussures de sécurité de qualité, pour votre confort et votre protection.</p>
        </div>
        <div>
          <h3>Navigation</h3>
          <ul className="footer-links">
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/hommes">Hommes</Link></li>
            <li><Link href="/femmes">Femmes</Link></li>
            <li><Link href="/accessoires">Accessoires</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <p>Email: support@securestep.com</p>
          <p>Téléphone: +32 123 456 789</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SecureStep. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
