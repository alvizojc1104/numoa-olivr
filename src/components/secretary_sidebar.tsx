import { Link } from "@nextui-org/react";
import { siteConfig } from "../config/site";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";

const SecretarySideBar = () => {
    return (
        <nav className="flex flex-col gap-4">
            {siteConfig.secretaryNavLinks.map((item) => (
                <Link
                    key={item.href}
                    className={clsx(
                        linkStyles({ color: "foreground" }),
                        location.pathname == item.href && "text-primary font-semibold"
                    )}
                    color="foreground"
                    href={item.href}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
};

export default SecretarySideBar;
