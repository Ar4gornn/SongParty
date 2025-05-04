import React, { Component } from "react";
import { Button, TextField, Grid, Typography, FormHelperText, 
    Radio, RadioGroup, FormControlLabel, FormControl, Collapse } from "@material-ui/core/";
import { Link } from "react-router-dom";
import { Alert } from '@material-ui/lab';




// This class-based component represents the page for creating a new room.
export default class CreateRoomPage extends Component {
    // Default value for the number of votes required to skip a song.
    static defaultProps = {
        votesToSkip: 2,
        guestCanPause: true,
        update: false,
        roomCode: null,
        updateCallback: () => {},
    }

    constructor(props) {
        super(props);
        // Component state to manage guest control and votes to skip.
        this.state = {
            guestCanPause: this.props.guestCanPause, // Whether guests can control playback.
            votesToSkip: this.props.votesToSkip, // Number of votes required to skip a song.
            successMessage: "",
            errorMessage: "", 
            
        };

        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this); // Binding the method to the component instance.
        this.handleVotesChange = this.handleVotesChange.bind(this); // Binding the method to the component instance.
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this); // Binding the method to the component instance.
        this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this); // Binding the method to the component instance.
    }

    // Method to handle changes in the guest control radio buttons.
    handleVotesChange(event) {
        this.setState({
            votesToSkip: event.target.value, // Update votes to skip based on user input.
        });
    }

    // Method to handle changes in the guest control radio buttons.
    handleGuestCanPauseChange(event) {
        this.setState({
            guestCanPause: event.target.value === "true" ? true : false, // Update guest control based on user selection.
        });
    }

    // Method to handle the creation of a room when the button is pressed.
    handleRoomButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
            }),
        };
        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => this.props.history.push("/room/" + data.code));
    }

    handleUpdateButtonPressed() {
        const requestOptions = {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            votes_to_skip: this.state.votesToSkip,
            guest_can_pause: this.state.guestCanPause,
            code: this.props.roomCode,
          }),
        };
        fetch("/api/update-room", requestOptions).then((response) => {
          if (response.ok) {
            this.setState({
              successMessage: "Room updated successfully!",
            });
          } else {
            this.setState({
              errorMessage: "Error updating room...",
            });
          }
          this.props.updateCallback();
        });
      }


    renderCreateButtons() {
        return (<Grid container spacing={1}>
            <Grid item xs = {12} align = "center">
                <Button color = "primary" variant = "contained" onClick = {this.handleRoomButtonPressed}>
                    Create a Room
                </Button>
            </Grid>

                {/* Back Button */}
                <Grid item xs = {12} align="center">
                    <Button
                        color = "secondary"
                        variant = "contained"
                        to = "/"
                        component = {Link}
                    >
                        Back
                    </Button>
                </Grid>
        </Grid>)
    }

    renderUpdateButtons() {
        return (
            <Grid item xs = {12} align = "center">
                    <Button color = "primary" variant = "contained" onClick = {this.handleUpdateButtonPressed}>
                        Update Room
                    </Button>
                </Grid>

)
    }

    // Render method to display the UI components.
    render() {
        const title = this.props.update ? "Update Room" : "Create a Room"; // Determine the title based on whether it's an update or creation.
    
        return (
            <Grid container spacing={1}>
                {/* Title Section */}
                <Grid item xs = {12} align = "center">
                    <Collapse in = {this.state.errorMessage != "" || this.state.successMessage != ""}>
                        {this.state.successMessage != "" ? (
                        <Alert
                            severity="success"
                            onClose={() => {
                            this.setState({ successMessage: "" });
                            }}
                        >
                            {this.state.successMessage}
                        </Alert>
                        ) : (
                        <Alert
                            severity="error"
                            onClose={() => {
                            this.setState({ errorMessage: "" });
                            }}
                        >
                            {this.state.errorMessage}
                        </Alert>
                        )}
                    </Collapse>
                </Grid>
                <Grid item xs = {12} align = "center">
                    <Typography component = "h4" variant = "h4">
                        {title}
                    </Typography>
                </Grid>

                {/* Guest Control Section */}
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText component="legend">
                            Guest Control of Playback State
                        </FormHelperText>
                        <RadioGroup
                            row
                            value={this.state.guestCanPause.toString()} // Use value instead of defaultValue
                            onChange={this.handleGuestCanPauseChange}
                        >
                            {/* Option for allowing guests to play/pause */}
                            <FormControlLabel
                                value="true"
                                control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom"
                            />
                            {/* Option for disallowing guest control */}
                            <FormControlLabel
                                value="false"
                                control={<Radio color="secondary" />}
                                label="No Control"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                {/* Votes to Skip Section */}
                <Grid item xs = {12} align = "center">
                    <FormControl>
                        <TextField
                            required = {true}
                            type = "number"
                            onChange = {this.handleVotesChange}
                            defaultValue = {this.state.votesToSkip}
                            inputProps = {{
                                min: 1, // Minimum value for votes.
                                style: { textAlign: "center" }, // Center-align text.
                            }}
                        />
                        <FormHelperText>
                            <span align="center">Votes Required to Skip Song</span>
                        </FormHelperText>
                    </FormControl>
                </Grid>

                {this.props.update ? this.renderUpdateButtons() : this.renderCreateButtons()}
            </Grid>
        );
    }
}