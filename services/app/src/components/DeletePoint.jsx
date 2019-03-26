import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { reduxForm, SubmissionError } from 'redux-form';
import connect from '../connect';

const mapStateToProps = ({ deletePoint }) => ({
  deletePoint,
});

@connect(mapStateToProps)
@reduxForm({ form: 'deletePoint' })
class DeleteChannel extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
    };
  }

  delete = idPoint => async () => {
    const { deletePoint } = this.props;
    try {
      await deletePoint(idPoint);
    } catch (e) {
      throw new SubmissionError({ error: 'Somthing errors' });
    }
  };

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  render() {
    const { show } = this.state;
    const { pointId, handleSubmit, submitting } = this.props;
    return (
      <>
        <Button size="sm" variant="outline-danger" onClick={this.handleShow}><span className="oi oi-x" /></Button>

        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Channell</Modal.Title>
          </Modal.Header>
          <Modal.Body>This channel will be deleted with all messages</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
            <form onSubmit={handleSubmit(this.delete(pointId))}>
              <Button type="submit" variant="danger" disabled={submitting}>DELETE</Button>
            </form>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default DeleteChannel;
