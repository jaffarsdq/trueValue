import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import * as React from "react";

export default function TopNavDropDown({
    icon: Icon = ArrowDropDownIcon,
    handleSelect,
    options = [],
    selectedOption = "",
    buttonLabel = "Select",
    backgroundColor = "defaultColor",
}) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(
        options.indexOf(selectedOption)
    );

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (event, index, option) => {
        handleSelect(option);
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup
                variant="contained"
                ref={anchorRef}
                sx={{
                    height: { xs: "30px", sm: "40px" },
                }}
                aria-label="Button group with a nested menu"
            >
                <Button
                    sx={{
                        borderColor: `${backgroundColor} !important`,
                        ":hover": {
                            background: backgroundColor,
                        },
                        backgroundColor: backgroundColor,
                    }}
                    onClick={handleClick}
                >
                    {buttonLabel}
                </Button>
                <Button
                    sx={{
                        borderColor: backgroundColor,
                        color: "white",
                        ":hover": {
                            background: backgroundColor,
                        },
                        backgroundColor: backgroundColor,
                    }}
                    size="small"
                    aria-controls={open ? "split-button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <Icon />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                    minWidth: "11%",
                    zIndex: 1111,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom"
                                    ? "center top"
                                    : "center bottom",
                        }}
                    >
                        <Paper
                            sx={{
                                maxHeight: 200, // Set the maximum height for the Paper component
                                overflow: "auto", // Make it scrollable
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={option === selectedOption}
                                            onClick={(event) =>
                                                handleMenuItemClick(
                                                    event,
                                                    index,
                                                    option
                                                )
                                            }
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}
