import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [lessons, setLessons] = useState([]);
  const [students] = useState(["Amit", "Priya", "Rahul", "Sneha"]);
  const [attendance, setAttendance] = useState({});
  const [notes, setNotes] = useState("");

  useEffect(() => {
    axios
      .get("https://college-xola.onrender.com/api/lessons")
      .then((res) => setLessons(res.data))
      .catch(() => console.log("Offline mode"));
  }, []);

  const toggle = (name) => {
    setAttendance((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const saveAttendance = async () => {
    const record = { date: new Date(), students: attendance, notes };
    if (navigator.onLine) {
      await axios.post("https://college-xola.onrender.com/api/attendance", record);
      alert("Attendance synced!");
      setNotes("");
    } else {
      let offline = JSON.parse(localStorage.getItem("offline") || "[]");
      offline.push(record);
      localStorage.setItem("offline", JSON.stringify(offline));
      alert("Saved offline!");
    }
  };

  const syncNow = async () => {
    let offline = JSON.parse(localStorage.getItem("offline") || "[]");
    for (let record of offline) {
      await axios.post("https://college-xola.onrender.com/api/attendance", record);
    }
    localStorage.removeItem("offline");
    alert("Offline data synced!");
  };

  // Attendance Progress
  const presentCount = Object.values(attendance).filter((v) => v).length;
  const progress = Math.round((presentCount / students.length) * 100);

  return (
    <div className="max-w-3xl mx-auto lg:p-6 p-2">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700 whitespace-nowrap">📘 Teacher Dashboard</h1>
        <button
          onClick={syncNow}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow whitespace-nowrap"
        >
          Sync Now
        </button>
      </header>

      {/* Lessons Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Lessons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {lessons.map((l) => (
            <div
              key={l.id}
              className="bg-white p-4 rounded-lg shadow border border-gray-200"
            >
              <h3 className="font-bold text-blue-600">{l.title}</h3>
              <p className="text-gray-600">{l.desc}</p>
              <span className="text-xs text-gray-400">({l.category})</span>
            </div>
          ))}
        </div>
      </section>

      {/* Attendance Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Attendance</h2>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {students.map((s) => (
            <button
              key={s}
              onClick={() => toggle(s)}
              className={`p-3 rounded-lg shadow border ${
                attendance[s]
                  ? "bg-blue-100 border-blue-400 text-blue-700"
                  : "bg-gray-50 border-gray-200 text-gray-600"
              }`}
            >
              {s} {attendance[s] ? "✅" : ""}
            </button>
          ))}
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          {presentCount} / {students.length} Present
        </p>
        <button
          onClick={saveAttendance}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow mt-3"
        >
          Save Attendance
        </button>
      </section>

      {/* Notes Section */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Notes</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write lesson notes..."
          className="w-full p-3 rounded-lg border border-gray-300 shadow bg-white"
        />
      </section>
    </div>
  );
}