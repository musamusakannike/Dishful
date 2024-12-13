import { Bookmark, List, Star } from "lucide-react";

function QuickLinks() {
  const links = [
    { title: "My Recipes", icon: <Bookmark /> },
    { title: "Popular Recipes", icon: <Star /> },
    { title: "Recently Viewed", icon: <List /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {links.map((link) => (
        <div
          key={link.title}
          className="flex items-center p-4 bg-green-200 rounded-md shadow-sm cursor-pointer hover:bg-green-300"
        >
          {link.icon}
          <span className="ml-2 text-lg font-medium">{link.title}</span>
        </div>
      ))}
    </div>
  );
}

export default QuickLinks;
