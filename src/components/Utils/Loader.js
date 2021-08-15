import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


const Loader = () => {
  return (
    <div className="bodyLoader">
      <CircularProgress />
    </div>
  )
}

export default Loader;