import {useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import {Box, Button, Card, TextField, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import * as React from "react";
import useHttp from "../../hooks/use-http";

const ORMCalculator = () => {
    const [orm, setOrm] = useState(false);
    const { isLoading, sendRequest: sendORMRequest } = useHttp();
    const [error, setError] = useState(false);
    const ormHandler = async (body) => {
        setError(false)
        try {
            await sendORMRequest({
                url: 'http://localhost:8080/calculators/orm',
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('Auth')
                },
            }, setORMResult);
        } catch (error) {
            setError(true)
        }
    };

    const setORMResult = (data) => {
        setOrm(data)
    }

    const validationSchema = yup.object({
        weight: yup
            .number('Podaj wagę')
            .required('Waga jest wymagana')
            .min(1, "Waga musi być większa od 1")
            .max(600, "Waga musi byc mniejsza od 600"),
        numberOfReps: yup
            .number('Podaj wzrost')
            .integer('Liczba powtórzeń musi być liczbą całkowitą')
            .required('Liczba powtórzeń jest wymagana')
            .min(1, "Liczba powtórzeń musi być większa od 1"),
    });


    const formik = useFormik({
        initialValues: {
            weight:0,
            numberOfReps:0,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            ormHandler(JSON.stringify(values));
        },
    });

    return <Card sx={{width:"80vw", backgroundColor: "accent.light", margin:"1rem"}}>
        <Typography sx={{margin:"1rem"}}>Oblicz swój ciężar maksymalny (ORM) dla dowolnego ćwiczenia. Twój ORM to maksymalny ciężar, jaki możesz podnieść w pojedynczym powtórzeniu dla danego ćwiczenia.</Typography>
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
                id="numberOfReps"
                name="numberOfReps"
                type="number"
                label="Liczba powtórzeń"
                value={formik.values.numberOfReps}
                onChange={formik.handleChange}
                error={formik.touched.numberOfReps && Boolean(formik.errors.numberOfReps)}
                helperText={formik.touched.numberOfReps && formik.errors.numberOfReps}
                sx={{margin: '1rem', width: "80%", marginTop: "3rem"}}
            />
            <Divider/>
            <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <Button
                    disabled={(formik.touched.weight && formik.errors.weight) || (formik.touched.numberOfReps && formik.errors.numberOfReps)}
                    color="primary" variant="contained" type="submit"
                    size="medium"
                    sx={{margin:"1rem"}}>
                    Oblicz ORM
                </Button>
                {orm &&  <Card sx={{marginRight:"2rem", marginTop:"2rem", marginBottom:"2rem", backgroundColor:"primary"}}><Typography variant="h4" sx={{padding:"1rem", backgroundColor:"secondary.light"}}>Maksymalny ciężar: {orm.toFixed(2)} kg</Typography></Card>}
            </Box>


        </form>

    </Card>
}

export default ORMCalculator;