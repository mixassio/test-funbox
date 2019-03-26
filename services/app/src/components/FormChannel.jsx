import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';


const mapStateToProps = ({ addChannel }) => ({
  addChannel,
});

@connect(mapStateToProps)
@reduxForm({ form: 'newChannel' })
class FormChannel extends React.Component {
  constructor(props) {
    super(props);
    this.inputChannel = React.createRef();
  }

  componentDidMount() {
    this.inputChannel.current.getRenderedComponent().focus();
  }

  componentDidUpdate() {
    this.inputChannel.current.getRenderedComponent().focus();
  }

  submitChannel = async (value) => {
    const { reset, addChannel } = this.props;
    try {
      await addChannel(value.text);
      reset();
    } catch (e) {
      throw e;
    }
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form className="form-inline mt-3" onSubmit={handleSubmit(this.submitChannel)}>
        <Field
          ref={this.inputChannel}
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

export default FormChannel;
