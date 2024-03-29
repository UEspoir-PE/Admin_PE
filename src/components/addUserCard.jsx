import React from "react";
import { useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Button from "@mui/material/Button";
import { colors } from "../utilities/colors";
import { addUser } from "../services/userService";
import useModalAlertStore from "../store/modalAlertStore";
import ModalAlert from "./ModalAlert";
import useAlertStore from "../store/alertStore";

const AddUserCard = ({ open, onClose, onAddUserSuccess }) => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const { setModalAlert } = useModalAlertStore();
  const { setAlert } = useAlertStore();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleAddUser = async () => {
    const user = { username, role };
    const response = await addUser(user);
    const responseData = await response.json();

    if (response.ok) {
      setAlert(responseData.message, 'success');
      setRole('')
      setUsername('')
      onAddUserSuccess();
      onClose();
    }
    else {
      setModalAlert(responseData.message, 'error');
    }

  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          Ajouter Utilisateur
        </DialogTitle>
        <ModalAlert />
        <DialogContent>
          {/*Dropdown Menu */}
          <FormControl sx={{ mt: 2, width: 185 }}>
            <InputLabel htmlFor="role-dropdown">Role</InputLabel>
            <Select
              value={role}
              onChange={handleRoleChange}
              label="Role"
              inputProps={{ id: "role-dropdown" }}
              sx={{ borderColor: colors.green, borderRadius: "8px" }}
            >
              <MenuItem value="" disabled>
                Select Role
              </MenuItem>
              <MenuItem value="superadmin">Super Admin</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="member">Member</MenuItem>
            </Select>
          </FormControl>

          <Stack direction="row" gap={3}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="identifiant"
              label="Identifiant"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ mt: 2, borderColor: colors.green, borderRadius: "8px" }}
              value={username}
              onChange={handleUsernameChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="motDePasse"
              label="Mot de passe"
              type="password"
              variant="outlined"
              value={'Jesus123!'}
              InputLabelProps={{ shrink: true }}
              sx={{ mt: 2, borderColor: colors.green, borderRadius: "8px" }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{
              mr: 2,
              borderRadius: "8px",
              backgroundColor: colors.green,
              color: "white:hover",
            }}
            onClick={handleAddUser}
          >
            Enregister
          </Button>

          <Button
            variant="contained"
            sx={{
              borderRadius: "8px",
              backgroundColor: colors.red,
              color: "white",
            }}
            onClick={onClose}
          >
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddUserCard;
