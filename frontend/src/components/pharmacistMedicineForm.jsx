import React from "react";

export default function MedicineForm({
    form,
    setForm,
    handleSubmit,
    editing
}) {
    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    return (
        <form className="medicine-form" onSubmit={handleSubmit}>
            <h2>{editing ? "Update Medicine" : "Add New Medicine"}</h2>

            <label>Medicine Name</label>
            <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter medicine name"
                required
            />

            <label>Category</label>
            <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
            >
                <option value="">Select Category</option>
                <option value="Tablet">Tablet</option>
                <option value="Capsule">Capsule</option>
                <option value="Syrup">Syrup</option>
                <option value="Liquid">Liquid</option>
                <option value="Injection">Injection</option>
            </select>

            <label>Quantity</label>
            <input
                type="number"
                name="quantity"
                min="0"
                value={form.quantity}
                onChange={handleChange}
                required
            />

            <label>Expiration Date</label>
            <input
                type="date"
                name="expiration"
                value={form.expiration}
                onChange={handleChange}
                required
            />

            <label>Description</label>
            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter medicine description"
            />

            <button type="submit">
                {editing ? "Update Medicine" : "Add Medicine"}
            </button>
        </form>
    );
}