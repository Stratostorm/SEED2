import ClaimForm from "ClaimForm";

export default function EditClaim() {
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "normal",
        }}
      >
        <Typography component="h1" variant="h5" align="center">
          Create New Claim
        </Typography>
        <ClaimForm/>
      </Box>
    </Container>
  ); 
}