import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    // Log error info somewhere
  }

  render() {
    if (this.state.errorInfo) {
      return <h2>Something went wrong!</h2>;
    }
    return null;
  }
}

export default ErrorBoundary;
