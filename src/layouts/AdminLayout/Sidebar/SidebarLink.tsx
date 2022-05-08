import NextLink from "next/link";

interface SidebarLinkProps {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export const SidebarLink: React.FC<
  React.PropsWithChildren<SidebarLinkProps>
> = ({ href, label, icon }) => {
  const isActive = "/admin" === href;

  return (
    <NextLink href={href}>
      <a
        className={`flex flex-col md:flex-row items-center justify-center md:justify-start text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group ${
          isActive ? "bg-gray-100" : ""
        }`}
      >
        {icon}

        <span className="text-xs md:text-base md:ml-3">{label}</span>
      </a>
    </NextLink>
  );
};
