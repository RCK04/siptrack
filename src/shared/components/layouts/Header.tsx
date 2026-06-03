import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router"
import { DropletIcon } from "lucide-react";

interface HeaderProps {
    section?: string;
    children?: ReactNode;
}

const Header = ({ section, children }: HeaderProps) => {
    return (
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between p-6">
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-foreground hover:text-primary">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <DropletIcon className="size-5" />
                </span>
                <div>
                    { section && <p className="text-sm font-normal text-muted-foreground">{section}</p> }
                    <h1 className="text-2xl font-semibold">SipTrack</h1>
                </div>
            </Link>

            {children}
        </header>
    )
};

export default Header;