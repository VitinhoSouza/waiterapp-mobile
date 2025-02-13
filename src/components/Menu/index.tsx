import { FlatList } from "react-native";
import { products } from "../../mocks/products";
import { Text } from "../Text";
import {
  ProductImage,
  Product,
  ProductDetails,
  Separator,
  AddToCartButton,
} from "./styles";
import { PlusCircle } from "../Icons/PlusCircle";

export function Menu() {
  return (
    <FlatList
      style={{ marginTop: 24 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      data={products}
      keyExtractor={(product) => product._id}
      renderItem={({ item: product }) => (
        <Product key={product._id}>
          <ProductImage
            source={{
              uri: `http://192.168.1.108:3001/uploads/${product.imagePath}`,
            }}
          />
          <ProductDetails>
            <Text weight="600">{product.name}</Text>
            <Text
              size={14}
              color="#666"
              style={{
                marginVertical: 8,
              }}
            >
              {product.description}
            </Text>
            <Text size={14} weight="600">
              {new Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL",
              }).format(product?.price)}
            </Text>
          </ProductDetails>

          <AddToCartButton>
            <PlusCircle />
          </AddToCartButton>
        </Product>
      )}
      ItemSeparatorComponent={Separator}
    />
  );
}
