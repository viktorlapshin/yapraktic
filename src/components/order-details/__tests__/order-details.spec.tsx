import { describe } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { OrderDetails } from "../order-details";

describe("Header component", () => {
  it("should be equal to snapshot", () => {
    const { asFragment } = render(
      <OrderDetails onClose={() => {}} orderNumber={123} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("test close click", () => {
    let isClicked = false;

    render(
      <OrderDetails
        onClose={() => {
          isClicked = true;
        }}
        orderNumber={123}
      />
    );

    const element = screen.getByTestId("close-button");

    element.click();

    expect(isClicked).toBeTruthy();
  });
});
