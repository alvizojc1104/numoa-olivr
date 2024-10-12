import { Listbox, ListboxItem, User } from "@nextui-org/react";
import { siteConfig } from "../config/site";
import clsx from "clsx";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const FacultySidebar = () => {
    const { user } = useUser()
    const [activeLink, setActiveLink] = useState<string | null>(null);
    const location = useLocation(); // Get the current location

    const handleLinkClick = (href: string) => {
        setActiveLink(href);
    };


    return (
        <div className="border-r-1 h-screen">
            <User className="my-4" name={user?.fullName} avatarProps={{ src: user?.imageUrl }} description={user?.primaryEmailAddress?.emailAddress} />
            <Listbox variant="flat" >
                {siteConfig.facultyLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                        <ListboxItem
                            key={item.href}
                            className={clsx("py-3 text-2xl", (location.pathname === item.href || activeLink === item.href) && "text-white font-semibold bg-primary-500")}
                            href={item.href}
                            onClick={() => handleLinkClick(item.href)}
                            color={location.pathname == item.href ? "primary" : "default"}
                            variant="solid"
                            startContent={<Icon />}
                        >
                            {item.label}
                        </ListboxItem>
                    )
                })}
            </Listbox>
        </div>
    );
};

export default FacultySidebar;
