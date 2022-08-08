import React from 'react';


//function that renders any validation errors sent from the API,
// function component. It also renders the "Submit" and "Cancel" buttons of a form, as well as handle their functionality
export default (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()} 
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

// Functionthat renders any validation errors sent from the API, via the function component
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
        <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
             { errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
        </div>
    );
  }

  return errorsDisplay;
}


                