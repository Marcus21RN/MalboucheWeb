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
        className="bg-[#F6D400] cursor-pointer font-['combo'] text-[#333333] px-4 py-2 rounded hover:bg-[#C6B000] transition-colors duration-200 flex items-center justify-center"
      >
        Log Out
        <ExitToAppIcon style={{ marginLeft: '8px' }} />
      </button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ color: "#1A1A1A", fontFamily: 'combo' }}>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to log out?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{ color: "#1A1A1A", borderColor: "#1A1A1A", '&:hover': { borderColor: "#1A1A1A" }, cursor: 'pointer' }} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleLogout} sx={{ backgroundColor: "#F6D400", color: "#333333", '&:hover': { backgroundColor: "#C6B000" } }} variant="contained">
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LogoutButton;