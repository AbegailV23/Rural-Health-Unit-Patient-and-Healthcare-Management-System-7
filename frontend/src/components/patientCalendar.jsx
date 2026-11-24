
import { useState } from "react";

const PatientCalendar = ({ selectedDate, setSelectedDate }) => {

    const months = [
        { name: "November", year: 2026, month: 10 },
        { name: "December", year: 2026, month: 11 },
        { name: "January", year: 2027, month: 0 },
        { name: "February", year: 2027, month: 1 },
        { name: "March", year: 2027, month: 2 },
        { name: "April", year: 2027, month: 3 },
        { name: "May", year: 2027, month: 4 },
        { name: "June", year: 2027, month: 5 },
        { name: "July", year: 2027, month: 6 },
        { name: "August", year: 2027, month: 7 },
        { name: "September", year: 2027, month: 8 },
        { name: "October", year: 2027, month: 9 },
        { name: "November", year: 2027, month: 10 },
        { name: "December", year: 2027, month: 11 }
    ];

    const [monthIndex, setMonthIndex] = useState(0);

    const currentMonth = months[monthIndex];

    const firstDay = new Date(
        currentMonth.year,
        currentMonth.month,
        1
    ).getDay();

    const totalDays = new Date(
        currentMonth.year,
        currentMonth.month + 1,
        0
    ).getDate();

    const novemberDays = [
        { date: 17, status: "Few Left", slots: "1 left" },
        { date: 18, status: "Open", slots: "13 open" },
        { date: 19, status: "Few Left", slots: "3 left" },
        { date: 20, status: "Open", slots: "13 open" },
        { date: 21, status: "Off", slots: "" },
        { date: 22, status: "Off", slots: "" },
        { date: 23, status: "Open", slots: "7 open" },
        { date: 24, status: "Open", slots: "7 open" },
        { date: 25, status: "Open", slots: "7 open" },
        { date: 26, status: "Open", slots: "8 open" },
        { date: 27, status: "Open", slots: "8 open" },
        { date: 28, status: "Off", slots: "" },
        { date: 29, status: "Off", slots: "" },
        { date: 30, status: "Off", slots: "" }
    ];

    const days = [];

    for (let i = 0; i < firstDay; i++) {
        days.push({ date: "", status: "Blank", slots: "" });
    }

    for (let i = 1; i <= totalDays; i++) {

        let dayStatus = "Open";
        let daySlots = "";

        if (monthIndex === 0) {
            const existingDay = novemberDays.find(
                (day) => day.date === i
            );

            if (i >= 17 && existingDay) {
                dayStatus = existingDay.status;
                daySlots = existingDay.slots;
            }
        }

        days.push({
            date: i,
            status: dayStatus,
            slots: daySlots
        });
    }

    const changeMonth = (newIndex) => {
        setMonthIndex(newIndex);
        setSelectedDate("");
    };

    const selectDate = (day) => {
        const year = currentMonth.year;
        const month = String(currentMonth.month + 1).padStart(2, "0");
        const date = String(day).padStart(2, "0");

        setSelectedDate(`${year}-${month}-${date}`);
    };

    return (
        <section className="calendar-card">

            <div className="calendar-header">
                <h3>{currentMonth.name} {currentMonth.year}</h3>

                <div className="calendar-navigation">
                    <button
                        className="month-arrow"
                        disabled={monthIndex === 0}
                        onClick={() => changeMonth(monthIndex - 1)}
                    >
                        ‹
                    </button>

                    <button
                        className="month-arrow"
                        disabled={monthIndex === months.length - 1}
                        onClick={() => changeMonth(monthIndex + 1)}
                    >
                        ›
                    </button>
                </div>
            </div>

            <div className="calendar-weekdays">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
            </div>

            <div className="calendar-days">
                {days.map((day, index) => (
                    <button
                        key={index}
                        disabled={
                            day.status === "Off" ||
                            day.status === "Blank"
                        }
                        className={
                            day.status === "Blank"
                                ? "calendar-day blank"
                                : selectedDate ===
                                  `${currentMonth.year}-${String(currentMonth.month + 1).padStart(2, "0")}-${String(day.date).padStart(2, "0")}`
                                ? "calendar-day selected"
                                : day.status === "Few Left"
                                ? "calendar-day few-left"
                                : day.status === "Off"
                                ? "calendar-day off"
                                : "calendar-day"
                        }
                        onClick={() => selectDate(day.date)}
                    >
                        <strong>{day.date}</strong>
                        <span>{day.slots}</span>
                    </button>
                ))}
            </div>

            <div className="calendar-legend">
                <span>□ Open</span>
                <span>🟨 Few Left</span>
                <span>▧ Full</span>
                <span>🟦 Selected</span>
            </div>

        </section>
    );
};

export default PatientCalendar;
