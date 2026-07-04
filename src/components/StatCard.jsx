import "../styles/statcard.css";

export default function StatCard({
  title,
  value,
  icon
}) {
  return (
    <div className="stat-card">

      <div className="card-icon">
        {icon}
      </div>

      <h2>{value}</h2>

      <p>{title}</p>

    </div>
  );
}