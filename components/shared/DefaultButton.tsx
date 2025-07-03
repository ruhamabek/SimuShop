import { ComponentProps } from "react";
import { Button } from "tamagui";

interface Props extends Omit<ComponentProps<typeof Button> , "variant"> {
  onPress: VoidFunction;
  variant?: "primary" | "secondary";
}

export function DefaultButton({
  onPress,
  variant = "primary",
  children,
  ...props
}: Props) {
  // fallback colors in case token is not available
  const backgroundColor = variant === "primary" ? "lightblue" : "white";
  const borderColor = variant === "primary" ? "lightblue" : "gray";

  return (
    <Button
      onPress={onPress}
      height={50}
      borderRadius={50}
      textProps={{ fontSize: 18 }}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      {...props}
    >
      {children}
    </Button>
  );
}
