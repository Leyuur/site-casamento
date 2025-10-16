export default function NavItem({ children, onClick, isSelected }) {
    return (
        <button className={isSelected ?  "active" : undefined} onClick={onClick}>{children}</button>
    )
}