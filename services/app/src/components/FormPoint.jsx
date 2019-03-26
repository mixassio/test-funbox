import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';

const mapStateToProps = ({ addPoint }) => ({
  addPoint,
});

@connect(mapStateToProps)
@reduxForm({ form: 'newPoint' })
class FormPoints extends React.Component {
  constructor(props) {
    super(props);
    this.inputPoint = React.createRef();
  }

  componentDidMount() {
    this.inputPoint.current.getRenderedComponent().focus();
  }

  componentDidUpdate() {
    this.inputPoint.current.getRenderedComponent().focus();
  }

  submitPoint = async (value) => {
    const { reset, addPoint } = this.props;
    try {
      await addPoint(value.text);
      reset();
    } catch (e) {
      throw e;
    }
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form className="form-inline mt-3" onSubmit={handleSubmit(this.submitPoint)}>
        <Field
          ref={this.inputPoint}
          forwardRef
          name="text"
          required
          component="input"
          type="text"
          disabled={submitting}
          className="w-75 border border-info"
        />
        <button type="submit" className="ml-1 btn btn-primary btn-sm" disabled={submitting}>Send</button>
      </form>
    );
  }
}

export default FormPoints;
