import {Box, Button, Card, Link, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

const HomePage = () => {

    return (
        <Box sx={{backgroundImage: `url("colorkit.png")`, width: "100%", height: "min-content", minHeight: "100vh"}}>
            <Box sx={{display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center"}}>
                <Typography variant="h1"
                            sx={{margin: "1rem", marginLeft: "3rem", textAlign: "center", color: "secondary.dark"}}>
                    HerFitnessHub
                </Typography>

                <Box sx={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                    <Link component={RouterLink} to="/login">
                        <Button variant="contained" color="secondary" sx={{margin: "1rem"}}
                                size="large">Zaloguj</Button>
                    </Link>
                    <Link component={RouterLink} to="/register">
                        <Button variant="outlined" color="secondary" sx={{margin: "1rem"}}
                                size="large">Zarejestruj</Button>
                    </Link>
                </Box>
            </Box>
            <Box sx={{display: "flex", width: "100%", justifyContent: "flex-start", alignItems: "flex-start"}}>
                <img src="main.svg" width="700 rem" style={{marginLeft: "5rem"}}></img>
                <Card sx={{margin: "4rem", backgroundColor: "accent.light"}}>
                    <Typography variant="h4" sx={{margin: "4rem", textAlign: "center"}}>
                        Witaj na naszej aplikacji dla kobiet, która łączy w sobie forum i artykuły z zakresu zdrowia,
                        urody, fitnessu, rozwoju osobistego i wielu innych tematów, które Cię interesują.
                        W naszej sekcji artykułów znajdziesz najnowsze informacje na temat zdrowia i urody, porady
                        dotyczące fitnessu i żywienia oraz wiele innych ciekawych treści. Nasze artykuły są pisane przez
                        ekspertów z różnych dziedzin, którzy chcą dzielić się swoją wiedzą i pomóc Ci w osiągnięciu
                        Twoich celów.
                        W naszym forum znajdziesz miejsce, gdzie możesz zadawać pytania, dzielić się swoimi
                        doświadczeniami i rozmawiać z innymi kobietami na różne tematy. Niezależnie od tego, czy
                        potrzebujesz porady dotyczącej zdrowia, życia rodzinnego, pracy czy relacji, nasza społeczność
                        jest tu, aby Ci pomóc.
                        Dołącz do naszej społeczności już dziś i odkryj, jak wiele możesz zyskać, dzieląc się swoimi
                        doświadczeniami i korzystając z wiedzy innych kobiet. Zarejestruj się teraz i dołącz do naszej
                        społeczności!
                    </Typography>
                </Card>

            </Box>
        </Box>
    )
}

export default HomePage;