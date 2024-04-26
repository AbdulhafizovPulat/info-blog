import { useCallback } from "react";
import { useSelector } from "react-redux";

const ValidationError = () => {
  const { error } = useSelector((state) => state.auth);

  const ErrorMessage = useCallback(() => {
    return Object.keys(error).map((name) => {
      const msg = error[name].join(" ,");
      return `${name} ${msg}`;
    });
  }, [error]);

  return (
    error !== null &&
    ErrorMessage().map((item) => (
      <div className="alert alert-danger m-0" role="alert">
        {item}
      </div>
    ))
  );
};

export default ValidationError;
