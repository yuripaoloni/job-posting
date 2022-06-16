import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
} from "design-react-kit";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useConfirm } from "../../contexts/ConfirmContext";
import { useFetch } from "../../contexts/FetchContext";
import { Candidatura, Invite, Job } from "../../typings/jobs.type";
import Candidate from "./Candidate";
import InviteCandidate from "./InviteCandidate";
import SelectCandidate from "./SelectCandidate";

type JobParticipantsModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
  job: Job | null;
  updateJobs?: (job: Job, update: boolean, jobId?: number) => void;
};

const JobParticipantsModal = ({
  isOpen,
  toggleModal,
  job,
  updateJobs,
}: JobParticipantsModalProps) => {
  const [invites, setInvites] = useState<Invite[]>([
    { candidaturaId: 0, time: "", date: "", place: "" },
  ]);
  const [selected, setSelected] = useState([false]);

  const { userType } = useAuth();
  const { fetchData } = useFetch();
  const { toggleConfirm } = useConfirm();

  useEffect(() => {
    if (job?.candidaturas && job?.candidaturas?.length > 0) {
      setInvites(
        Array(job.candidaturas.length).fill({
          candidaturaId: 0,
          time: "",
          date: "",
          place: "",
        })
      );
      setSelected(Array(job.candidaturas.length).fill(false));
    } else {
      setInvites([{ candidaturaId: 0, time: "", date: "", place: "" }]);
      setSelected([false]);
    }
  }, [job]);

  const updateInviteData = (index: number, updatedInvite: Invite) => {
    let updatedInvites = invites.slice();
    updatedInvites[index] = updatedInvite;
    setInvites(updatedInvites);
  };

  const updateSelected = (index: number) => {
    const newValue = !selected[index];
    let updatedSelected = selected.slice();

    if (newValue) {
      updatedSelected = updatedSelected.map(
        (item, itemIndex) => (item = itemIndex <= index ? true : item)
      );
    } else {
      updatedSelected = updatedSelected.map(
        (item, itemIndex) => (item = itemIndex >= index ? false : item)
      );
    }

    setSelected(updatedSelected);
  };

  const onInviteCandidates = async () => {
    toggleModal();

    const res = await fetchData<{
      candidaturas: Candidatura[];
    }>("/jobs/interview", "POST", {
      invites,
      selected,
    });

    res?.data.candidaturas &&
      updateJobs &&
      updateJobs({ ...job!, candidaturas: res.data.candidaturas }, true);
  };

  const onCloseOffer = async (
    offerId: number,
    applicationId: number,
    user: string
  ) => {
    toggleConfirm(
      `Chiudere l'offerta selezionando il candidato ${user} ?`,
      () => closeOffer(offerId, applicationId)
    );
  };

  const closeOffer = async (offerId: number, applicationId?: number) => {
    toggleModal();

    const res = await fetchData<{ success: boolean }>(
      `/jobs/offers/close/${
        applicationId ? `${offerId}/${applicationId}` : `${offerId}`
      }`,
      "GET"
    );

    res?.data.success &&
      updateJobs!({ ...job!, attiva: false }, false, job!.id);
  };

  const onSuggestCandidate = async (candidaturaId: number, user: string) => {
    toggleConfirm(`Proporre al direttore generale ${user} ?`, () =>
      suggestCandidate(candidaturaId)
    );
  };

  const suggestCandidate = async (candidaturaId: number) => {
    toggleModal();

    const res = await fetchData<{ success: boolean }>(
      `/jobs/offers/suggest/${candidaturaId}`,
      "GET"
    );

    if (res?.data.success) {
      let candidaturas = job?.candidaturas!.slice();
      candidaturas = candidaturas?.map((item) =>
        item.id === candidaturaId ? { ...item, proposto: true } : item
      );

      updateJobs!({ ...job!, candidaturas }, true);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggleModal()}
      scrollable
      size={job?.attiva ? "lg" : "xl"}
    >
      <ModalHeader>Lista candidature - {job?.ruolo}</ModalHeader>
      <ModalBody>
        {!job?.attiva ? (
          job?.candidaturas && job?.candidaturas?.length > 0 ? (
            job?.candidaturas.map((candidatura) => (
              <Row
                key={candidatura.id}
                className="align-items-center justify-content-between border-bottom px-2 py-2"
              >
                <Candidate candidatura={candidatura} xs={11} />
              </Row>
            ))
          ) : (
            "Nessuna candidatura"
          )
        ) : userType === 1 ? (
          <SelectCandidate job={job!} onCloseOffer={onCloseOffer} />
        ) : (
          <InviteCandidate
            job={job!}
            invites={invites}
            updateInviteData={updateInviteData}
            selected={selected}
            updateSelected={updateSelected}
            onSuggestCandidate={onSuggestCandidate}
          />
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" outline onClick={() => toggleModal()} size="sm">
          Chiudi
        </Button>
        {!job?.attiva && userType === 1 ? (
          <Button
            color="primary"
            onClick={() =>
              toggleConfirm(
                `Chiudere offerta senza selezionare nessun candidato ?`,
                () => closeOffer(job!.id)
              )
            }
            size="sm"
          >
            Chiudi offerta
          </Button>
        ) : (
          <Button
            color="primary"
            disabled={!selected.some((i) => i === true)}
            onClick={() =>
              toggleConfirm(
                `Inviare al colloquio i candidati selezionati ?`,
                () => onInviteCandidates()
              )
            }
            size="sm"
          >
            Invia email
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default JobParticipantsModal;
