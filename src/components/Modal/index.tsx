// Component and hook imports
import YoutubePlayer from '../YoutubePlayer';
import { useModal } from '../../context/ModalContext';

// Style imports
import './modal.styles.scss';

const Modal: React.FC = () => {

  // Init hooks
  const { modalId, isModalOpen, hideModal } = useModal();

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={hideModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={hideModal}>
          &times;
        </button>
        {modalId && <YoutubePlayer videoKey={modalId} />}
        {!modalId &&
          <p className="modal-empty">
            No trailer currently availible, please try another movie.
          </p>
        }
      </div>
    </div>
  );
};

export default Modal;