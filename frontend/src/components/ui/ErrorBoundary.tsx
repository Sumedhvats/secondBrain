import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("ErrorBoundary caught:", error.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <p className="text-sm text-[rgb(var(--color-text-tertiary))] bg-[rgb(var(--color-bg-tertiary))] p-3 rounded-lg border border-[rgb(var(--color-border))] text-center">
            Could not load embedded content.
          </p>
        )
      );
    }

    return this.props.children;
  }
}
