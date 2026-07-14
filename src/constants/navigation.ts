export type NavLink = {
  href: string;
  label: string;
  external?: boolean;
};

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/education", label: "Education" },
  { href: "/games", label: "Games" },
  { href: "https://blogs.utkarshrajput.com", label: "Blogs", external: true },
];
