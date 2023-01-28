import React, { useEffect, useState } from "react";
import {Snackbar} from "@mui/material"
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { setSnackbar } from "../../actions";
import { useDispatch } from "react-redux";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BannerComp = () => {
  const showBanner = useSelector((state: RootState) => state.showBanner);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setShow(showBanner ? true : false)
  }, [showBanner]);

  return (
    <div>
      {show && (
        <Snackbar
          open={show}
          autoHideDuration={6000}
          onClose={() => dispatch(setSnackbar(false))}>
            <Alert onClose={() => setShow(false)} severity="success" sx={{width: '100%'}}>
              You have nominated 5 movies!
            </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default BannerComp;
