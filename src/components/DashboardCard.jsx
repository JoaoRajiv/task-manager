export default function DashboardCard({ title, value, icon }) {
  return (
    <div className="flex h-[150px] flex-col justify-center gap-1 rounded-xl bg-white text-center">
      <div className="flex items-center justify-center gap-2">
        <span className="text-brand-primary">{icon}</span>
        <p className="text-2xl font-semibold text-brand-dark-blue">{value}</p>
      </div>
      {title}
    </div>
  );
}
