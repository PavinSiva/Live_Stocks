import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  BarChart3,
  TrendingUp,
  Bitcoin,
  Wheat,
  DollarSign,
  PieChart,
  Activity,
  Newspaper ,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navigationItems = [
  { title: "Home", url: "/home", icon: Home },
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "Stocks", url: "/stocks", icon: TrendingUp },
  { title: "Cryptocurrency", url: "/cryptocurrency", icon: Bitcoin },
  { title: "Commodities", url: "/commodities", icon: Wheat },
  { title: "Forex", url: "/forex", icon: DollarSign },
  { title: "Portfolio", url: "/portfolio", icon: PieChart },
  { title: "News", url: "/news", icon: Newspaper  },
  { title: "Settings", url: "/settings", icon: Settings },
];

export default function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const isActive = (path) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClassName = (active) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
      active
        ? "bg-zinc-800 text-white shadow-md"
        : "text-gray-300 hover:bg-zinc-700 hover:text-white"
    }`;

  return (
    <aside
      className={`h-screen bg-black text-white border-r border-zinc-900 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >

      <div className="flex h-16 items-center justify-between border-b border-gray-800 dark:bg-zinc-900 px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg">Live Stocks</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-700 bg-black text-gray-400 hover:bg-zinc-700 hover:text-white transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const active = isActive(item.url);
            return (
              <li key={item.title}>
                <NavLink
                  to={item.url}
                  className={getNavClassName(active)}
                  title={isCollapsed ? item.title : undefined}
                >
                  <item.icon
                    className={`h-5 w-5 shrink-0 ${
                      active ? "text-white" : "text-gray-400 group-hover:text-white"
                    }`}
                  />
                  {!isCollapsed && <span>{item.title}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-800">
          <div className="rounded-lg dark:bg-zinc-900 p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-white">
                Markets Open
              </span>
            </div>
            <p className="text-xs text-gray-400">
              NYSE: 9:30 AM - 4:00 PM EST
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
