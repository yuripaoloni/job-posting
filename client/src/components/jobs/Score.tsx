import { Progress } from "design-react-kit";

type ScoreProps = {
  score: number | null | undefined;
};

const Score = ({ score }: ScoreProps) => {
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
        Affinità {score!}%
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
