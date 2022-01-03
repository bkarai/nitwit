import { useState, useCallback, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import cookie from 'react-cookies';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

import { API_PREFIX, USER_ACCESS_KEY_COOKIE } from 'consts';
import './style.css';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
// This is an accessibility thing
// http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#root');
 
const NameModal = ({
  modalIsOpen,
  setModalIsOpen,
  afterModalClose,
}) => {
  var subtitle;
  const nameInputRef = useRef(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [nameInput, setNameInput] = useState('');
 
  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
 
  const closeModal = useCallback(() => {
    // Need to remember to clean up all state,
    // because closing the modal doesn't unmount the
    // component
    setModalIsOpen(false);
    setSubmitDisabled(true);
    setNameInput('');
  }, [setModalIsOpen, setSubmitDisabled, setNameInput]);

  const onNameChanged = useCallback((event) => {
    setNameInput(event.target.value);
  }, [setNameInput]);

  useEffect(() => {
    const inputLength = nameInput.length;
    setSubmitDisabled((inputLength < 3) || (inputLength > 10));
  }, [nameInput, setSubmitDisabled]);

  const onPostName = useCallback(() => {
    const enteredName = nameInputRef.current.value;

    axios.post(`${API_PREFIX}/player`, {
      name: enteredName,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then((response) => {
      cookie.save(USER_ACCESS_KEY_COOKIE, response.data.accessKey, { path: '/' });
      toastr.success(`Welcome, ${enteredName}`);
    }).catch((error) => {
      const errorMessage = (error && error.response && error.response.data && error.response.data.error) || error.message;
      toastr.error(`Error: ${errorMessage}`);
    }).finally(() => {
      closeModal();
      afterModalClose();
    });
  }, [nameInputRef, afterModalClose, closeModal]);
 
  const onNameInputKeyPressed = useCallback((event) => {
    if (!submitDisabled && (event.key === 'Enter')) {
      onPostName();
    }
  }, [onPostName, submitDisabled]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Name Input Modal"
      shouldCloseOnOverlayClick={false}
    >
      <div className="modal-container">
        <h2 className="modal-header" ref={_subtitle => (subtitle = _subtitle)}>Enter a nickname to get started</h2>
        <input className="name-input" placeholder="Enter nickname..." onKeyPress={onNameInputKeyPressed} onChange={onNameChanged} ref={nameInputRef}/>
        <button className="submit-button" disabled={submitDisabled} onClick={onPostName}>Submit</button>
      </div>
    </Modal>
  );
}

export default NameModal;
