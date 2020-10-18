import React from 'react';
import { Alert } from 'react-bootstrap';
import './style.scss';

class ErrorBoundary extends React.Component {
  state = { error: null, errorInfo: null };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="errorBoundery">
          <Alert severity="error">
            <Alert.Heading className="errorString">
              We are sorry there here an error!
            </Alert.Heading>
            {this.state.error && (
              <p className="errorString">{this.state.error.toString()} </p>
            )}
            <strong className="errorString">
              {this.state.errorInfo.componentStack}
            </strong>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

function errorBoundary(Component) {
  return props => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
}
export default errorBoundary;
