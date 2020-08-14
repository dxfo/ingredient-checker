import React from "react";

export const harmful_ingredients_list = [
  "SODIUM NITRATE",
  "AZODICARBONAMIDE",
  "POTASSIUM BROMATE",
  "PROPYL GALLATE",
  "BHA",
  "BHT",
  "PROPYLENE GLYCOL",
  "BUTANE",
  "MONOSODIUM GLUTAMATE",
  "DISODIUM INOSINATE",
  "DISODIUM GUANYLATE",
  "REFINED VEGETABLE OIL",
  "SODIUM BENZOATE",
  "BROMINATED VEGETABLE OIL",
  "PLACEHOLDER",
  "OLESTRA",
  "CARRAGEENAN",
  "POLYSORBATE 60",
  "CAMAUBA WAX",
  "MAGNESIUM SULPHATE",
  "CHLORINE DIOXIDE",
  "PARABEN",
  "SODIUM CARBOXYMETHYL CELLULOSE"
];

export const harmful_ingredients_list_inline = harmful_ingredients_list.map(
  (item, i) => (
    <span key={i}>
      {item}
      {i < harmful_ingredients_list.length - 1 ? ", " : "."}
    </span>
  )
);

export const find_harmful_ingredients = list => {
  let find_intersection = list.filter(item =>
    harmful_ingredients_list.includes(item)
  );
  if (find_intersection.length > 0) {
    return find_intersection;
  }
  return ["We could not find any harmful ingredients"];
};
