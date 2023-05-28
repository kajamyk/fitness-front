import {Box, Button, Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

const NotFound = () => {
    return <>
        <Link component={RouterLink} to="/">
            <Button variant="outlined" color="accent" sx={{margin: "1rem"}}
                    size="large">Powrót do strony głównej</Button>
        </Link>
        <Box sx={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: 'center',
            width: "100%",

        }}>
            <img src="no-data.svg" alt={"Not Found"} width="800px"></img>
        </Box>
    </>
}

export default NotFound;