import {useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import {Box, Button, Card, TextField, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import * as React from "react";
import useHttp from "../../hooks/use-http";

const BFPCalculator = () => {
    const [bfp, setBfp] = useState(false);
    const { isLoading, sendRequest: sendBFPRequest } = useHttp();
    const [error, setError] = useState(false);
    const bfpHandler = async (body) => {
        setError(false)
        try {
            await sendBFPRequest({
                url: 'http://localhost:8080/calculators/bfp',
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('Auth')
                },
            }, setBFPRequestResult);
        } catch (error) {
            setError(true)
        }
    };

    const setBFPRequestResult = (data) => {
        setBfp(data);
    }
    const validationSchema = yup.object({
        neckSize: yup
            .number('Podaj wymiar szyji')
            .required('Wymiar szyi jest wymagany')
            .min(1, "Wymiar musi być większy od 1"),
        hipSize: yup
            .number('Podaj wymiar bioder')
            .required('Wymiar bioder jest wymagany')
            .min(1, "Wymiar musi być większy od 1"),
        waistSize: yup
            .number('Podaj wymiar talii')
            .required('Wymiar talii jest wymagany')
            .min(1, "Wymiar musi być większy od 1"),
        height: yup
            .number('Podaj wzrost')
            .required('Wzorost jest wymagany')
            .min(1, "Wzrost musi być większy od 1")
            .max(300, "Wzrost musi być mniejszy od 300"),

    });


    const formik = useFormik({
        initialValues: {
            neckSize:0,
            hipSize:0,
            waistSize:0,
            height:0
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            bfpHandler(JSON.stringify(values));
        },
    });

    return <Card sx={{width:"80vw", backgroundColor: "accent.light", margin:"1rem"}}>
        <Typography sx={{margin:"1rem"}}>Kalkulator poziomu tkanki tłuszczowej to przydatne narzędzie, dzięki któremu możesz ustalić, jaki procent Twojego ciała stanowi tłuszcz. Należy pamiętać, że wskaźnik ten nie jest wyznacznikiem Twojej ogólnej sprawności, czy zdrowia, do których określenia bardziej odpowiedni jest BMI indeks. Jednakże licznik tkanki tłuszczowej może dostarczyć Ci szeregu informacji na temat Twojego ciała i wskazać kierunek zmian, jakie powinieneś wprowadzić w  trybie życia, by wyregulować zawartość tłuszczu w swoim organizmie. </Typography>
        <form onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                id="neckSize"
                name="neckSize"
                type="number"
                label="Wymar szyji w cm"
                value={formik.values.neckSize}
                onChange={formik.handleChange}
                error={formik.touched.neckSize && Boolean(formik.errors.neckSize)}
                helperText={formik.touched.neckSize && formik.errors.neckSize}
                sx={{margin: '1rem', width: "80%", marginTop: "3rem"}}
            />
            <TextField
                fullWidth
                id="hipSize"
                name="hipSize"
                type="number"
                label="Wymiar bioder w cm"
                value={formik.values.hipSize}
                onChange={formik.handleChange}
                error={formik.touched.hipSize && Boolean(formik.errors.hipSize)}
                helperText={formik.touched.hipSize && formik.errors.hipSize}
                sx={{margin: '1rem', width: "80%", marginTop: "3rem"}}
            />
            <TextField
                fullWidth
                id="waistSize"
                name="waistSize"
                type="number"
                label="Wymiar talii w cm"
                value={formik.values.waistSize}
                onChange={formik.handleChange}
                error={formik.touched.waistSize && Boolean(formik.errors.waistSize)}
                helperText={formik.touched.waistSize && formik.errors.waistSize}
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
                    disabled={(formik.touched.height && formik.errors.height) || (formik.touched.neckSize && formik.errors.neckSize) || (formik.touched.hipSize && formik.errors.hipSize) || (formik.touched.waistSize && formik.errors.waistSize)}
                    color="primary" variant="contained" type="submit"
                    size="medium"
                    sx={{margin:"1rem"}}>
                    Oblicz BFP
                </Button>
                {bfp &&  <Card sx={{marginRight:"2rem", marginTop:"2rem", marginBottom:"2rem", backgroundColor:"primary"}}><Typography variant="h4" sx={{padding:"1rem", backgroundColor:"secondary.light"}}>Wynik: {bfp.toFixed(2)}%</Typography></Card>}
            </Box>


        </form>

    </Card>
}

export default BFPCalculator;