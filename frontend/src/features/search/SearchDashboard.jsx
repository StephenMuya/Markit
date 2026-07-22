import { searchDashboardContent } from "../../data/siteContent";

export default function SearchDashboard() {
  return (
    <div className="mx-auto max-w-7xl text-white">
      <h1 className="font-nunito mb-4 text-4xl font-black">{searchDashboardContent.title}</h1>
      <p className="text-gray-400">{searchDashboardContent.description}</p>
    </div>
  );
}
