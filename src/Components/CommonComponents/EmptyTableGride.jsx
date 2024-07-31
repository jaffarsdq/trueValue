import { TableCell, tableCellClasses,TableRow, Typography } from "@mui/material";
import { useTheme  } from "@mui/material/styles";
import styled from "styled-components";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   
}));


export default function Emptyrow({colSpan}){
  
    return(
        <StyledTableRow>
                                <StyledTableCell colSpan={colSpan}>
                                    <Typography
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                        }}
                                    >
                                        No Data Available.
                                    </Typography>
                                </StyledTableCell>
                            </StyledTableRow>
    )
}