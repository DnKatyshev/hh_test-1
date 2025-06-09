import * as React from 'react';

export function useDialog() {
  const [state, setState] = React.useState({ open: false, data: null });

  const handleOpen = React.useCallback((data) => {
      setState({ open: true, data });
  }, []);

  const handleClose = React.useCallback(() => {
      setState({ open: false, data: null });
  }, []);

  return { data: state.data, handleClose, handleOpen, open: state.open };
}

