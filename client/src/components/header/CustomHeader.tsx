import { Headers, Progress } from "design-react-kit";

import CenterHeader from "./CenterHeader";
import NavHeader from "./NavHeader";
import { useFetch } from "../../hooks/FetchContext";

const CustomHeader = () => {
  const { loading } = useFetch();

  return (
    <Headers shadow>
      {loading && (
        <Progress
          indeterminate
          label="In elaborazione..."
          color="danger"
          style={{ zIndex: 999999 }}
        />
      )}
      <div className="it-nav-wrapper">
        <CenterHeader />
        <NavHeader />
      </div>
    </Headers>
  );
};

export default CustomHeader;
