import { toast } from 'react-toastify';

export const handleToastSuccess = (message) => {
  return toast.success(`${message}`, {
        position: toast.POSITION.TOP_RIGHT, 
        autoClose: 3000,
        hideProgressBar: false, 
        closeOnClick: true, 
        pauseOnHover: true,
        draggable: true,
        closeButton: true,
      })
}

export const handleToastFailure = (message) => {
    return toast.warning(`${message}`, {
        position: toast.POSITION.TOP_RIGHT, 
        autoClose: 3000,
        hideProgressBar: false, 
        closeOnClick: true, 
        pauseOnHover: true,
        draggable: true,
        closeButton: true,
      })
}