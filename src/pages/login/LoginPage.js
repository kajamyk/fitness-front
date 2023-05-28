import {Alert, Box, Button, Card, CardMedia, Container, Link, TextField, Typography, useTheme} from "@mui/material";
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';
import * as yup from 'yup';
import useHttp from "../../hooks/use-http";
import {useState} from "react";

const LoginPage = (props) => {
    const { isLoading, sendRequest: sendLoginRequest } = useHttp();
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const loginHandler = async (body) => {
        setError(false)
        try {
            await sendLoginRequest({
                url: 'http://localhost:8080/login',
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                },
            }, addToken);
            props.setIsLoggedIn(true)
            navigate('/articles/training')
        } catch (error) {
            setError(true)
        }
    };

    const addToken = (data) => {
        const token = data.token;
        localStorage.setItem("Auth", token)
    }

    const validationSchema = yup.object({
        login: yup
            .string('Podaj login')
            .required('Login jest wymagany'),
        password: yup
            .string('Podaj hasło')
            .required('Hasło jest wymagane'),
    });


    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            loginHandler(JSON.stringify(values));
        },
    });

    return (
        <Container sx={{
            minWidth: "100%",
            display: 'flex',
            minHeight: 'min-content',
            height: "800px",
            justifyContent: 'center',
            backgroundImage: `url("colorkit.png")`

        }}>
            <Card sx={{
                marginTop: '10px',
                backgroundColor: theme.palette.primary.light, display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: "700px",
                height: "min-content"
            }}>
                <Typography sx={{textAlign: "center", color: "primary.dark", typography: 'h3', margin: "10px"}}>
                    Logowanie
                </Typography>
                <CardMedia
                    component="img"
                    height="350"
                    image="gym.svg"
                    alt="gym logo"
                />
                {error === true && <Alert severity="error" sx={{margin:"1rem", marginBottom:"0", width:"90%"}}>Dane logowania są niepoprawne!</Alert>}
                <form onSubmit={formik.handleSubmit} style={{width: "100%"}}>
                    <TextField
                        fullWidth
                        id="login"
                        name="login"
                        label="Login"
                        value={formik.values.login}
                        onChange={formik.handleChange}
                        error={formik.touched.login && Boolean(formik.errors.login)}
                        helperText={formik.touched.login && formik.errors.login}
                        sx={{margin: '1rem', width: "90%", marginTop: "3rem"}}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        sx={{margin: '1rem', width: "90%"}}
                    />
                    <Box sx={{justifyContent: "space-between"}}>
                        <Button
                            disabled={(formik.touched.login && formik.errors.login) || (formik.touched.password && formik.errors.password)}
                            color="primary" variant="contained" type="submit"
                            sx={{width: '100px', margin: '2rem'}}>
                            Zaloguj
                        </Button>
                        <Link component={RouterLink} to="/register" color="inherit"
                              sx={{float: "right", margin: '2rem'}}>
                            Nie masz konta? Zarejestruj się
                        </Link>
                    </Box>
                </form>
            </Card>
        </Container>
    )
};
export default LoginPage;

