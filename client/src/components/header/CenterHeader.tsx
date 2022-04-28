import {
  HeaderContent,
  HeaderBrand,
  Header,
  Icon,
  HeaderRightZone,
  Button,
  HeaderSocialsZone,
} from "design-react-kit";

const CenterHeader = () => {
  return (
    <Header small theme="" type="center">
      <HeaderContent>
        <HeaderBrand iconName="it-code-circle">
          <h2>Job Posting</h2>
          <h3>Università degli Studi di Camerino</h3>
        </HeaderBrand>
        <HeaderRightZone>
          <HeaderSocialsZone label="">
            <ul>
              <li>
                <Icon icon="it-mail" color="light" className="mr-1" />
                <span>cinfo@unicam.it</span>
              </li>
            </ul>
          </HeaderSocialsZone>
          <Button
            className="primary-bg-a9 text-white ml-5"
            size="sm"
            onClick={() => {}}
          >
            Accedi
          </Button>
        </HeaderRightZone>
      </HeaderContent>
    </Header>
  );
};

export default CenterHeader;
