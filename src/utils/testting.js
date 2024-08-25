import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider, AuthContext } from "./AuthProvider";
import axios from "axios";
import Cookies from "js-cookie";
import SomeComponent from "../test/SomeComponent.test";

// Mocks
jest.mock("axios");
jest.mock("js-cookie");

// Test case
test("should refresh access token on 401 error", async () => {
  // Setup mocks
  const mockRefreshToken = "mockRefreshToken";
  const mockNewAccessToken = "mockNewAccessToken";
  Cookies.get.mockReturnValue(mockRefreshToken);
  axios.post.mockResolvedValueOnce({
    data: { access_token: mockNewAccessToken },
  });
  axios.get.mockRejectedValueOnce({ response: { status: 401 } });

  // Render component with AuthProvider
  render(
    <AuthProvider>
      <SomeComponent />
    </AuthProvider>
  );

  // Trigger API call that requires a valid access token
  await waitFor(() => expect(axios.get).toHaveBeenCalled());

  // Check if refresh token was used
  expect(axios.post).toHaveBeenCalledWith("/refresh-token-endpoint", {
    refreshToken: mockRefreshToken,
  });

  // Check if the new access token is being used
  await waitFor(() =>
    expect(axios.get).toHaveBeenCalledWith("/protected-endpoint", {
      headers: { Authorization: `Bearer ${mockNewAccessToken}` },
    })
  );
});
