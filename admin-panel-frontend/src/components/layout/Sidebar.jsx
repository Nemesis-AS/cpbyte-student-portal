import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutGrid, ShoppingCart, Calendar, User, FileText, Table, FileCode, PieChart, Box, Lock } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { section: "MENU", items: [
      { icon: LayoutGrid, label: "Dashboard", route: "/dashboard" },
      
    ]},
    
    { section: "", items: [
      
      { icon: Table, label: "Students Tables", route: "/studenttables" },
      { icon: Table, label: "Coordinators Tables", route: "/coordinatorstable" },
      { icon: Table, label: "Lead Tables", route: "/leadtables" },
    ]},
    { section: "OTHERS", items: [
      { icon: PieChart, label: "Charts", route: "/charts" },
      { icon: Box, label: "UI Elements", route: "/ui-elements" },
      { icon: Lock, label: "Authentication", route: "/auth" }
    ]}
  ];

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0">
      <div className="h-16 flex items-center px-6">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-1.5 rounded">
            <LayoutGrid size={20} />
          </div>
          <span className="text-xl font-bold">CPBYTE</span>
        </div>
      </div>

      <div className="p-4">
        {menuItems.map((section, idx) => (
          <div key={idx} className="mb-6">
            {section.section && (
              <h6 className="text-gray-400 text-xs font-semibold mb-4">{section.section}</h6>
            )}
            {section.items.map((item, itemIdx) => (
              <NavLink
                key={itemIdx}
                to={item.route}
                className={({ isActive }) =>
                  `flex items-center gap-3 w-full p-2.5 rounded-lg mb-1.5 ${
                    isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
