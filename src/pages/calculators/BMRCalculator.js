import {useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import {Box, Button, Card, InputLabel, Slider, TextField, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import * as React from "react";
import useHttp from "../../hooks/use-http";

const BMRCalculator = () => {
    const [bmr, setBmr] = useState(false);
    const { isLoading, sendRequest: sendBMRRequest } = useHttp();
    const [error, setError] = useState(false);
    const bmrHandler = async (body) => {
        setError(false)
        try {
            await sendBMRRequest({
                url: 'http://localhost:8080/calculators/bmr',
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('Auth')
                },
            }, setBMRResult);
        } catch (error) {
            setError(true)
        }
    };

    const setBMRResult = (data) => {
        setBmr(data)
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
            activityLevel:1,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            bmrHandler(JSON.stringify(values));
        },
    });

    return <Card sx={{width:"80vw", backgroundColor: "accent.light", margin:"1rem"}}>
        <Typography sx={{margin:"1rem"}}>Co to jest kalkulator BMR?
            To kalkulator zapotrzebowania kalorycznego człowieka, które jest potrzebne aby utrzymywać podstawowe funkcje organizmu zachodzące w układzie nerwowym, wątrobie, nerkach, sercu i pozostałych narządach Twojego ciała.</Typography>
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
            <InputLabel htmlFor="activityLevel" sx={{margin: '1rem', marginBottom: "0px"}}>
                Wybierz poziom aktywności:
            </InputLabel>
            <Slider
                id="activityLevel"
                name="activityLevel"
                type="number"
                label="Poziom aktywności"
                defaultValue={30}
                valueLabelDisplay="auto"
                value={formik.values.activityLevel}
                onChange={formik.handleChange}
                step={1}
                marks
                min={1}
                max={10}
                sx={{margin: '1rem', width: "80%", marginTop: "1rem"}}
            />
            <Divider/>
            <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <Button
                    disabled={(formik.touched.weight && formik.errors.weight) || (formik.touched.weight && formik.errors.weight)}
                    color="primary" variant="contained" type="submit"
                    size="medium"
                    sx={{margin: '1rem'}}>
                    Oblicz BMR
                </Button>
                {bmr &&  <Card sx={{marginRight:"2rem", marginTop:"2rem", marginBottom:"2rem"}}><Typography variant="h4" sx={{padding:"1rem"}}>Zapotrzebowanie dzienne:  {bmr.toFixed(0)} kalorii</Typography></Card>}
            </Box>


        </form>

    </Card>
}

export default BMRCalculator;