import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Card, CardContent, InputAdornment, IconButton } from "@mui/material";
import Container from "@mui/material/Container";
import { colors } from "../utilities/colors";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Logo from "../assets/logo.png";
import { login } from "../services/authService";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function LoginCard() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Se connecter");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    var username = data.get("username");
    var password = data.get("password");
    const user = { username, password };

    setError('');
    setButtonLabel(" Connexion en cours...");

    const response = await login(user);
    const responseData = await response.json();

    if (response.ok) {
      const expiresIn = 12 * 60 * 60;
      const currentTimestamp = Math.floor(new Date().getTime() / 1000);
      const expirationTimestamp = currentTimestamp + expiresIn;
      
      localStorage.setItem("username", responseData.userName);
      localStorage.setItem('tokenExpiration', expirationTimestamp);

      navigate("/tableau-de-bord");
    } else {
      setButtonLabel("Se connecter");
      setError(responseData.message);
    }
  };

  return (
    <>
      <Container
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Card
            sx={{
              width: "100%",
              borderRadius: 2,
            }}
          >
            <CardContent>
              {/* Logo */}
              <div style={{ textAlign: "center" }}>
                <img
                  src={Logo}
                  alt="Logo"
                  style={{ width: "80px", height: "120px" }}
                />
              </div>

              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1, alignContent: "center" }}
              >
                <Stack direction="column" sx={{ alignItems: "center" }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    id="username"
                    label="Nom d'utilisateur"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    sx={{
                      "&:focus": {
                        borderColor: colors.primary,
                      },
                    }}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    name="password"
                    label="Mot de passe"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    helperText={error}
                    FormHelperTextProps={{
                      style: { color: "#ff0000" },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      mb: 2,
                      background: colors.primary,
                      borderRadius: 2,
                      ":hover": {
                        background: colors.primary,
                      },
                    }}
                  >
                    {buttonLabel}
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Container>
    </>
  );
}
