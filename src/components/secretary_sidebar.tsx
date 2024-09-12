import { Link } from "@nextui-org/react";
import { siteConfig } from "../config/site";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";

const SecretarySideBar = () => {
    return (
        <aside className="fixed hidden w-[250px] h-[calc(100vh-80px)] text-foreground flex-col px-4 overflow-y-auto scrollbar-hide sm:flex">
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
        </aside>
    );
};

export default SecretarySideBar;
