import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

// MATERIAL UI
import { Button, Grid, Typography } from "@mui/material";

function ProductDisplay(){

    return (
      <Grid container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Grid item container xs={12} justifyContent='center' alignItems='center' sx={{mt: '2%'}}>
            <img src='images/world.jpg' style={{width: '20%', mt: '2%'}}/>
          </Grid>
          <Grid item container xs={12} justifyContent='center' alignItems='center' sx={{mt: '2%'}}>
            <Typography variant='h4' component='p'>Want Access to International Trips?</Typography>
          </Grid>
          <Grid item container xs={12} justifyContent='center' alignItems='center'>
            <Typography variant='h4' component='p'>Upgrade to Premium Now!</Typography>
          </Grid>
          <Grid item container xs={12} justifyContent='center' alignItems='center' sx={{mt: '1%'}}>    
            <form action="/api/create-checkout-session" method="POST">
              <Button type='submit' variant='contained'>Upgrade</Button>
            </form>
          </Grid>
      </Grid>
    );
} 

const Message = ({ message }) => (
  <Grid container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
    <Grid item container xs={12} justifyContent='center' alignItems='center' sx={{mt: '4%'}}>
      <Typography variant='h6' component='p'>{message}</Typography>
    </Grid>
  </Grid>
);

export default function Upgrade() {
  const [message, setMessage] = useState('')
  const {editUser} = useContext(UserContext)

  useEffect(() => {
    // Check if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)

    if (query.get("success")) {
      setMessage("Success! You may now access GlobeTrekker's premium trips!")
      editUser({premium: 1})
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}