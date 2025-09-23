import React, { useState } from 'react'
import api from '../api'


const sampleQuiz = {
    id: 1,
    title: 'Basic Math Quiz',
    questions: [
        { id: 'q1', q: '2 + 3 = ?', options: ['3', '4', '5', '6'], answer: 2 },
        { id: 'q2', q: '5 - 2 = ?', options: ['1', '2', '3', '4'], answer: 2 }
    ]
}


export default function Quiz() {
    const [answers, setAnswers] = useState({})
    const [score, setScore] = useState(null)


    const choose = (qid, idx) => setAnswers(prev => ({ ...prev, [qid]: idx }))


    const submit = async () => {
        let s = 0
        sampleQuiz.questions.forEach(q => { if (answers[q.id] === q.answer) s++ })
        setScore(s)
        try { await api.post('/quiz-submit', { quizId: sampleQuiz.id, score: s, timestamp: new Date().toISOString() }) }
        catch (e) { console.log('Could not submit quiz (offline)') }
    }


    return (
        <section className="bg-white p-4 rounded-xl shadow w-full lg:w-1/2">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Practice Quiz</h2>
                <span className="text-sm text-gray-500">{sampleQuiz.title}</span>
            </div>


            <div className="space-y-4">
                {sampleQuiz.questions.map(q => (
                    <div key={q.id} className="p-3 border border-gray-100 rounded">
                        <div className="font-medium text-gray-800">{q.q}</div>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            {q.options.map((opt, idx) => (
                                <button key={idx} onClick={() => choose(q.id, idx)} className={`p-2 rounded border ${answers[q.id] === idx ? 'bg-blue-100 border-blue-300' : 'bg-white'}`}>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>


            <div className="mt-4 flex items-center gap-4">
                <button onClick={submit} className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                {score !== null && <div className="text-gray-700">Score: <strong className="text-blue-700">{score}/{sampleQuiz.questions.length}</strong></div>}
            </div>
        </section>
    )
}