
import React, { useState, useEffect } from "react";

import MedicineHeader from "../components/pharmacistMedicineHeader.jsx";
import MedicineForm from "../components/pharmacistMedicineForm.jsx";
import MedicineList from "../components/pharmacistMedicineList.jsx";

const API_URL = "http://127.0.0.1:3000/medicine";

export default function PharmacistDashboard() {
    const [medicines, setMedicines] = useState([]);

    const [form, setForm] = useState({
        name: "",
        category: "",
        quantity: "",
        expiration: "",
        description: ""
    });

    const [editing, setEditing] = useState(null);

    async function getData() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            setMedicines(data);
        } catch (error) {
            console.log(error);
            alert("Cannot connect to the server.");
        }
    }

    useEffect(() => {
        getData();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        const method = editing ? "PUT" : "POST";
        const url = editing ? `${API_URL}/${editing}` : API_URL;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert(data.message);

            setForm({
                name: "",
                category: "",
                quantity: "",
                expiration: "",
                description: ""
            });

            setEditing(null);
            getData();

        } catch (error) {
            console.log(error);
            alert("Something went wrong.");
        }
    }

    function handleEdit(medicine) {
        setForm({
            name: medicine.name,
            category: medicine.category,
            quantity: medicine.quantity,
            expiration: String(medicine.expiration).slice(0, 10),
            description: medicine.description || ""
        });

        setEditing(medicine.id);
    }

    async function handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this medicine?")) {
            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: "DELETE"
                });

                const data = await response.json();

                if (!response.ok) {
                    alert(data.message);
                    return;
                }

                alert(data.message);
                getData();

            } catch (error) {
                console.log(error);
                alert("Unable to delete medicine.");
            }
        }
    }

    return (
        <div className="pharmacist-dashboard">

            <MedicineHeader />

            <div className="pharmacist-content">

                <MedicineForm
                    form={form}
                    setForm={setForm}
                    handleSubmit={handleSubmit}
                    editing={editing}
                />

                <MedicineList
                    medicines={medicines}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />

            </div>
        </div>
    );
}
