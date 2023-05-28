import {Box, Button, Card, Container, TextField, Typography} from "@mui/material";
import * as yup from "yup";
import {useFormik} from "formik";
import Divider from "@mui/material/Divider";
import * as React from "react";
import {useState} from "react";
import useHttp from "../../hooks/use-http";

const BMICalculator = () => {
    const [bmi, setBmi] = useState(false);
    const { isLoading, sendRequest: sendBMIRequest } = useHttp();
    const [error, setError] = useState(false);
    const bmiHandler = async (body) => {
        setError(false)
        try {
            await sendBMIRequest({
                url: 'http://localhost:8080/calculators/bmi',
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('Auth')
                },
            }, setBMIResult);
        } catch (error) {
            setError(true)
        }
    };

    const setBMIResult = (data) => {
        setBmi(data.bmi)
    }

    const validationSchema = yup.object({
        weight: yup
            .number('Podaj wagę')
            .required('Waga jest wymagana')
            .min(1, "Waga musi być większa od 1")
            .max(600, "Waga musi byc mniejsza od 600"),
        height: yup
            .number('Podaj wzrost')
            .required('Wzorost jest wymagany')
            .min(1, "Wzrost musi być większy od 1")
            .max(300, "Wzrost musi być mniejszy od 300"),

    });


    const formik = useFormik({
        initialValues: {
            weight:0,
            height:0,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            bmiHandler(JSON.stringify(values));
        },
    });

    return <Card sx={{width:"80vw", backgroundColor: "accent.light", margin:"1rem"}}>
    <Typography sx={{margin:"1rem"}}>Kalkulator BMI (Body Mass Index) daje każdemu możliwość szybkiego i wygodego obliczenia własnego wskaźnika masy ciała. BMI obliczamy dzieląc masę ciała (w kilogramach) przez wzrost do kwadratu (w metrach). Wskaźnik ten wykorzystywany jest przede wszystkim do oceny ryzyka pojawienia się groźnych chorób: miażdżycy, choroby niedokrwiennej serca, udaru mózgu, czy nawet nowotworów. Większość tych chorób jest związana z otyłością i dlatego kalkulator BMI to tak przydatne narzędzie.</Typography>
    <form onSubmit={formik.handleSubmit}>
        <TextField
            fullWidth
            id="weight"
            name="weight"
            type="number"
            label="Waga w kg"
            value={formik.values.weight}
            onChange={formik.handleChange}
            error={formik.touched.weight && Boolean(formik.errors.weight)}
            helperText={formik.touched.weight && formik.errors.weight}
            sx={{margin: '1rem', width: "80%", marginTop: "3rem"}}
        />
        <TextField
            fullWidth
            id="height"
            name="height"
            type="number"
            label="Wzrost w cm"
            value={formik.values.height}
            onChange={formik.handleChange}
            error={formik.touched.height && Boolean(formik.errors.height)}
            helperText={formik.touched.height && formik.errors.height}
            sx={{margin: '1rem', width: "80%", marginTop: "3rem"}}
        />
        <Divider/>
        <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <Button
                disabled={(formik.touched.weight && formik.errors.weight) || (formik.touched.height && formik.errors.height)}
                color="primary" variant="contained" type="submit"
                size="medium"
                sx={{margin:"1rem"}}>
                Oblicz BMI
            </Button>
            {bmi &&  <Card sx={{marginRight:"2rem", marginTop:"2rem", marginBottom:"2rem", backgroundColor:"primary"}}><Typography variant="h4" sx={{padding:"1rem", backgroundColor:"secondary.light"}}>Wynik: {bmi}</Typography></Card>}
            {error &&  <Card sx={{marginRight:"2rem", marginTop:"2rem", marginBottom:"2rem", backgroundColor:"primary"}}><Typography variant="h4" sx={{padding:"1rem", backgroundColor:"secondary.light"}}>Niepoprawny wiek</Typography></Card>}
        </Box>


    </form>

    </Card>
}
export default BMICalculator;