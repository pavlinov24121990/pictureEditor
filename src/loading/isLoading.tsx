import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function ButtonLoading() {
  return (

    <>
      <Button>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        big day prague...
      </Button>
    </>
  );
}

export default ButtonLoading;
