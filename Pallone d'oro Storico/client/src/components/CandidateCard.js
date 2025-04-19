import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// Importa le immagini dei giocatori
import messiImage from "../assets/players/messi.jpg";
import cr7Image from "../assets/players/cr7.jpg";
import mbappeImage from "../assets/players/mbappe.jpg";
import r9Image from "../assets/players/r9.jpg";
import maradonaImage from "../assets/players/maradona.jpg";
import peleImage from "../assets/players/pele.jpg";

const playerImages = {
  Messi: messiImage,
  CR7: cr7Image,
  Mbappe: mbappeImage,
  R9: r9Image,
  Maradona: maradonaImage,
  Pele: peleImage
};

export default function Candidate({ id, name, voteCount }) {
  const IMG = playerImages[name] || "https://via.placeholder.com/300";

  return (
    <Card sx={{ maxWidth: 345, minWidth: 300 }}>
      <CardHeader
        title={
          <Typography align="center" variant="subtitle1">
            {name}
          </Typography>
        }
      />
      <CardContent sx={{ padding: 0 }}>
        <CardMedia
          component="img"
          alt={name}
          height="140"
          image={IMG}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        {voteCount && (
          <Typography align="center" variant="subtitle1">
            <strong>{voteCount}</strong> voti
          </Typography>
        )}
      </CardActions>
    </Card>
  );
}
