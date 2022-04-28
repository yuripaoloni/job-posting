import { Headers } from "design-react-kit";
import CenterHeader from "./CenterHeader";
import NavHeader from "./NavHeader";

const CustomHeader = () => {
  return (
    <Headers className="mb-3">
      <div className="it-nav-wrapper">
        <CenterHeader />
        <NavHeader />
      </div>
    </Headers>
  );
};

export default CustomHeader;
