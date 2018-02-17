const typeDefinitions = `
type Ingredient {
  name: String!
  quantity: String
}

type Cocktail {
  name: String!
  imageURL: String!
  likes: Int!
  glassType: String!
  instructions: String!
  ingredients: [Ingredient]!,
}

type RootQuery {
  cocktails(name: String, ingredient: String): [Cocktail]!
}

schema {
  query: RootQuery
}
`;

module.exports = [typeDefinitions];