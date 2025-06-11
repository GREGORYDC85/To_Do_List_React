export default function ProgressBar({ total, done }) {
  const percentage = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p style={{ textAlign: "center", marginTop: "5px" }}>
        {percentage}% complété
      </p>
    </div>
  );
}
