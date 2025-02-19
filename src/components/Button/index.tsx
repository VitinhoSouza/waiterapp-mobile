import { ReactNode } from "react";
import { Text } from "../Text";
import { Container } from "./styles";
import { ActivityIndicator } from "react-native";

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({
  children,
  onPress,
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <Container onPress={onPress} disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text weight="600" color="#fff">
          {children}
        </Text>
      )}
    </Container>
  );
}
