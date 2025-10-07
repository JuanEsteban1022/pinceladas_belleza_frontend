import { useState, useEffect } from "react";
import SkinTestForm from "./SkinTestForm";

export default function SkinTestModal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            console.log("Tecla presionada:", e.key);
            if (e.key === "Escape") {
                closeModal();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <>
            <div className="skin-test-container">
                <button className="btn-cloud" onClick={openModal}>
                    Descubre tu tipo de piel
                </button>
            </div>

            {isOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal} aria-label="Cerrar modal">×</button>
                        <SkinTestForm />
                    </div>
                </div>
            )}
        </>
    );
}
