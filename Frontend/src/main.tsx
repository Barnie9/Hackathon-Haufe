import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ThemeContextProvider from "./context/ThemeContext/ThemeContextProvider.tsx";
import UserContextProvider from "./context/UserContext/UserContextProvider.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<ThemeContextProvider>
			<UserContextProvider>
				<App />
			</UserContextProvider>
		</ThemeContextProvider>
	</QueryClientProvider>,
);
