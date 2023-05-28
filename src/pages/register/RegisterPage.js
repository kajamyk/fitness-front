import {
    Alert,
    Box,
    Button,
    Card,
    CardMedia,
    Container,
    FormControlLabel,
    InputLabel,
    Link,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import useHttp from "../../hooks/use-http";
import {useState} from "react";

const RegisterPage = () => {
    const { isLoading, sendRequest: sendRegisterRequest } = useHttp();
    const [error, setError] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();

    const registerHandler = async (body) => {
        setError(false)
        try {
            await sendRegisterRequest({
                url: 'http://localhost:8080/register',
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            navigate('/login')
        } catch (error) {
            setError(true)
        }
    };

    const validationSchema = yup.object({
        login: yup
            .string('Podaj login')
            .required('Login jest wymagany')
            .min(4, 'Login powinien składać się z conajmniej czterech znaków'),
        password: yup
            .string('Podaj hasło')
            .matches(
                // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,

                'Hasło musi zawierać co najmniej jedną małą i jedną dużą literę oraz cyfrę'
            )
            .min(8, 'Hasło powinno składać się z conajmniej ośmiu znaków')
            .required('Hasło jest wymagane'),
        confirmPassword: yup
            .string('Powtórz hasło')
            .required('Hasło jest wymagane')
            .oneOf([yup.ref('password'), null], 'Hasła muszą się zgadzać'),
        birthDate: yup
            .date()
            .required("Data urodzenia jest wymagana")
    });


    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            confirmPassword: '',
            gender: 'female',
            birthDate: moment().subtract(18, 'years'),

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            registerHandler(JSON.stringify(values));
        },
    });
    return (

        <Container sx={{
            minWidth: "100%",
            display: 'flex',
            height: 'min-content',
            minHeight: "100%",
            justifyContent: 'center',
            backgroundImage: `url("colorkit.png")`
        }}>

            <Card sx={{
                marginTop: '1rem',
                marginBottom: "1rem",
                backgroundColor: theme.palette.primary.light, display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: "700px",
                minHeight: "min-content"
            }}>
                <Typography sx={{textAlign: "center", color: "primary.dark", typography: 'h3', margin: "10px"}}>
                    Rejestracja
                </Typography>
                <CardMedia
                    component="img"
                    height="350"
                    image="gym.svg"
                    alt="gym logo"
                />
                {error === true && <Alert severity="error" sx={{margin:"1rem", marginBottom:"0", width:"90%"}}>Login jest już zajęty!</Alert>}

                <form onSubmit={formik.handleSubmit}>
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
                        label="Hasło"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        sx={{margin: '1rem', width: "90%"}}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Powtórz hasło"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        sx={{margin: '1rem', width: "90%"}}
                    />
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <InputLabel htmlFor="datePicker" sx={{margin: '1rem', marginBottom: "0px"}}>
                            Podaj datę urodzenia:
                        </InputLabel>
                        <DatePicker
                            disableFuture
                            format="DD/MM/YYYY"
                            id="birthDate"
                            name="birthDate"
                            value={formik.values.birthDate}
                            onChange={(date) => formik.setFieldValue('birthDate', date)}
                            error={Boolean(formik.touched.birthDate && formik.errors.birthDate)}
                            helperText={formik.touched.birthDate && formik.errors.birthDate}
                            sx={{margin: '1rem', width: '60%'}}

                        />
                    </LocalizationProvider>
                    <InputLabel htmlFor="radio-buttons-group" sx={{margin: '1rem', marginBottom: "0px"}}>
                        Wybierz płeć
                    </InputLabel>
                    <RadioGroup
                        aria-label="gender"
                        name="gender"
                        defaultValue="female"
                        value={formik.values.gender}
                        onChange={(event) => {
                            formik.setFieldValue('gender', event.target.value);
                        }}
                        sx={{margin: "1rem"}}
                    >
                        <FormControlLabel value="female" control={<Radio/>} label="Kobieta"/>
                        <FormControlLabel value="male" control={<Radio/>} label="Mężczyzna"/>
                    </RadioGroup>
                    <Box sx={{justifyContent: "space-between"}}>
                        <Button
                            disabled={(formik.touched.datePicker && formik.errors.datePicker) || (formik.touched.login && formik.errors.login) || (formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)) || (formik.touched.password && formik.errors.password)}
                            color="primary" variant="contained" type="submit"
                            sx={{width: '100px', margin: '2rem'}}>
                            Zarejestruj
                        </Button>
                        <Link component={RouterLink} to="/login" color="inherit"
                              sx={{float: "right", margin: '2rem'}}>
                            Masz już konto? Zaluguj się
                        </Link>
                    </Box>
                </form>
            </Card>
        </Container>
    )
}

export default RegisterPage;