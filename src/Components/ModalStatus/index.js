import Modal from 'react-bootstrap/Modal'
import { FaEdit } from 'react-icons/fa'

export default function ModalStatus({ show, handleClose, status, setEditStatus, handleEditStatus }) {
	return (
		<Modal show={show} onHide={handleClose} style={{ top: '40%', color: 'white' }}>
			<Modal.Header style={{ backgroundColor: '#0D1117', border: '1px solid #0D1117' }}>
				<Modal.Title>
					<FaEdit style={{ marginBottom: '5.5px', marginRight: '7.5px' }} />
					{'Status'}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ backgroundColor: '#0D1117' }}>
				<div className="col-12" style={{ padding: '5px' }}>
					<input
						onChange={(e) => setEditStatus(e.target.value)}
						placeholder={status}
						style={{
							color: 'white',
							width: '100%',
							backgroundColor: '#0D1117',
							border: '1px solid #585E65',
							borderRadius: '5px',
							height: '35px',
						}}
					></input>
				</div>
			</Modal.Body>
			<Modal.Footer style={{ backgroundColor: '#0D1117', border: '1px solid #0D1117' }}>
				<button
					type="button"
					className="btn btn-success"
					style={{ backgroundColor: '#238636' }}
					onClick={handleEditStatus}
				>
					Save
				</button>
				<button type="button" className="btn btn-secondary" onClick={handleClose}>
					Cancel
				</button>
			</Modal.Footer>
		</Modal>
	)
}
