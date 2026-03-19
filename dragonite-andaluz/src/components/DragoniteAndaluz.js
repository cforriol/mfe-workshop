import React from "react";

const DragoniteAndaluz = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "16px",
                    position: "relative",
                    maxWidth: "90vw",
                    maxHeight: "90vh",
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        background: "none",
                        border: "none",
                        fontSize: "20px",
                        cursor: "pointer",
                        lineHeight: 1,
                    }}
                >
                    ✕
                </button>
                <img
                    src="https://s1.abcstatics.com/abc/www/multimedia/espana/2024/03/01/pokemon-gala-andalucia-RtosgJBbW3A5VV6EWlEpVYO-1200x840@diario_abc.jpg"
                    alt="Dragonite Andaluz"
                    style={{
                        display: "block",
                        maxWidth: "100%",
                        maxHeight: "80vh",
                    }}
                />
            </div>
        </div>
    );
};

export default DragoniteAndaluz;
