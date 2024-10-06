interface NavbarItemProps{
    label: string
}

const NavbarItem: React.FC<NavbarItemProps> = ({
    label
}) => {
    return (
        <div className="
            cursor-pointer
            text-white
            transition
            duration-200
            hover:text-gray-300
        ">
            {label}
        </div>
    )
}

export default NavbarItem