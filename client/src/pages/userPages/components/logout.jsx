import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function LogoutButton() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#66011F] cursor-pointer font-['Montserrat'] text-white px-4 py-2 rounded hover:bg-[#55001A] transition-colors duration-200 flex items-center justify-center"
      >
        Log Out
        <ExitToAppIcon style={{ marginLeft: '8px' }} />
      </button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ color: "#660152" }}>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to log out?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{ color: "#660152", borderColor: "#660152", '&:hover': { borderColor: "#660152" }, cursor: 'pointer' }} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleLogout} sx={{ backgroundColor: "#66011F" }} variant="contained">
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LogoutButton;