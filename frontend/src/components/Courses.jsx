
import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Courses() {
	const [lessons, setLessons] = useState([]);

	useEffect(() => {
		api.get('/lessons')
			.then(r => setLessons(r.data))
			.catch(() => console.log('Could not fetch lessons (offline)'));
	}, []);

	return (
		<section className="bg-white p-8 rounded-2xl shadow-lg">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold text-blue-700">Courses & Lessons</h2>
				<span className="text-sm text-gray-500">{lessons.length} items</span>
			</div>
			<div className="flex flex-wrap justify-center gap-6">
				{lessons.map(l => (
					<div key={l.id} className="p-6 rounded-xl bg-blue-50 border border-blue-100 shadow hover:shadow-md transition w-full lg:w-80">
						<h3 className="font-semibold text-blue-800 text-lg mb-2">{l.title}</h3>
						<p className="text-sm text-gray-700 mb-1">{l.category}</p>
						<p className="text-xs text-gray-500">{l.desc}</p>
					</div>
				))}
			</div>
		</section>
	);
}