import { Link } from "@nextui-org/react";
import { siteConfig } from "../config/site";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const SecretarySideBar = () => {
    const [activeLink, setActiveLink] = useState<string | null>(null);
    const location = useLocation(); // Get the current location

    const handleLinkClick = (href: string) => {
        setActiveLink(href);
    };

    return (
        <nav className="flex flex-col gap-4">
            {siteConfig.secretaryNavLinks.map((item) => (
                <Link
                    key={item.href}
                    className={clsx(
                        linkStyles({ color: "foreground" }),
                        (location.pathname === item.href || activeLink === item.href) && "text-primary font-semibold"
                    )}
                    color="foreground"
                    href={item.href}
                    onClick={() => handleLinkClick(item.href)}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
};

export default SecretarySideBar;
