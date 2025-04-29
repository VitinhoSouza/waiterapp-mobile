import { FlatList } from "react-native";

import { Text } from "../Text";
import {
  ProductImage,
  ProductDetails,
  Separator,
  AddToCartButton,
  ProductContainer,
} from "./styles";
import { PlusCircle } from "../Icons/PlusCircle";
import { ProductModal } from "../ProductModal";
import { useState } from "react";
import { Product } from "../../types/product";
import { machineIpAddress } from "../../utils/api";

interface MenuProps {
  onAddToCart: (product: Product) => void;
  products: Product[];
}

export function Menu({ onAddToCart, products }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <FlatList
        style={{ marginTop: 24 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        data={products}
        keyExtractor={(product) => product._id}
        renderItem={({ item: product }) => (
          <ProductContainer
            key={product._id}
            onPress={() => handleOpenModal(product)}
          >
            <ProductImage
              source={{
                uri: `${machineIpAddress}:3001/uploads/${product.imagePath}`,
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

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
        ItemSeparatorComponent={Separator}
      />
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
    </>
  );
}
