import { FlatList, Modal } from "react-native";
import { Text } from "../Text";
import { Product } from "../../types/product";
import {
  CloseButton,
  Footer,
  FooterContainer,
  Header,
  Image,
  Ingredient,
  IngredientsContainer,
  ModalBody,
  PriceContainer,
} from "./styles";
import { Close } from "../Icons/Close";
import { Button } from "../Button";

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product | null;
}

export function ProductModal({ visible, onClose, product }: ProductModalProps) {
  if (!product) return null;
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `http://192.168.1.108:3001/uploads/${product.imagePath}`,
        }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>

      <ModalBody>
        <Header>
          <Text size={24} weight="600">
            {product?.name}
          </Text>
          <Text color="#666" style={{ marginTop: 8 }}>
            {product?.description}
          </Text>
        </Header>

        {product?.ingredients?.length > 0 && (
          <IngredientsContainer>
            <Text weight="600" color="#666">
              Ingredientes
            </Text>

            <FlatList
              data={product.ingredients}
              keyExtractor={(ingredient) => ingredient._id}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              renderItem={({ item: ingredient }) => (
                <Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text size={14} color="#666" style={{ marginLeft: 20 }}>
                    {ingredient.name}
                  </Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>

      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color="#666">Preço</Text>
            <Text size={20} weight="600">
              {new Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL",
              }).format(product?.price)}
            </Text>
          </PriceContainer>

          <Button onPress={() => {}}>Adicionar ao pedido</Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
