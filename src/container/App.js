import React, { Component, Fragment } from "react";
import axios from "axios";
import { H1, H2, H3, Text } from "../components/Text";
import Flex from "../components/Flex";
import Container from "../components/Container";
import Hero from "../components/Hero";
import Button from "../components/Button";
import InputField from "../components/InputField";
import InputFile from "../components/InputFile";
import ImagePreview from "../components/ImagePreview";
import { image_example } from "../helpers/mockdata";
import { ocr_response_format } from "../helpers/helpers";
import { find_harmful_ingredients } from "../helpers/harmful_ingredients_list";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_name: "",
      product_price: "",
      ingredients: [],
      harmful_ingredients: [],
      image_preview: ""
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState({
      product_name: "",
      product_price: "",
      ingredients: [],
      harmful_ingredients: [],
      image_preview: ""
    });
  }

  handleOnLoadImage(e) {
    this.resetState();
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        image_preview: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const { image_preview } = this.state;
    const img = image_preview;

    let formData = new FormData();
    formData.append("base64image", img);
    formData.append("language", "eng");
    formData.append("apikey", "cd7318c36b88957");

    axios({
      method: "post",
      url: "https://api.ocr.space/parse/image",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: formData
    })
      .then(response => {
        let parse_response = JSON.parse(response.request.responseText);
        let ingredients_array = ocr_response_format(
          parse_response.ParsedResults[0].ParsedText
        );
        let harmful_ingredients_array = find_harmful_ingredients(
          ingredients_array
        );
        this.setState({
          ingredients: ingredients_array,
          harmful_ingredients: harmful_ingredients_array
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  render() {
    return (
      <Fragment>
        <Hero>
          <Flex flexDirection="column">
            <H1 color="white">Ingredient Checker</H1>
            <H2 color="white">Your health matter</H2>
          </Flex>
        </Hero>
        <Flex>
          <Container maxWidth="1024px">
            <Flex alignItems="flex-start">
              <Container>
                <H2>Enter basic information</H2>
                <InputField label="Product name" />
                <InputField label="Price" />
                <Button
                  fluid
                  label="Check ingredients"
                  type="submit"
                  onClick={this.handleOnSubmit}
                />
              </Container>
              <Container>
                <H2>Harmfull ingredients: </H2>
                {this.state.harmful_ingredients ? (
                  this.state.harmful_ingredients.map(item => (
                    <Text key={item} color="red">
                      {item}
                    </Text>
                  ))
                ) : (
                  <Text>Product has not scanned yet</Text>
                )}
                <H2>Scan product label</H2>
                <ImagePreview src={this.state.image_preview} />
                <InputFile
                  fluid
                  type="file"
                  label="Upload file"
                  id="file_upload"
                  onChange={e => this.handleOnLoadImage(e)}
                />
              </Container>
            </Flex>
          </Container>
        </Flex>
      </Fragment>
    );
  }
}
