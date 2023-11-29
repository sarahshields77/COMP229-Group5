import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import homesplashImg from "./../assets/images/8BitBazaar-Splash_400px.png";
import { listLatestHome } from "./../product/api-product.js";
import LatestProducts from "./../core/LatestProducts";
import { list } from "./../shop/api-shop.js";
import FeaturedShops from "./../core/FeaturedShops";
import FusionFactoryLogo from "./../assets/images/FusionFactoryLogo_100px_white.png";

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
    minHeight: 400,
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
        <CardMedia
          className={classes.media}
          image={homesplashImg}
          title="8-Bit Bazaar "
          alt="Welcome to 8-Bit Bazaar - Your Retro Game Source!"
        />
      </Card>
      <LatestProducts products={data.products} />
      <FeaturedShops shops={data.shops} />
      <Card
        className={classes.card}
        style={{
          textAlign: "center",
          backgroundColor: "#200047",
          color: "#ffffff",
          padding: "10px",
        }}
      >
        <img
          src={FusionFactoryLogo}
          alt="Fusion Factory Logo"
          style={{
            verticalAlign: "middle",
            marginRight: "10px",
            width: "150px",
            height: "auto",
          }}
        />
        <Typography
          variant="body2"
          component="p"
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            textAlign: "center",
          }}
        >
          &copy; 2023 8-Bit Bazaar by Fusion Factory - Brayden Bouchard, Marcus
          Charles, Vincent Chen, Lyndsay Riches, Sarah Shields and Samantha
          Shirley
        </Typography>
      </Card>
    </div>
  );
}
