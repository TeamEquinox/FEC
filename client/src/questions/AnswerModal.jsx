import React from 'react';

const AnswerModal = (props) => {
  if (!props.show) {
    return null;
  } else {
    return (
      <div className="modal answerModal">
        <form className="form answerForm">
        This is the answer modal
        <button type="button" onClick={props.closeModal}>Close</button>
        </form>
      </div>
    )
  }
}

export default AnswerModal;