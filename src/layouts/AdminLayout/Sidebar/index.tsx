import { PieChartIcon } from "../../../components/icons/PieChart";
import { MarkerIcon } from "../../../components/icons/Marker";
import { ImageIcon } from "../../../components/icons/Image";
import { DocumentIcon } from "../../../components/icons/Document";
import { SidebarLink } from "./SidebarLink";

export const Sidebar: React.FC<React.PropsWithChildren<unknown>> = () => (
  <div
    id="sidebar"
    className="fixed border-t-2 border-primary z-20 md:h-full bottom-0 md:top-0 md:left-0 md:pt-16 flex-shrink-0 w-full md:w-64"
    aria-label="Sidebar"
  >
    <div className="relative flex md:flex-col min-h-0 border-r border-gray-200 bg-white py-5">
      <ul className="w-full flex justify-between md:flex-col md:space-y-2 px-8 md:pb-2">
        <li>
          <SidebarLink
            href="/admin/"
            label="Dashboard"
            icon={<PieChartIcon />}
          />
        </li>

        <li>
          <SidebarLink
            href="/admin/places/"
            label="Places"
            icon={<MarkerIcon />}
          />
        </li>

        <li>
          <SidebarLink
            href="/admin/files/"
            label="Files"
            icon={<DocumentIcon />}
          />
        </li>

        <li>
          <SidebarLink
            href="/admin/images/"
            label="Images"
            icon={<ImageIcon />}
          />
        </li>
      </ul>
    </div>
  </div>
);
