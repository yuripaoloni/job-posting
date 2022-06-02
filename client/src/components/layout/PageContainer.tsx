import { Container } from "design-react-kit";

type PageContainerProps = { children: React.ReactNode };

function PageContainer({ children }: PageContainerProps) {
  return (
    <Container fluid className="p-4 min-vh-100">
      {children}
    </Container>
  );
}

export default PageContainer;
