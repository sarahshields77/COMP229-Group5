import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
<<<<<<< Updated upstream
import homesplashImg from "./../assets/images/home_splash.png";
import { listLatest } from "./../product/api-product.js";
=======
import homesplashImg from "./../assets/images/8BitBazaar-Splash_400px.png";
import { listLatestHome } from "./../product/api-product.js";
>>>>>>> Stashed changes
import LatestProducts from "./../core/LatestProducts";
import { list } from "./../shop/api-shop.js";
import FeaturedShops from "./../core/FeaturedShops";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: "100%",
    margin: "auto",
    marginTop: theme.spacing(5),
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 600,
  },
  body2: {
    textAlign: "center",
    margin: "auto",
  },
}));

export default function Home() {
  const classes = useStyles();

  // Display product grid of latest products and random shops
  const [data, setData] = React.useState({ products: [], shops: [] });
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    // Fetch latest products
    listLatestHome(signal)
      .then((productData) => {
        if (productData.error) {
          setError(productData.error);
        } else {
          // Fetch random shops
          list(signal)
            .then((shopData) => {
              if (shopData.error) {
                setError(shopData.error);
              } else {
                setData({ products: productData, shops: shopData });
              }
            })
            .catch((error) => setError(error.message));
        }
      })
      .catch((error) => setError(error.message));

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <Card className={classes.card}>
        <Typography variant="h6" className={classes.title}>
          {/* Welcome to 8-Bit Bazaar */}
        </Typography>
        <CardMedia
          className={classes.media}
          image={homesplashImg}
          title="8-Bit Bazaar "
        />
        <CardContent>
          <Typography variant="body2" component="p">
            Welcome to the 8-Bit Bazaar home page.
          </Typography>
        </CardContent>
      </Card>
      <LatestProducts products={data.products} />
      <FeaturedShops shops={data.shops} />
<<<<<<< Updated upstream
      <Card className={classes.card}>
        <Typography variant="body2" component="p">
          <center>
            Copyright 2023 - 8-Bit Bazaar by Fusion Factory - Brayden Bouchard,
            Marcus Charles, Vincent Chen, Lyndsay Riches, Sarah Shields and
            Samantha Shirley
          </center>
        </Typography>
=======
      <Card className={classes.card} style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", textAlign: "left" }}>
          <img
            src={FusionFactoryLogo}
            alt="Fusion Factory Logo"
            style={{
              verticalAlign: "middle",
              marginRight: "10px",
              width: "200px",
              height: "auto",
            }}
          />
          <Typography
            variant="body2"
            component="p"
            style={{ display: "inline-block", textAlign: "center" }}
          >
            Copyright 2023 - 8-Bit Bazaar by Fusion Factory - Brayden Bouchard,
            Marcus Charles, Vincent Chen, Lyndsay Riches, Sarah Shields and
            Samantha Shirley
          </Typography>
        </div>
>>>>>>> Stashed changes
      </Card>
    </div>
  );
}
