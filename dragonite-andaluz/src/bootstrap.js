import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import DragoniteAndaluz from "./components/DragoniteAndaluz";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <div>
            <p
                style={{
                    margin: "10px 0 0 0",
                    textAlign: "center",
                    fontSize: "14px",
                    opacity: 0.8,
                }}
            >
                [Dragonite Andaluz MFE - Port 3999]
            </p>
            <DragoniteAndaluz />
        </div>
    </React.StrictMode>,
);
