import "../../styling/SideBarLink.css";
export default function SideBarLink({ children, onSelect, isSelected }) {
  return (
    <div className="SideBarLink">
      <p className={isSelected ? "active" : undefined} onClick={onSelect}>
        {children}
      </p>
    </div>
  );
}
