import PsSVG from "../PsSVG";

export default function StatCard({ title, value, icon, colorClass }: any) {
  return (
    <div className="p-6 bg-white border-2 border-black rounded-xl flex justify-between items-center">
      <div>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-tight">
          {title}
        </p>
        <h3 className="text-4xl font-black mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg border-2 border-black ${colorClass}`}>
        <PsSVG name={icon} size={28} strokeWidth={2.5} className="text-white" />
      </div>
    </div>
  );
}
