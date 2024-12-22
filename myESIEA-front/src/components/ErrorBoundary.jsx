import { Link } from 'react-router-dom'

export default function ErrorBoundary() {

  return (
    <div style={{marginTop: 30 + "vh"}}>
      <h2>Erreur</h2>
      <p>Une erreur est survenue</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  )
}
