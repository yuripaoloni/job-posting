import { Row } from "design-react-kit";
import React from "react";
import { Button } from "reactstrap";

type LoadMoreButtonProps = {
  show: boolean;
  onClick: () => void;
};

const LoadMoreButton = ({ show, onClick }: LoadMoreButtonProps) => {
  return (
    <Row className="justify-content-center mt-4">
      {!show && <Button onClick={() => onClick()}>Mostra di più</Button>}
    </Row>
  );
};

export default LoadMoreButton;
