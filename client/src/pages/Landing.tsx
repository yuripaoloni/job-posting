import { useAlert } from "../contexts/AlertContext";

const Landing = () => {
  const { toggleAlert } = useAlert();

  return (
    <div>
      Landing
      <button
        onClick={() => toggleAlert("Nuova offerta di lavoro creata", "success")}
      >
        click me
      </button>
    </div>
  );
};

export default Landing;
