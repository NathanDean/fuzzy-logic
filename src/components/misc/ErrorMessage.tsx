interface ErrorMessageProps {
  onClick: () => void;
  type: string;
}

export default function ErrorMessage({ onClick, type }: ErrorMessageProps) {
  const capitalised_type = type[0].toUpperCase() + type.substring(1);

  return (
    <div className="flex flex-col items-center space-y-1">
      <h1>Sorry, something went wrong.</h1>

      <p>
        {capitalised_type} error. Please try again, if the problem continues
        please get in touch.
      </p>

      <button className="btn btn-primary" onClick={onClick}>
        Try again
      </button>
    </div>
  );
}
