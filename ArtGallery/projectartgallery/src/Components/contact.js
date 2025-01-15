import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Paper, Box } from "@mui/material";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    id: "", // Added an 'id' field
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous error messages
    setSuccessMessage(null); // Reset success message
  
    // Validate that all fields are filled out
    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required.");
      return;
    }
  
    console.log("Form Data Submitted:", formData); // Log for debugging
  
    try {
      // Perform the POST request to submit the form data
      const response = await fetch("http://127.0.0.1:8000/api/contacts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure it's JSON
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });
  
      // Log the status code and response for debugging
      console.log("Response Status:", response.status);
  
      if (!response.ok) {
        const result = await response.json();
        console.log("Response Error Details:", result);
        throw new Error(`Failed to submit form, status code: ${response.status}, Details: ${JSON.stringify(result)}`);
      }
  
      const result = await response.json();
      console.log("API Response:", result);  // Log the response
  
      if (result && result.id) { // Check if backend returns an 'id'
        setSuccessMessage("Thank you for contacting us! We will get back to you shortly.");
        setFormData({ name: "", email: "", message: "", id: "" }); // Clear the form
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(`An error occurred: ${error.message}`);
    }
  };
  

  return (
    <div className="abc">
      <Box className="contact-container" sx={{ maxWidth: 600, margin: "0 auto", padding: 3 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Contact Us
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="ID (Optional)"
                  variant="outlined"
                  fullWidth
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Message"
                  variant="outlined"
                  fullWidth
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              {error && (
                <Grid item xs={12}>
                  <Typography color="error" variant="body2" align="center">
                    {error}
                  </Typography>
                </Grid>
              )}

              {successMessage && (
                <Grid item xs={12}>
                  <Typography color="primary" variant="body2" align="center">
                    {successMessage}
                  </Typography>
                </Grid>
              )}

              <Grid item xs={12} align="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ padding: "10px 20px" }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default Contact;
