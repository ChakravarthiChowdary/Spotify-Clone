import React from "react";

interface IProps {
  option: string;
  Icon?: any;
}

const SidebarOption: React.FC<IProps> = ({ option = "test", Icon }) => {
  return (
    <div className="sidebarOption">
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{option}</h4> : <p>{option}</p>}
    </div>
  );
};

export default SidebarOption;
