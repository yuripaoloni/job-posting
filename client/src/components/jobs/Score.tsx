import { Progress } from "design-react-kit";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type ScoreProps = {
  score: number | null | undefined;
  applicationId?: number;
};

const Score = ({ score, applicationId }: ScoreProps) => {
  const { userType } = useAuth();

  return (
    <div>
      <h6
        className={
          score! >= 65
            ? "text-success"
            : score! >= 40
            ? "text-warning"
            : "text-danger"
        }
      >
        Affinità {score!}%{" "}
        {(userType === 1 || userType === 2) && (
          <small>
            <Link to={`/competencies/application/${applicationId}`}>
              (Vedi risposte)
            </Link>
          </small>
        )}
      </h6>
      <span>
        <Progress
          value={score!}
          color={score! >= 65 ? "success" : score! >= 40 ? "warning" : "danger"}
        />
      </span>
    </div>
  );
};

export default Score;
