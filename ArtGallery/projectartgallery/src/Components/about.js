import React from "react";
import { Typography, Grid, Paper, Box, Card, CardContent, Button } from "@mui/material";
import img1 from './Abstract Art.jpg';
import img2 from './Abstract Landscape.webp';
import img3 from './Modern Art.jpg';
import "./about.css";

const About = () => {
  return (
    <div>
      <Box sx={{ padding: 3 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to Our Art Gallery
      </Typography>

      <Paper elevation={3} sx={{ padding: 4, marginBottom: 3 }}>
        <Typography variant="h5" align="center" paragraph>
          The Art Gallery is a space dedicated to celebrating creativity, artistic expressions, and cultural heritage. We believe that art is a bridge between minds and emotions. Our collection features various styles from both renowned and emerging artists.
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {/* History Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
              Our History
            </Typography>
            <Typography variant="body1" paragraph>
              Our gallery was founded in 2000 with the mission to create a platform for artists to showcase their work to a wider audience. Over the years, we have hosted numerous exhibitions, connecting art lovers and creators from around the world.
            </Typography>
          </Paper>
        </Grid>

        {/*] Vision & Mission Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
              Vision & Mission
            </Typography>
            <Typography variant="body1" paragraph>
              Our vision is to foster creativity, encourage diversity in art, and provide a space for artistic expression. Our mission is to support and promote the next generation of artists, curating exhibits that inspire and provoke thought.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Showcase Section */}
      <Typography variant="h4" align="center" gutterBottom>
        Featured Artwork
      </Typography>

      <Grid container spacing={4}>
        {/* Card 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <img src={img1} alt="Art" />
            <CardContent>
              <Typography variant="h6">Title of Artwork</Typography>
              <Typography variant="body2" color="textSecondary">
                Artist: John Doe
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <img src={img2} alt="Art" />
            <CardContent>
              <Typography variant="h6">Title of Artwork</Typography>
              <Typography variant="body2" color="textSecondary">
                Artist: Jane Smith
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 3 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <img src={img3} alt="Art" />
            <CardContent>
              <Typography variant="h6">Title of Artwork</Typography>
              <Typography variant="body2" color="textSecondary">
                Artist: Mark Johnson
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Contact Button Section */}
      <Box sx={{ textAlign: "center", marginTop: 5 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          href="/contact"
          sx={{ padding: "10px 30px" }}
        >
          Contact Us
        </Button>
      </Box>
    </Box>
    </div>
  );
};

export default About;
