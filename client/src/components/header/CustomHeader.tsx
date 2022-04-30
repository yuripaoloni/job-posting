import { Headers } from "design-react-kit";
import CenterHeader from "./CenterHeader";
import NavHeader from "./NavHeader";

const CustomHeader = () => {
  return (
    <Headers>
      <div className="it-nav-wrapper">
        <CenterHeader />
        <NavHeader />
      </div>
    </Headers>
  );
};

export default CustomHeader;
