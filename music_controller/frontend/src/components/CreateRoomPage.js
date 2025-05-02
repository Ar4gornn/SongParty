import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";

// This class-based component represents the page for creating a new room.
export default class CreateRoomPage extends Component {
    // Default value for the number of votes required to skip a song.
    defaultVotes = 2;

    constructor(props) {
        super(props);
        // Component state to manage guest control and votes to skip.
        this.state = {
            guestCanPause: true, // Whether guests can control playback.
            votesToSkip: this.defaultVotes, // Number of votes required to skip a song.
        };

        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this); // Binding the method to the component instance.
        this.handleVotesChange = this.handleVotesChange.bind(this); // Binding the method to the component instance.
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this); // Binding the method to the component instance.
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
        console.log(this.state); // Log the current state for debugging.
    }

    // Method to handle the creation of a room when the button is pressed.
    handleRoomButtonPressed() {
        const requestOptions = {
            method: 'Post',
            headers: { 'Content-type' : 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
            }),
        };
        fetch('/api/create-room', requestOptions).then((response) => response.json().then((data) => console.log(data))); // Fetch request to create a room with the specified options.
    }

    // Render method to display the UI components.
    render() {
        return (
            <Grid container spacing={1}>
                {/* Title Section */}
                <Grid item xs = {12} align = "center">
                    <Typography component = "h4" variant = "h4">
                        Create a Room
                    </Typography>
                </Grid>

                {/* Guest Control Section */}
                <Grid item xs = {12} align = "center">
                    <FormControl component = "fieldset">
                        <FormHelperText component = "legend">
                            Guest Control of Playback State
                        </FormHelperText>
                        <RadioGroup 
                        row 
                        defaultValue = "true" 
                        onChange = {this.handleGuestCanPauseChange}
                        >
                            {/* Option for allowing guests to play/pause */}
                            <FormControlLabel
                                value = "true"
                                control = {<Radio color="primary" />}
                                label = "Play/Pause"
                                labelPlacement = "bottom"
                            />
                            {/* Option for disallowing guest control */}
                            <FormControlLabel
                                value = "false"
                                control = {<Radio color="secondary" />}
                                label = "No Control"
                                labelPlacement = "bottom"
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
                            defaultValue = {this.defaultVotes}
                            inputProps = {{
                                min: 1, // Minimum value for votes.
                                style: { textAlign: "center" }, // Center-align text.
                            }}
                        />
                        <FormHelperText>
                            <div align = "center">Votes Required to Skip Song</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>

                {/* Create Room Button */}
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
            </Grid>
        );
    }
}