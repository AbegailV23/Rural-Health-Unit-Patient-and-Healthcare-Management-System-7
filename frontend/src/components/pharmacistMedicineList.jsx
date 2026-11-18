import React from "react";

export default function MedicineList({
    medicines,
    handleEdit,
    handleDelete
}) {
    return (
        <div className="medicine-list">
            <h2>Medicine Records</h2>

            {medicines.length === 0 ? (
                <p>No medicine records available.</p>
            ) : (
                <div className="medicine-grid">
                    {medicines.map((medicine) => (
                        <div className="medicine-card" key={medicine.id}>
                            <h3>{medicine.name}</h3>

                            <p>Category: {medicine.category}</p>
                            <p>Quantity: {medicine.quantity}</p>
                            <p>
                                Expiration:{" "}
                                {String(medicine.expiration).slice(0, 10)}
                            </p>
                            <p>Description: {medicine.description}</p>

                            <p>
                                Status:{" "}
                                {medicine.quantity === 0
                                    ? "Out of Stock"
                                    : medicine.quantity <= 10
                                    ? "Low Stock"
                                    : "Available"}
                            </p>

                            <div className="medicine-actions">
                                <button onClick={() => handleEdit(medicine)}>
                                    Edit
                                </button>

                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(medicine.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}