import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Button, Modal } from 'react-bootstrap';
import connect from '../connect';

const mapStateToProps = ({ renamePoint }) => ({
  renamePoint,
});

@connect(mapStateToProps)
@reduxForm({ form: 'renamePoint' })
class RenameChannel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  submitRenamePoint = pointId => async (value) => {
    const { renamePoint, reset } = this.props;
    try {
      await renamePoint({
        name: value.text,
        pointId,
      });
    } catch (e) {
      throw new SubmissionError({ error: 'Somthing errors' });
    }
    reset();
    this.handleClose();
  };

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const { show } = this.state;
    const { handleSubmit, submitting, point: { id: pointId, name } } = this.props;
    return (
      <>
        <Button size="sm" variant="outline-warning" onClick={this.handleShow}><span className="oi oi-pencil" /></Button>

        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Rename point</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-inline mt-3" onSubmit={handleSubmit(this.submitRenamePoint(pointId))}>
              <Field name="text" placeholder={name} required component="input" type="text" disabled={submitting} className="w-75 border border-info" />
              <Button type="submit" variant="warning" disabled={submitting}>RENAME</Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default RenameChannel;
