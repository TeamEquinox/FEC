import React from 'react';

const QuestionModal = (props) => {
  if (!props.show) {
    return null
  } else {
    return (
      <div className='modal questionModal modal--open'>
        <form className="form questionForm">
        This is the question modal
        <button type="button" onClick={props.closeModal}>Close</button>
        </form>
      </div>
    )
  }
}

export default QuestionModal;